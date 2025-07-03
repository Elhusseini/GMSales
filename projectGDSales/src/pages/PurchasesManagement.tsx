import React, { useState } from 'react'
import { Plus, Search, Eye, Edit, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import toast from 'react-hot-toast'

const PurchasesManagement: React.FC = () => {
  const { t, direction } = useLanguage()
  const [activeTab, setActiveTab] = useState('orders')

  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: 'PO-001',
      supplier: 'شركة النسيج الذهبي',
      date: '2024-01-15',
      total: 25000,
      status: 'approved',
      items: 5,
      dueDate: '2024-01-25'
    },
    {
      id: 'PO-002',
      supplier: 'مصنع الألياف الحديث',
      date: '2024-01-14',
      total: 18500,
      status: 'pending',
      items: 3,
      dueDate: '2024-01-24'
    },
    {
      id: 'PO-003',
      supplier: 'تجارة الأقمشة المتطورة',
      date: '2024-01-13',
      total: 32000,
      status: 'received',
      items: 8,
      dueDate: '2024-01-23'
    }
  ])

  const [suppliers, setSuppliers] = useState([
    {
      id: '1',
      name: 'شركة النسيج الذهبي',
      contact: 'أحمد محمد',
      phone: '+966 50 123 4567',
      email: 'info@golden-textile.com',
      address: 'الرياض، المملكة العربية السعودية',
      rating: 4.8,
      orders: 12
    },
    {
      id: '2',
      name: 'مصنع الألياف الحديث',
      contact: 'فاطمة علي',
      phone: '+966 55 987 6543',
      email: 'sales@modern-fiber.com',
      address: 'جدة، المملكة العربية السعودية',
      rating: 4.5,
      orders: 8
    }
  ])

  const handleAddSupplier = () => {
    const newSupplier = {
      id: (suppliers.length + 1).toString(),
      name: 'مورد جديد',
      contact: 'جهة الاتصال',
      phone: '+966 50 000 0000',
      email: 'new@supplier.com',
      address: 'المملكة العربية السعودية',
      rating: 0,
      orders: 0
    }
    
    setSuppliers([...suppliers, newSupplier])
    toast.success('تم إضافة مورد جديد بنجاح')
  }

  const handleNewPurchaseOrder = () => {
    const newOrder = {
      id: `PO-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)].name,
      date: new Date().toISOString().split('T')[0],
      total: Math.floor(Math.random() * 30000) + 10000,
      status: 'pending' as const,
      items: Math.floor(Math.random() * 10) + 1,
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
    
    setPurchaseOrders([newOrder, ...purchaseOrders])
    toast.success('تم إضافة أمر شراء جديد بنجاح')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'received': return 'text-blue-600 bg-blue-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'received': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return t('purchases.approved')
      case 'pending': return t('sales.pending')
      case 'received': return t('purchases.received')
      case 'cancelled': return t('sales.cancelled')
      default: return 'غير محدد'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('purchases.title')}</h1>
          <p className="text-gray-600 mt-1">{t('purchases.description')}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleAddSupplier}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>{t('purchases.addSupplier')}</span>
          </button>
          <button 
            onClick={handleNewPurchaseOrder}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>{t('purchases.newPurchaseOrder')}</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('purchases.orders')}</p>
              <p className="text-2xl font-bold text-gray-900">{purchaseOrders.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('purchases.totalValue')}</p>
              <p className="text-2xl font-bold text-gray-900">{purchaseOrders.reduce((sum, po) => sum + po.total, 0).toLocaleString()} ر.س</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('purchases.activeSuppliers')}</p>
              <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">في الانتظار</p>
              <p className="text-2xl font-bold text-gray-900">{purchaseOrders.filter(po => po.status === 'pending').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg card-shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'orders'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('purchases.orders')}
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'suppliers'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('purchases.suppliers')}
            </button>
            <button
              onClick={() => setActiveTab('receipts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'receipts'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('purchases.receipts')}
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className={`absolute ${direction === 'rtl' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`} />
                <input
                  type="text"
                  placeholder={t('purchases.searchOrders')}
                  className={`w-full ${direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  dir={direction}
                />
              </div>

              {/* Purchase Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        {t('purchases.orderNumber')}
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        {t('purchases.supplier')}
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        التاريخ
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        عدد الأصناف
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        الإجمالي
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        الحالة
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {purchaseOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-500">استحقاق: {order.dueDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.supplier}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.items} صنف</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{order.total.toLocaleString()} ر.س</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className={`${direction === 'rtl' ? 'mr-1' : 'ml-1'}`}>{getStatusText(order.status)}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              className="text-primary-600 hover:text-primary-900 p-1 rounded transition-colors"
                              title="عرض"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-900 p-1 rounded transition-colors"
                              title="تعديل"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'suppliers' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className={`absolute ${direction === 'rtl' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`} />
                <input
                  type="text"
                  placeholder={t('purchases.searchSuppliers')}
                  className={`w-full ${direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  dir={direction}
                />
              </div>

              {/* Suppliers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suppliers.map((supplier) => (
                  <div key={supplier.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:card-shadow transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{supplier.name}</h3>
                        <p className="text-sm text-gray-600">{supplier.contact}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className={`text-sm font-medium text-gray-900 ${direction === 'rtl' ? 'mr-1' : 'ml-1'}`}>{supplier.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span>📞 {supplier.phone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>📧 {supplier.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>📍 {supplier.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">{t('purchases.ordersCount')}</p>
                        <p className="text-lg font-bold text-gray-900">{supplier.orders}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-primary-600 hover:text-primary-900 p-1 rounded transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 rounded transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'receipts' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد إيصالات استلام</h3>
                  <p className="text-gray-600">ستظهر إيصالات الاستلام هنا عندما يتم استلام البضائع</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PurchasesManagement