import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { 
  usersAPI, 
  productsAPI, 
  customersAPI, 
  salesOrdersAPI,
  reportsAPI 
} from '../services/api'
import toast from 'react-hot-toast'

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
  min_stock?: number
  max_stock?: number
  unit?: string
  created_at: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive'
  last_login: string
  permissions: string[]
  phone?: string
  created_at: string
}

interface Customer {
  id: string
  name: string
  contact: string
  phone: string
  email: string
  address: string
  tax_number?: string
  credit_limit: number
  payment_terms: number
  customer_type: string
  status: string
  total_orders: number
  total_spent: number
  created_at: string
}

interface SalesOrder {
  id: string
  customer_id: string
  customer_name: string
  order_date: string
  delivery_date: string
  items: any[]
  total: number
  subtotal: number
  discount: number
  tax: number
  status: string
  notes: string
  created_at: string
}

interface DataContextType {
  // Loading states
  loading: boolean
  
  // Products
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  refreshProducts: () => Promise<void>
  
  // Users
  users: User[]
  addUser: (user: Omit<User, 'id' | 'last_login' | 'created_at'>) => Promise<void>
  updateUser: (id: string, user: Partial<User>) => Promise<void>
  deleteUser: (id: string) => Promise<void>
  refreshUsers: () => Promise<void>
  
  // Customers
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, 'id' | 'created_at'>) => Promise<void>
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<void>
  deleteCustomer: (id: string) => Promise<void>
  refreshCustomers: () => Promise<void>
  
  // Sales Orders
  salesOrders: SalesOrder[]
  addSalesOrder: (order: any) => Promise<void>
  updateSalesOrder: (id: string, order: Partial<SalesOrder>) => Promise<void>
  deleteSalesOrder: (id: string) => Promise<void>
  refreshSalesOrders: () => Promise<void>

  // Dashboard stats
  dashboardStats: any
  refreshDashboardStats: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

interface DataProviderProps {
  children: ReactNode
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [salesOrders, setSalesOrders] = useState<SalesOrder[]>([])
  const [dashboardStats, setDashboardStats] = useState<any>({})

  // Products functions
  const refreshProducts = async () => {
    try {
      setLoading(true)
      const response = await productsAPI.getAll()
      if (response.success) {
        setProducts(response.data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('خطأ في تحميل المنتجات')
    } finally {
      setLoading(false)
    }
  }

  const addProduct = async (productData: Omit<Product, 'id' | 'created_at'>) => {
    try {
      setLoading(true)
      const response = await productsAPI.create(productData)
      if (response.success) {
        setProducts(prev => [response.data, ...prev])
        toast.success('تم إضافة المنتج بنجاح')
      }
    } catch (error: any) {
      console.error('Error adding product:', error)
      toast.error(error.message || 'خطأ في إضافة المنتج')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      setLoading(true)
      const response = await productsAPI.update(id, productData)
      if (response.success) {
        setProducts(prev => prev.map(product => 
          product.id === id ? response.data : product
        ))
        toast.success('تم تحديث المنتج بنجاح')
      }
    } catch (error: any) {
      console.error('Error updating product:', error)
      toast.error(error.message || 'خطأ في تحديث المنتج')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true)
      const response = await productsAPI.delete(id)
      if (response.success) {
        setProducts(prev => prev.filter(product => product.id !== id))
        toast.success('تم حذف المنتج بنجاح')
      }
    } catch (error: any) {
      console.error('Error deleting product:', error)
      toast.error(error.message || 'خطأ في حذف المنتج')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Users functions
  const refreshUsers = async () => {
    try {
      setLoading(true)
      const response = await usersAPI.getAll()
      if (response.success) {
        setUsers(response.data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('خطأ في تحميل المستخدمين')
    } finally {
      setLoading(false)
    }
  }

  const addUser = async (userData: Omit<User, 'id' | 'last_login' | 'created_at'>) => {
    try {
      setLoading(true)
      const response = await usersAPI.create(userData)
      if (response.success) {
        setUsers(prev => [response.data, ...prev])
        toast.success('تم إضافة المستخدم بنجاح')
      }
    } catch (error: any) {
      console.error('Error adding user:', error)
      toast.error(error.message || 'خطأ في إضافة المستخدم')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (id: string, userData: Partial<User>) => {
    try {
      setLoading(true)
      const response = await usersAPI.update(id, userData)
      if (response.success) {
        setUsers(prev => prev.map(user => 
          user.id === id ? response.data : user
        ))
        toast.success('تم تحديث المستخدم بنجاح')
      }
    } catch (error: any) {
      console.error('Error updating user:', error)
      toast.error(error.message || 'خطأ في تحديث المستخدم')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: string) => {
    try {
      setLoading(true)
      const response = await usersAPI.delete(id)
      if (response.success) {
        setUsers(prev => prev.filter(user => user.id !== id))
        toast.success('تم حذف المستخدم بنجاح')
      }
    } catch (error: any) {
      console.error('Error deleting user:', error)
      toast.error(error.message || 'خطأ في حذف المستخدم')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Customers functions
  const refreshCustomers = async () => {
    try {
      setLoading(true)
      const response = await customersAPI.getAll()
      if (response.success) {
        setCustomers(response.data)
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
      toast.error('خطأ في تحميل العملاء')
    } finally {
      setLoading(false)
    }
  }

  const addCustomer = async (customerData: Omit<Customer, 'id' | 'created_at'>) => {
    try {
      setLoading(true)
      const response = await customersAPI.create(customerData)
      if (response.success) {
        setCustomers(prev => [response.data, ...prev])
        toast.success('تم إضافة العميل بنجاح')
      }
    } catch (error: any) {
      console.error('Error adding customer:', error)
      toast.error(error.message || 'خطأ في إضافة العميل')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateCustomer = async (id: string, customerData: Partial<Customer>) => {
    try {
      setLoading(true)
      const response = await customersAPI.update(id, customerData)
      if (response.success) {
        setCustomers(prev => prev.map(customer => 
          customer.id === id ? response.data : customer
        ))
        toast.success('تم تحديث العميل بنجاح')
      }
    } catch (error: any) {
      console.error('Error updating customer:', error)
      toast.error(error.message || 'خطأ في تحديث العميل')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteCustomer = async (id: string) => {
    try {
      setLoading(true)
      const response = await customersAPI.delete(id)
      if (response.success) {
        setCustomers(prev => prev.filter(customer => customer.id !== id))
        toast.success('تم حذف العميل بنجاح')
      }
    } catch (error: any) {
      console.error('Error deleting customer:', error)
      toast.error(error.message || 'خطأ في حذف العميل')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Sales Orders functions
  const refreshSalesOrders = async () => {
    try {
      setLoading(true)
      const response = await salesOrdersAPI.getAll()
      if (response.success) {
        setSalesOrders(response.data)
      }
    } catch (error) {
      console.error('Error fetching sales orders:', error)
      toast.error('خطأ في تحميل أوامر البيع')
    } finally {
      setLoading(false)
    }
  }

  const addSalesOrder = async (orderData: any) => {
    try {
      setLoading(true)
      
      // Transform order data for API
      const apiOrderData = {
        customer_id: orderData.customer_id,
        order_date: orderData.date,
        delivery_date: orderData.deliveryDate,
        subtotal: orderData.subtotal,
        discount: orderData.discount,
        tax: orderData.tax,
        total: orderData.total,
        status: orderData.status,
        notes: orderData.notes,
        items: orderData.orderItems.map((item: any) => ({
          product_id: item.product,
          quantity: item.quantity,
          price: item.price,
          total: item.total
        }))
      }

      const response = await salesOrdersAPI.create(apiOrderData)
      if (response.success) {
        setSalesOrders(prev => [response.data, ...prev])
        toast.success('تم إنشاء أمر البيع بنجاح')
        // Refresh products to update stock
        await refreshProducts()
      }
    } catch (error: any) {
      console.error('Error adding sales order:', error)
      toast.error(error.message || 'خطأ في إنشاء أمر البيع')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateSalesOrder = async (id: string, orderData: Partial<SalesOrder>) => {
    try {
      setLoading(true)
      if (orderData.status) {
        const response = await salesOrdersAPI.updateStatus(id, orderData.status)
        if (response.success) {
          setSalesOrders(prev => prev.map(order => 
            order.id === id ? { ...order, status: orderData.status! } : order
          ))
          toast.success('تم تحديث حالة الطلب بنجاح')
        }
      }
    } catch (error: any) {
      console.error('Error updating sales order:', error)
      toast.error(error.message || 'خطأ في تحديث أمر البيع')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteSalesOrder = async (id: string) => {
    try {
      setLoading(true)
      const response = await salesOrdersAPI.delete(id)
      if (response.success) {
        setSalesOrders(prev => prev.filter(order => order.id !== id))
        toast.success('تم حذف أمر البيع بنجاح')
        // Refresh products to update stock
        await refreshProducts()
      }
    } catch (error: any) {
      console.error('Error deleting sales order:', error)
      toast.error(error.message || 'خطأ في حذف أمر البيع')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Dashboard stats
  const refreshDashboardStats = async () => {
    try {
      const response = await reportsAPI.getDashboard()
      if (response.success) {
        setDashboardStats(response.data)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  // Initial data load
  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([
        refreshProducts(),
        refreshUsers(),
        refreshCustomers(),
        refreshSalesOrders(),
        refreshDashboardStats()
      ])
    }

    loadInitialData()
  }, [])

  const value = {
    loading,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts,
    users,
    addUser,
    updateUser,
    deleteUser,
    refreshUsers,
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    refreshCustomers,
    salesOrders,
    addSalesOrder,
    updateSalesOrder,
    deleteSalesOrder,
    refreshSalesOrders,
    dashboardStats,
    refreshDashboardStats
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}