import React, { createContext, useContext, ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

interface Product {
  id: string
  name: string
  category: string
  price: number
  cost: number
  stock: number
  sku: string
  status: 'active' | 'inactive'
  image: string
  description: string
  minStock?: number
  maxStock?: number
  unit?: string
  createdAt: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive'
  lastLogin: string
  permissions: string[]
  phone?: string
  createdAt: string
}

interface Customer {
  id: string
  name: string
  contact: string
  phone: string
  email: string
  address: string
  taxNumber?: string
  creditLimit: number
  paymentTerms: number
  customerType: string
  status: string
  totalOrders: number
  totalSpent: number
  createdAt: string
}

interface SalesOrder {
  id: string
  customer: string
  date: string
  deliveryDate: string
  items: number
  total: number
  subtotal: number
  discount: number
  tax: number
  status: string
  notes: string
  orderItems: any[]
  createdAt: string
}

interface DataContextType {
  // Products
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  
  // Users
  users: User[]
  addUser: (user: Omit<User, 'id' | 'lastLogin' | 'createdAt'>) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void
  
  // Customers
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void
  updateCustomer: (id: string, customer: Partial<Customer>) => void
  deleteCustomer: (id: string) => void
  
  // Sales Orders
  salesOrders: SalesOrder[]
  addSalesOrder: (order: Omit<SalesOrder, 'id' | 'createdAt'>) => void
  updateSalesOrder: (id: string, order: Partial<SalesOrder>) => void
  deleteSalesOrder: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'قميص قطني رجالي',
    category: 'قمصان رجالية',
    price: 120,
    cost: 80,
    stock: 156,
    sku: 'SH-001',
    status: 'active',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'قميص قطني عالي الجودة للرجال',
    minStock: 50,
    maxStock: 200,
    unit: 'قطعة',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'فستان صيفي نسائي',
    category: 'فساتين نسائية',
    price: 200,
    cost: 130,
    stock: 89,
    sku: 'DR-002',
    status: 'active',
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'فستان صيفي أنيق ومريح',
    minStock: 30,
    maxStock: 100,
    unit: 'قطعة',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'بنطلون جينز',
    category: 'بناطيل',
    price: 180,
    cost: 120,
    stock: 34,
    sku: 'JP-003',
    status: 'active',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'بنطلون جينز كلاسيكي',
    minStock: 40,
    maxStock: 150,
    unit: 'قطعة',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
]

const initialUsers: User[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    role: 'مدير النظام',
    department: 'تقنية المعلومات',
    status: 'active',
    lastLogin: '2024-01-15 10:30',
    permissions: ['all'],
    phone: '+966 50 123 4567',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'فاطمة علي',
    email: 'fatma@example.com',
    role: 'مدير مبيعات',
    department: 'المبيعات',
    status: 'active',
    lastLogin: '2024-01-15 09:15',
    permissions: ['sales', 'customers', 'reports'],
    phone: '+966 55 987 6543',
    createdAt: '2024-01-01T00:00:00.000Z'
  }
]

const initialCustomers: Customer[] = [
  {
    id: '1',
    name: 'متجر الأناقة',
    contact: 'سعد أحمد',
    phone: '+966 50 123 4567',
    email: 'info@elegance-store.com',
    address: 'الرياض، المملكة العربية السعودية',
    creditLimit: 50000,
    paymentTerms: 30,
    customerType: 'wholesale',
    status: 'active',
    totalOrders: 12,
    totalSpent: 145000,
    createdAt: '2024-01-01T00:00:00.000Z'
  }
]

const initialSalesOrders: SalesOrder[] = [
  {
    id: 'SO-001',
    customer: 'متجر الأناقة',
    date: '2024-01-15',
    deliveryDate: '2024-01-18',
    items: 8,
    total: 12500,
    subtotal: 12000,
    discount: 500,
    tax: 1000,
    status: 'confirmed',
    notes: 'طلب عاجل',
    orderItems: [],
    createdAt: '2024-01-15T00:00:00.000Z'
  }
]

interface DataProviderProps {
  children: ReactNode
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [products, setProducts] = useLocalStorage<Product[]>('factory_products', initialProducts)
  const [users, setUsers] = useLocalStorage<User[]>('factory_users', initialUsers)
  const [customers, setCustomers] = useLocalStorage<Customer[]>('factory_customers', initialCustomers)
  const [salesOrders, setSalesOrders] = useLocalStorage<SalesOrder[]>('factory_sales_orders', initialSalesOrders)

  // Product functions
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setProducts(prev => [newProduct, ...prev])
  }

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...productData } : product
    ))
  }

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id))
  }

  // User functions
  const addUser = (userData: Omit<User, 'id' | 'lastLogin' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      lastLogin: 'لم يسجل دخول بعد',
      createdAt: new Date().toISOString()
    }
    setUsers(prev => [newUser, ...prev])
  }

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ))
  }

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  // Customer functions
  const addCustomer = (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setCustomers(prev => [newCustomer, ...prev])
  }

  const updateCustomer = (id: string, customerData: Partial<Customer>) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...customerData } : customer
    ))
  }

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id))
  }

  // Sales Order functions
  const addSalesOrder = (orderData: Omit<SalesOrder, 'id' | 'createdAt'>) => {
    const newOrder: SalesOrder = {
      ...orderData,
      id: `SO-${String(Date.now()).slice(-6)}`,
      createdAt: new Date().toISOString()
    }
    setSalesOrders(prev => [newOrder, ...prev])
  }

  const updateSalesOrder = (id: string, orderData: Partial<SalesOrder>) => {
    setSalesOrders(prev => prev.map(order => 
      order.id === id ? { ...order, ...orderData } : order
    ))
  }

  const deleteSalesOrder = (id: string) => {
    setSalesOrders(prev => prev.filter(order => order.id !== id))
  }

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    users,
    addUser,
    updateUser,
    deleteUser,
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    salesOrders,
    addSalesOrder,
    updateSalesOrder,
    deleteSalesOrder
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}