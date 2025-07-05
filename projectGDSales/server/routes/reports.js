const express = require('express');
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    // Get total sales
    const salesStats = await database.get(`
      SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total), 0) as total_sales
      FROM sales_orders
    `);

    // Get product stats
    const productStats = await database.get(`
      SELECT 
        COUNT(*) as total_products,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_products
      FROM products
    `);

    // Get customer stats
    const customerStats = await database.get(`
      SELECT 
        COUNT(*) as total_customers,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_customers
      FROM customers
    `);

    // Get inventory value
    const inventoryStats = await database.get(`
      SELECT 
        COALESCE(SUM(stock * price), 0) as inventory_value,
        COUNT(CASE WHEN stock <= min_stock THEN 1 END) as low_stock_items
      FROM products
      WHERE status = 'active'
    `);

    // Get monthly sales (last 6 months)
    const monthlySales = await database.all(`
      SELECT 
        strftime('%Y-%m', order_date) as month,
        COALESCE(SUM(total), 0) as sales
      FROM sales_orders
      WHERE order_date >= date('now', '-6 months')
      GROUP BY strftime('%Y-%m', order_date)
      ORDER BY month DESC
      LIMIT 6
    `);

    // Get recent activities (last 10)
    const recentActivities = await database.all(`
      SELECT 
        'sales_order' as type,
        id as reference,
        customer_name as description,
        total as amount,
        created_at
      FROM sales_orders
      UNION ALL
      SELECT 
        'inventory_movement' as type,
        reference,
        product_name || ' - ' || movement_type as description,
        quantity as amount,
        created_at
      FROM inventory_movements
      ORDER BY created_at DESC
      LIMIT 10
    `);

    res.json({
      success: true,
      data: {
        sales: salesStats,
        products: productStats,
        customers: customerStats,
        inventory: inventoryStats,
        monthly_sales: monthlySales,
        recent_activities: recentActivities
      }
    });

  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get sales report
router.get('/sales', authenticateToken, async (req, res) => {
  try {
    const { start_date, end_date, customer_id } = req.query;
    
    let query = `
      SELECT 
        so.*,
        c.name as customer_name,
        c.customer_type
      FROM sales_orders so
      LEFT JOIN customers c ON so.customer_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (start_date) {
      query += ' AND so.order_date >= ?';
      params.push(start_date);
    }

    if (end_date) {
      query += ' AND so.order_date <= ?';
      params.push(end_date);
    }

    if (customer_id) {
      query += ' AND so.customer_id = ?';
      params.push(customer_id);
    }

    query += ' ORDER BY so.order_date DESC';

    const salesData = await database.all(query, params);

    // Get summary
    const summary = await database.get(`
      SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(subtotal), 0) as total_subtotal,
        COALESCE(SUM(discount), 0) as total_discount,
        COALESCE(SUM(tax), 0) as total_tax,
        COALESCE(SUM(total), 0) as total_amount
      FROM sales_orders so
      WHERE 1=1
      ${start_date ? 'AND so.order_date >= ?' : ''}
      ${end_date ? 'AND so.order_date <= ?' : ''}
      ${customer_id ? 'AND so.customer_id = ?' : ''}
    `, params);

    res.json({
      success: true,
      data: {
        orders: salesData,
        summary: summary
      }
    });

  } catch (error) {
    console.error('Get sales report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get inventory report
router.get('/inventory', authenticateToken, async (req, res) => {
  try {
    const { category, low_stock_only } = req.query;
    
    let query = 'SELECT * FROM products WHERE status = "active"';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (low_stock_only === 'true') {
      query += ' AND stock <= min_stock';
    }

    query += ' ORDER BY category, name';

    const inventoryData = await database.all(query, params);

    // Get summary
    const summary = await database.get(`
      SELECT 
        COUNT(*) as total_products,
        COALESCE(SUM(stock), 0) as total_quantity,
        COALESCE(SUM(stock * price), 0) as total_value,
        COALESCE(SUM(stock * cost), 0) as total_cost,
        COUNT(CASE WHEN stock <= min_stock THEN 1 END) as low_stock_count
      FROM products
      WHERE status = 'active'
      ${category ? 'AND category = ?' : ''}
    `, category ? [category] : []);

    res.json({
      success: true,
      data: {
        products: inventoryData,
        summary: summary
      }
    });

  } catch (error) {
    console.error('Get inventory report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get customer report
router.get('/customers', authenticateToken, async (req, res) => {
  try {
    const { customer_type } = req.query;
    
    let query = 'SELECT * FROM customers WHERE 1=1';
    const params = [];

    if (customer_type) {
      query += ' AND customer_type = ?';
      params.push(customer_type);
    }

    query += ' ORDER BY total_spent DESC';

    const customersData = await database.all(query, params);

    // Get summary
    const summary = await database.get(`
      SELECT 
        COUNT(*) as total_customers,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_customers,
        COALESCE(SUM(total_spent), 0) as total_revenue,
        COALESCE(AVG(total_spent), 0) as average_spent
      FROM customers
      ${customer_type ? 'WHERE customer_type = ?' : ''}
    `, customer_type ? [customer_type] : []);

    res.json({
      success: true,
      data: {
        customers: customersData,
        summary: summary
      }
    });

  } catch (error) {
    console.error('Get customer report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;