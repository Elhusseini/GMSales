import React, { useState } from 'react'
import { Plus, Search, Eye, Edit, DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react'

const SalesManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders')

  const salesOrders = [
    {
      id: 'SO-001',
      customer: 'متجر الأناقة',
      date: '2024-01-15',
      total: 12500,
      status: 'confirmed',
      items: 8,
      deliveryDate: '2024-01-18'
    },
    {
      id: 'SO-002',
      customer: 'شركة الموضة الحديثة',
      date: '2024-01-14',
      total: 25000,
      status: 'shipped',
      items: 15,
      deliveryDate: '2024-01-17'
    },
    {
      id: 'SO-003',
      customer: 'مؤسسة الأزياء المتطورة',
      date: '2024-01-13',
      total: 8750,
      status: 'pending',
      items: 5,
      deliveryDate: '2024-01-19'
    }
  ]

  const customers = [
    {
      id: '1',
      name: 'متجر الأناقة',
      contact: 'سعد أحمد',
      phone: '+966 50 123 4567',
      email: 'info@elegance-store.com',
      address: 'الرياض، المملكة العربية السعودية',
      totalOrders: 12,
      totalSpent: 145000
    },
    {
      id: '2',
      name: 'شركة الموضة الحديثة',
      contact: 'نورا محمد',
      phone: '+966 55 987 6543',
      email: 'orders@modern-fashion.com',
      address: 'جدة، المملكة العربية السعودية',
      totalOrders: 8,
      totalSpent: 98000
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-100'
      case 'shipped': return 'text-green-600 bg-green-100'
      case 'delivered': return 'text-purple-600 bg-purple-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'مؤكد'
      case 'shipped': return 'تم الشحن'
      case 'delivered': return 'تم التسليم'
      case 'pending': return 'في الانتظار'
      case 'cancelled': return 'ملغي'
      default: return 'غير محدد'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المبيعات</h1>
          <p className="text-gray-600 mt-1">إدارة أوامر البيع والعملاء</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-5 w-5" />
            <span>إضافة عميل</span>
          </button>
          <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="h-5 w-5" />
            <span>أمر بيع جديد</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">أوامر البيع</p>
              <p className="text-2xl font-bold text-gray-900">{salesOrders.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي المبيعات</p>
              <p className="text-2xl font-bold text-gray-900">{salesOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()} ر.س</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">العملاء النشطين</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">متوسط قيمة الطلب</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(salesOrders.reduce((sum, order) => sum + order.total, 0) / salesOrders.length).toLocaleString()} ر.س</p>
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
              أوامر البيع
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'customers'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              العملاء
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'quotes'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              عروض الأسعار
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="البحث في أوامر البيع..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  dir="rtl"
                />
              </div>

              {/* Sales Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        رقم الأمر
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        العميل
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        التاريخ
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        عدد الأصناف
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجمالي
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الحالة
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {salesOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-500">تسليم: {order.deliveryDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.customer}</div>
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
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
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

          {activeTab === 'customers' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="البحث في العملاء..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  dir="rtl"
                />
              </div>

              {/* Customers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer) => (
                  <div key={customer.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:card-shadow transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{customer.name}</h3>
                        <p className="text-sm text-gray-600">{customer.contact}</p>
                      </div>
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span>📞 {customer.phone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>📧 {customer.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>📍 {customer.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                        <p className="text-lg font-bold text-gray-900">{customer.totalOrders}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">إجمالي المبلغ</p>
                        <p className="text-lg font-bold text-green-600">{customer.totalSpent.toLocaleString()} ر.س</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-4">
                      <button className="text-primary-600 hover:text-primary-900 p-1 rounded transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1 rounded transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عروض أسعار</h3>
                  <p className="text-gray-600">ستظهر عروض الأسعار المرسلة للعملاء هنا</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SalesManagement