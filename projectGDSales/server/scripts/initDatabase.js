const database = require('../config/database');

async function initializeDatabase() {
  try {
    await database.connect();
    
    console.log('🔧 Initializing database tables...');

    // Users table
    await database.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        department TEXT NOT NULL,
        phone TEXT,
        status TEXT DEFAULT 'active',
        permissions TEXT,
        last_login DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Products table
    await database.run(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        sku TEXT UNIQUE NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        cost DECIMAL(10,2) NOT NULL,
        stock INTEGER DEFAULT 0,
        min_stock INTEGER DEFAULT 0,
        max_stock INTEGER DEFAULT 0,
        unit TEXT DEFAULT 'قطعة',
        status TEXT DEFAULT 'active',
        image TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Customers table
    await database.run(`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        address TEXT NOT NULL,
        tax_number TEXT,
        credit_limit DECIMAL(10,2) DEFAULT 0,
        payment_terms INTEGER DEFAULT 30,
        customer_type TEXT DEFAULT 'retail',
        status TEXT DEFAULT 'active',
        total_orders INTEGER DEFAULT 0,
        total_spent DECIMAL(10,2) DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sales Orders table
    await database.run(`
      CREATE TABLE IF NOT EXISTS sales_orders (
        id TEXT PRIMARY KEY,
        customer_id TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        order_date DATE NOT NULL,
        delivery_date DATE NOT NULL,
        subtotal DECIMAL(10,2) NOT NULL,
        discount DECIMAL(10,2) DEFAULT 0,
        tax DECIMAL(10,2) DEFAULT 0,
        total DECIMAL(10,2) NOT NULL,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers (id)
      )
    `);

    // Sales Order Items table
    await database.run(`
      CREATE TABLE IF NOT EXISTS sales_order_items (
        id TEXT PRIMARY KEY,
        order_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES sales_orders (id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products (id)
      )
    `);

    // Inventory Movements table
    await database.run(`
      CREATE TABLE IF NOT EXISTS inventory_movements (
        id TEXT PRIMARY KEY,
        product_id TEXT NOT NULL,
        product_name TEXT NOT NULL,
        movement_type TEXT NOT NULL, -- 'in', 'out', 'transfer', 'adjustment'
        quantity INTEGER NOT NULL,
        reference TEXT,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id)
      )
    `);

    // System Settings table
    await database.run(`
      CREATE TABLE IF NOT EXISTS system_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        description TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database tables initialized successfully');

    // Insert default admin user
    const defaultAdmin = {
      id: 'admin-001',
      name: 'مدير النظام',
      email: 'admin@sabah-alkhair.com',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      role: 'مدير النظام',
      department: 'تقنية المعلومات',
      phone: '+966 50 123 4567',
      permissions: JSON.stringify(['all'])
    };

    try {
      await database.run(`
        INSERT OR IGNORE INTO users (id, name, email, password, role, department, phone, permissions)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        defaultAdmin.id,
        defaultAdmin.name,
        defaultAdmin.email,
        defaultAdmin.password,
        defaultAdmin.role,
        defaultAdmin.department,
        defaultAdmin.phone,
        defaultAdmin.permissions
      ]);
      console.log('✅ Default admin user created');
    } catch (error) {
      console.log('ℹ️ Default admin user already exists');
    }

    // Insert sample products
    const sampleProducts = [
      {
        id: 'prod-001',
        name: 'قميص قطني رجالي',
        category: 'قمصان رجالية',
        sku: 'SH-001',
        description: 'قميص قطني عالي الجودة للرجال',
        price: 120.00,
        cost: 80.00,
        stock: 156,
        min_stock: 50,
        max_stock: 200,
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300'
      },
      {
        id: 'prod-002',
        name: 'فستان صيفي نسائي',
        category: 'فساتين نسائية',
        sku: 'DR-002',
        description: 'فستان صيفي أنيق ومريح',
        price: 200.00,
        cost: 130.00,
        stock: 89,
        min_stock: 30,
        max_stock: 100,
        image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=300'
      }
    ];

    for (const product of sampleProducts) {
      try {
        await database.run(`
          INSERT OR IGNORE INTO products (id, name, category, sku, description, price, cost, stock, min_stock, max_stock, image)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          product.id,
          product.name,
          product.category,
          product.sku,
          product.description,
          product.price,
          product.cost,
          product.stock,
          product.min_stock,
          product.max_stock,
          product.image
        ]);
      } catch (error) {
        console.log(`ℹ️ Product ${product.name} already exists`);
      }
    }

    console.log('✅ Sample data inserted successfully');
    console.log('🎉 Database initialization completed!');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
  } finally {
    await database.close();
  }
}

// Run initialization if this script is executed directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;