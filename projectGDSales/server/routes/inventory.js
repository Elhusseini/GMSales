const express = require('express');
const { v4: uuidv4 } = require('uuid');
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get inventory overview
router.get('/overview', authenticateToken, async (req, res) => {
  try {
    const overview = await database.get(`
      SELECT 
        COUNT(*) as total_products,
        SUM(stock) as total_quantity,
        SUM(stock * price) as total_value,
        COUNT(CASE WHEN stock <= min_stock THEN 1 END) as low_stock_items
      FROM products
      WHERE status = 'active'
    `);

    res.json({
      success: true,
      data: overview
    });

  } catch (error) {
    console.error('Get inventory overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get inventory movements
router.get('/movements', authenticateToken, async (req, res) => {
  try {
    const { product_id, movement_type, limit = 50 } = req.query;
    
    let query = 'SELECT * FROM inventory_movements WHERE 1=1';
    const params = [];

    if (product_id) {
      query += ' AND product_id = ?';
      params.push(product_id);
    }

    if (movement_type) {
      query += ' AND movement_type = ?';
      params.push(movement_type);
    }

    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(parseInt(limit));

    const movements = await database.all(query, params);

    res.json({
      success: true,
      data: movements
    });

  } catch (error) {
    console.error('Get inventory movements error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create inventory movement (stock adjustment)
router.post('/movements', authenticateToken, async (req, res) => {
  try {
    const { product_id, movement_type, quantity, reference, notes } = req.body;

    if (!product_id || !movement_type || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: product_id, movement_type, quantity'
      });
    }

    // Get product details
    const product = await database.get('SELECT name, stock FROM products WHERE id = ?', [product_id]);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if we have enough stock for 'out' movements
    if (movement_type === 'out' && product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    // Create movement record
    const movementId = uuidv4();
    await database.run(`
      INSERT INTO inventory_movements (
        id, product_id, product_name, movement_type, quantity, reference, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      movementId, product_id, product.name, movement_type, quantity,
      reference || null, notes || null
    ]);

    // Update product stock
    const stockChange = movement_type === 'in' ? quantity : -quantity;
    await database.run(`
      UPDATE products SET stock = stock + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `, [stockChange, product_id]);

    // Get created movement
    const newMovement = await database.get('SELECT * FROM inventory_movements WHERE id = ?', [movementId]);

    res.status(201).json({
      success: true,
      message: 'Inventory movement created successfully',
      data: newMovement
    });

  } catch (error) {
    console.error('Create inventory movement error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get low stock products
router.get('/low-stock', authenticateToken, async (req, res) => {
  try {
    const lowStockProducts = await database.all(`
      SELECT * FROM products 
      WHERE status = 'active' AND stock <= min_stock
      ORDER BY (stock - min_stock) ASC
    `);

    res.json({
      success: true,
      data: lowStockProducts
    });

  } catch (error) {
    console.error('Get low stock products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get inventory by category
router.get('/by-category', authenticateToken, async (req, res) => {
  try {
    const categoryInventory = await database.all(`
      SELECT 
        category,
        COUNT(*) as product_count,
        SUM(stock) as total_quantity,
        SUM(stock * price) as total_value
      FROM products 
      WHERE status = 'active'
      GROUP BY category
      ORDER BY total_value DESC
    `);

    res.json({
      success: true,
      data: categoryInventory
    });

  } catch (error) {
    console.error('Get inventory by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;