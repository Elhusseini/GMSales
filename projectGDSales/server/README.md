# Sabah Al-Khair Factory ERP - Backend Server

## Overview
This is the backend server for the Sabah Al-Khair Factory ERP system, built with Node.js, Express, and SQLite.

## Features
- RESTful API for all ERP modules
- SQLite database for local data storage
- JWT authentication and authorization
- Role-based access control
- Inventory management with stock tracking
- Sales order processing
- Customer management
- Comprehensive reporting

## Installation

1. Navigate to the server directory:
```bash
cd projectGDSales/server
```

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
```bash
npm run init-db
```

4. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Configuration

Environment variables are configured in `.env` file:

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `DB_PATH`: SQLite database file path
- `JWT_SECRET`: Secret key for JWT tokens
- `FRONTEND_URL`: Frontend application URL for CORS

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/categories/list` - Get product categories

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Sales Orders
- `GET /api/sales-orders` - Get all sales orders
- `GET /api/sales-orders/:id` - Get sales order by ID
- `POST /api/sales-orders` - Create new sales order
- `PUT /api/sales-orders/:id/status` - Update order status
- `DELETE /api/sales-orders/:id` - Delete sales order

### Inventory
- `GET /api/inventory/overview` - Get inventory overview
- `GET /api/inventory/movements` - Get inventory movements
- `POST /api/inventory/movements` - Create inventory movement
- `GET /api/inventory/low-stock` - Get low stock products
- `GET /api/inventory/by-category` - Get inventory by category

### Reports
- `GET /api/reports/dashboard` - Get dashboard statistics
- `GET /api/reports/sales` - Get sales report
- `GET /api/reports/inventory` - Get inventory report
- `GET /api/reports/customers` - Get customer report

## Database Schema

The system uses SQLite with the following main tables:

- `users` - System users and authentication
- `products` - Product catalog and inventory
- `customers` - Customer information
- `sales_orders` - Sales order headers
- `sales_order_items` - Sales order line items
- `inventory_movements` - Stock movement tracking
- `system_settings` - Application settings

## Default Login

- Email: `admin@sabah-alkhair.com`
- Password: `password`

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based authorization
- Rate limiting
- CORS protection
- Input validation
- SQL injection prevention

## Development

The server includes:
- Hot reloading with nodemon
- Comprehensive error handling
- Request logging with Morgan
- Database connection pooling
- Automatic database initialization

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure proper CORS settings
4. Set up database backups
5. Use process manager (PM2)
6. Configure reverse proxy (nginx)