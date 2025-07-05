const express = require('express');
const { v4: uuidv4 } = require('uuid');
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { category, status, search } = req.query;
    
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (name LIKE ? OR sku LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const products = await database.all(query, params);

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get product by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await database.get('SELECT * FROM products WHERE id = ?', [req.params.id]);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new product
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      name, category, sku, description, price, cost, stock,
      min_stock, max_stock, unit, status, image
    } = req.body;

    if (!name || !category || !sku || !price || !cost) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: name, category, sku, price, cost'
      });
    }

    // Check if SKU already exists
    const existingProduct = await database.get('SELECT id FROM products WHERE sku = ?', [sku]);
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'SKU already exists'
      });
    }

    const productId = uuidv4();
    await database.run(`
      INSERT INTO products (
        id, name, category, sku, description, price, cost, stock,
        min_stock, max_stock, unit, status, image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      productId, name, category, sku, description || null, price, cost,
      stock || 0, min_stock || 0, max_stock || 0, unit || 'قطعة',
      status || 'active', image || null
    ]);

    // Get created product
    const newProduct = await database.get('SELECT * FROM products WHERE id = ?', [productId]);

    // Log inventory movement for initial stock
    if (stock > 0) {
      await database.run(`
        INSERT INTO inventory_movements (id, product_id, product_name, movement_type, quantity, reference, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        uuidv4(), productId, name, 'in', stock, 'INITIAL_STOCK', 'Initial stock entry'
      ]);
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update product
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name, category, sku, description, price, cost, stock,
      min_stock, max_stock, unit, status, image
    } = req.body;

    // Check if product exists
    const existingProduct = await database.get('SELECT * FROM products WHERE id = ?', [productId]);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if SKU is taken by another product
    if (sku && sku !== existingProduct.sku) {
      const skuProduct = await database.get('SELECT id FROM products WHERE sku = ? AND id != ?', [sku, productId]);
      if (skuProduct) {
        return res.status(400).json({
          success: false,
          message: 'SKU already exists'
        });
      }
    }

    // Build update query
    const updates = [];
    const values = [];

    if (name) { updates.push('name = ?'); values.push(name); }
    if (category) { updates.push('category = ?'); values.push(category); }
    if (sku) { updates.push('sku = ?'); values.push(sku); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (price) { updates.push('price = ?'); values.push(price); }
    if (cost) { updates.push('cost = ?'); values.push(cost); }
    if (stock !== undefined) { updates.push('stock = ?'); values.push(stock); }
    if (min_stock !== undefined) { updates.push('min_stock = ?'); values.push(min_stock); }
    if (max_stock !== undefined) { updates.push('max_stock = ?'); values.push(max_stock); }
    if (unit) { updates.push('unit = ?'); values.push(unit); }
    if (status) { updates.push('status = ?'); values.push(status); }
    if (image !== undefined) { updates.push('image = ?'); values.push(image); }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(productId);

    await database.run(`
      UPDATE products SET ${updates.join(', ')} WHERE id = ?
    `, values);

    // Log stock adjustment if stock changed
    if (stock !== undefined && stock !== existingProduct.stock) {
      const difference = stock - existingProduct.stock;
      const movementType = difference > 0 ? 'in' : 'out';
      const quantity = Math.abs(difference);

      await database.run(`
        INSERT INTO inventory_movements (id, product_id, product_name, movement_type, quantity, reference, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        uuidv4(), productId, name || existingProduct.name, movementType, quantity,
        'STOCK_ADJUSTMENT', 'Stock adjustment via product update'
      ]);
    }

    // Get updated product
    const updatedProduct = await database.get('SELECT * FROM products WHERE id = ?', [productId]);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete product
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if product exists
    const existingProduct = await database.get('SELECT id FROM products WHERE id = ?', [productId]);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    await database.run('DELETE FROM products WHERE id = ?', [productId]);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get product categories
router.get('/categories/list', authenticateToken, async (req, res) => {
  try {
    const categories = await database.all(`
      SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category
    `);

    res.json({
      success: true,
      data: categories.map(row => row.category)
    });

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;