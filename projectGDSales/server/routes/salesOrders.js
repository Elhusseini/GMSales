const express = require('express');
const { v4: uuidv4 } = require('uuid');
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all sales orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { customer_id, status, search } = req.query;
    
    let query = `
      SELECT so.*, c.name as customer_name
      FROM sales_orders so
      LEFT JOIN customers c ON so.customer_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (customer_id) {
      query += ' AND so.customer_id = ?';
      params.push(customer_id);
    }

    if (status) {
      query += ' AND so.status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (so.id LIKE ? OR c.name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY so.created_at DESC';

    const orders = await database.all(query, params);

    // Get order items for each order
    for (let order of orders) {
      const items = await database.all(`
        SELECT * FROM sales_order_items WHERE order_id = ?
      `, [order.id]);
      order.items = items;
    }

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('Get sales orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get sales order by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await database.get(`
      SELECT so.*, c.name as customer_name
      FROM sales_orders so
      LEFT JOIN customers c ON so.customer_id = c.id
      WHERE so.id = ?
    `, [req.params.id]);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Sales order not found'
      });
    }

    // Get order items
    const items = await database.all(`
      SELECT * FROM sales_order_items WHERE order_id = ?
    `, [order.id]);
    order.items = items;

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Get sales order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new sales order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      customer_id, order_date, delivery_date, items,
      subtotal, discount, tax, total, status, notes
    } = req.body;

    if (!customer_id || !order_date || !delivery_date || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: customer_id, order_date, delivery_date, items'
      });
    }

    // Verify customer exists
    const customer = await database.get('SELECT name FROM customers WHERE id = ?', [customer_id]);
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Generate order ID
    const orderId = `SO-${Date.now().toString().slice(-6)}`;

    // Create sales order
    await database.run(`
      INSERT INTO sales_orders (
        id, customer_id, customer_name, order_date, delivery_date,
        subtotal, discount, tax, total, status, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      orderId, customer_id, customer.name, order_date, delivery_date,
      subtotal || 0, discount || 0, tax || 0, total || 0,
      status || 'pending', notes || null
    ]);

    // Create order items and update inventory
    for (const item of items) {
      const itemId = uuidv4();
      
      // Get product details
      const product = await database.get('SELECT name, stock FROM products WHERE id = ?', [item.product_id]);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product not found: ${item.product_id}`
        });
      }

      // Check stock availability
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}`
        });
      }

      // Create order item
      await database.run(`
        INSERT INTO sales_order_items (
          id, order_id, product_id, product_name, quantity, price, total
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        itemId, orderId, item.product_id, product.name,
        item.quantity, item.price, item.total
      ]);

      // Update product stock
      await database.run(`
        UPDATE products SET stock = stock - ? WHERE id = ?
      `, [item.quantity, item.product_id]);

      // Log inventory movement
      await database.run(`
        INSERT INTO inventory_movements (
          id, product_id, product_name, movement_type, quantity, reference, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        uuidv4(), item.product_id, product.name, 'out', item.quantity,
        orderId, `Sales order: ${orderId}`
      ]);
    }

    // Update customer totals
    await database.run(`
      UPDATE customers SET 
        total_orders = total_orders + 1,
        total_spent = total_spent + ?
      WHERE id = ?
    `, [total || 0, customer_id]);

    // Get created order with items
    const newOrder = await database.get(`
      SELECT so.*, c.name as customer_name
      FROM sales_orders so
      LEFT JOIN customers c ON so.customer_id = c.id
      WHERE so.id = ?
    `, [orderId]);

    const orderItems = await database.all(`
      SELECT * FROM sales_order_items WHERE order_id = ?
    `, [orderId]);
    newOrder.items = orderItems;

    res.status(201).json({
      success: true,
      message: 'Sales order created successfully',
      data: newOrder
    });

  } catch (error) {
    console.error('Create sales order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update sales order status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    // Check if order exists
    const existingOrder = await database.get('SELECT id FROM sales_orders WHERE id = ?', [orderId]);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Sales order not found'
      });
    }

    await database.run(`
      UPDATE sales_orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `, [status, orderId]);

    // Get updated order
    const updatedOrder = await database.get(`
      SELECT so.*, c.name as customer_name
      FROM sales_orders so
      LEFT JOIN customers c ON so.customer_id = c.id
      WHERE so.id = ?
    `, [orderId]);

    res.json({
      success: true,
      message: 'Sales order status updated successfully',
      data: updatedOrder
    });

  } catch (error) {
    console.error('Update sales order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete sales order
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const orderId = req.params.id;

    // Check if order exists
    const existingOrder = await database.get('SELECT * FROM sales_orders WHERE id = ?', [orderId]);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: 'Sales order not found'
      });
    }

    // Get order items to restore inventory
    const orderItems = await database.all('SELECT * FROM sales_order_items WHERE order_id = ?', [orderId]);

    // Restore inventory for each item
    for (const item of orderItems) {
      await database.run(`
        UPDATE products SET stock = stock + ? WHERE id = ?
      `, [item.quantity, item.product_id]);

      // Log inventory movement
      await database.run(`
        INSERT INTO inventory_movements (
          id, product_id, product_name, movement_type, quantity, reference, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        uuidv4(), item.product_id, item.product_name, 'in', item.quantity,
        `CANCEL-${orderId}`, `Cancelled sales order: ${orderId}`
      ]);
    }

    // Update customer totals
    await database.run(`
      UPDATE customers SET 
        total_orders = total_orders - 1,
        total_spent = total_spent - ?
      WHERE id = ?
    `, [existingOrder.total, existingOrder.customer_id]);

    // Delete order (items will be deleted by CASCADE)
    await database.run('DELETE FROM sales_orders WHERE id = ?', [orderId]);

    res.json({
      success: true,
      message: 'Sales order deleted successfully'
    });

  } catch (error) {
    console.error('Delete sales order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;