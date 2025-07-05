const express = require('express');
const { v4: uuidv4 } = require('uuid');
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all customers
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { search, customer_type, status } = req.query;
    
    let query = 'SELECT * FROM customers WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (name LIKE ? OR contact LIKE ? OR phone LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (customer_type) {
      query += ' AND customer_type = ?';
      params.push(customer_type);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const customers = await database.all(query, params);

    res.json({
      success: true,
      data: customers
    });

  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get customer by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const customer = await database.get('SELECT * FROM customers WHERE id = ?', [req.params.id]);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.json({
      success: true,
      data: customer
    });

  } catch (error) {
    console.error('Get customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new customer
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name, contact, phone, email, address, tax_number,
      credit_limit, payment_terms, customer_type, status
    } = req.body;

    if (!name || !contact || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: name, contact, phone, address'
      });
    }

    const customerId = uuidv4();
    await database.run(`
      INSERT INTO customers (
        id, name, contact, phone, email, address, tax_number,
        credit_limit, payment_terms, customer_type, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      customerId, name, contact, phone, email || null, address, tax_number || null,
      credit_limit || 0, payment_terms || 30, customer_type || 'retail', status || 'active'
    ]);

    // Get created customer
    const newCustomer = await database.get('SELECT * FROM customers WHERE id = ?', [customerId]);

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: newCustomer
    });

  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update customer
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const customerId = req.params.id;
    const {
      name, contact, phone, email, address, tax_number,
      credit_limit, payment_terms, customer_type, status
    } = req.body;

    // Check if customer exists
    const existingCustomer = await database.get('SELECT id FROM customers WHERE id = ?', [customerId]);
    if (!existingCustomer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Build update query
    const updates = [];
    const values = [];

    if (name) { updates.push('name = ?'); values.push(name); }
    if (contact) { updates.push('contact = ?'); values.push(contact); }
    if (phone) { updates.push('phone = ?'); values.push(phone); }
    if (email !== undefined) { updates.push('email = ?'); values.push(email); }
    if (address) { updates.push('address = ?'); values.push(address); }
    if (tax_number !== undefined) { updates.push('tax_number = ?'); values.push(tax_number); }
    if (credit_limit !== undefined) { updates.push('credit_limit = ?'); values.push(credit_limit); }
    if (payment_terms !== undefined) { updates.push('payment_terms = ?'); values.push(payment_terms); }
    if (customer_type) { updates.push('customer_type = ?'); values.push(customer_type); }
    if (status) { updates.push('status = ?'); values.push(status); }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(customerId);

    await database.run(`
      UPDATE customers SET ${updates.join(', ')} WHERE id = ?
    `, values);

    // Get updated customer
    const updatedCustomer = await database.get('SELECT * FROM customers WHERE id = ?', [customerId]);

    res.json({
      success: true,
      message: 'Customer updated successfully',
      data: updatedCustomer
    });

  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete customer
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const customerId = req.params.id;

    // Check if customer exists
    const existingCustomer = await database.get('SELECT id FROM customers WHERE id = ?', [customerId]);
    if (!existingCustomer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Check if customer has orders
    const hasOrders = await database.get('SELECT id FROM sales_orders WHERE customer_id = ? LIMIT 1', [customerId]);
    if (hasOrders) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete customer with existing orders'
      });
    }

    await database.run('DELETE FROM customers WHERE id = ?', [customerId]);

    res.json({
      success: true,
      message: 'Customer deleted successfully'
    });

  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;