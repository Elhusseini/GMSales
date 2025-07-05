const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const database = require('../config/database');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await database.all(`
      SELECT id, name, email, role, department, phone, status, permissions, last_login, created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: users
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await database.get(`
      SELECT id, name, email, role, department, phone, status, permissions, last_login, created_at
      FROM users WHERE id = ?
    `, [req.params.id]);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new user
router.post('/', authenticateToken, authorizeRoles('مدير النظام'), async (req, res) => {
  try {
    const { name, email, password, role, department, phone, permissions } = req.body;

    if (!name || !email || !password || !role || !department) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: name, email, password, role, department'
      });
    }

    // Check if email already exists
    const existingUser = await database.get('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();
    await database.run(`
      INSERT INTO users (id, name, email, password, role, department, phone, permissions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId,
      name,
      email,
      hashedPassword,
      role,
      department,
      phone || null,
      JSON.stringify(permissions || [])
    ]);

    // Get created user (without password)
    const newUser = await database.get(`
      SELECT id, name, email, role, department, phone, status, permissions, created_at
      FROM users WHERE id = ?
    `, [userId]);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update user
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, email, role, department, phone, status, permissions } = req.body;
    const userId = req.params.id;

    // Check if user exists
    const existingUser = await database.get('SELECT id FROM users WHERE id = ?', [userId]);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if email is taken by another user
    if (email) {
      const emailUser = await database.get('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId]);
      if (emailUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    // Build update query
    const updates = [];
    const values = [];

    if (name) { updates.push('name = ?'); values.push(name); }
    if (email) { updates.push('email = ?'); values.push(email); }
    if (role) { updates.push('role = ?'); values.push(role); }
    if (department) { updates.push('department = ?'); values.push(department); }
    if (phone !== undefined) { updates.push('phone = ?'); values.push(phone); }
    if (status) { updates.push('status = ?'); values.push(status); }
    if (permissions) { updates.push('permissions = ?'); values.push(JSON.stringify(permissions)); }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(userId);

    await database.run(`
      UPDATE users SET ${updates.join(', ')} WHERE id = ?
    `, values);

    // Get updated user
    const updatedUser = await database.get(`
      SELECT id, name, email, role, department, phone, status, permissions, last_login, created_at, updated_at
      FROM users WHERE id = ?
    `, [userId]);

    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete user
router.delete('/:id', authenticateToken, authorizeRoles('مدير النظام'), async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const existingUser = await database.get('SELECT id FROM users WHERE id = ?', [userId]);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting self
    if (userId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    await database.run('DELETE FROM users WHERE id = ?', [userId]);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;