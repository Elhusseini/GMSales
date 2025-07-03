import React, { useState } from 'react'
import { Plus, Search, Factory, Clock, CheckCircle, AlertTriangle, Package } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import toast from 'react-hot-toast'

const ProductionManagement: React.FC = () => {
  const { t, direction } = useLanguage()
  const [activeTab, setActiveTab] = useState('orders')

  const [productionOrders, setProductionOrders] = useState([
    {
      id: 'PR-001',
      product: 'قميص قطني رجالي',
      quantity: 100,
      status: 'in_progress',
      startDate: '2024-01-10',
      dueDate: '2024-01-20',
      progress: 65,
      materials: ['قطن خام', 'خيوط', 'أزرار']
    },
    {
      id: 'PR-002',
      product: 'فستان صيفي نسائي',
      quantity: 50,
      status: 'completed',
      startDate: '2024-01-05',
      dueDate: '2024-01-15',
      progress: 100,
      materials: ['قماش شيفون', 'خيوط ملونة', 'سحاب']
    },
    {
      id: 'PR-003',
      product: 'بنطلون جينز',
      quantity: 75,
      status: 'planned',
      startDate: '2024-01-20',
      dueDate: '2024-01-30',
      progress: 0,
      materials: ['قماش جينز', 'خيوط قوية', 'أزرار معدنية']
    }
  ])

  const handleNewProductionOrder = () => {
    const newOrder = {
      id: `PR-${String(productionOrders.length + 1).padStart(3, '0')}`,
      product: 'منتج جديد',
      quantity: Math.floor(Math.random() * 100) + 50,
      status: 'planned' as const,
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 0,
      materials: ['مواد خام', 'خيوط', 'إكسسوارات']
    }
    
    setProductionOrders([newOrder, ...productionOrders])
    toast.success('تم إضافة أمر إنتاج جديد بنجاح')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'in_progress': return 'text-blue-600 bg-blue-100'
      case 'planned': return 'text-yellow-600 bg-yellow-100'
      case 'delayed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'in_progress': return <Factory className="h-4 w-4" />
      case 'planned': return <Clock className="h-4 w-4" />
      case 'delayed': return <AlertTriangle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'مكتمل'
      case 'in_progress': return 'قيد التنفيذ'
      case 'planned': return 'مخطط'
      case 'delayed': return 'متأخر'
      default: return 'غير محدد'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('production.title')}</h1>
          <p className="text-gray-600 mt-1">{t('production.description')}</p>
        </div>
        
        <button 
          onClick={handleNewProductionOrder}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>{t('production.newOrder')}</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Factory className="h-6 w-6 text-blue-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('production.orders')}</p>
              <p className="text-2xl font-bold text-gray-900">{productionOrders.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('production.completed')}</p>
              <p className="text-2xl font-bold text-gray-900">{productionOrders.filter(order => order.status === 'completed').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100">
              <Factory className="h-6 w-6 text-orange-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('production.inProgress')}</p>
              <p className="text-2xl font-bold text-gray-900">{productionOrders.filter(order => order.status === 'in_progress').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('production.totalQuantity')}</p>
              <p className="text-2xl font-bold text-gray-900">{productionOrders.reduce((sum, order) => sum + order.quantity, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Production Orders */}
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
              {t('production.orders')}
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'materials'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('production.materials')}
            </button>
            <button
              onClick={() => setActiveTab('stages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'stages'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('production.stages')}
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
                  placeholder={t('production.searchPlaceholder')}
                  className={`w-full ${direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  dir={direction}
                />
              </div>

              {/* Production Orders Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {productionOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:card-shadow transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.product}</p>
                        <p className="text-sm text-gray-500 mt-1">الكمية: {order.quantity} قطعة</p>
                      </div>
                      
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className={`${direction === 'rtl' ? 'mr-1' : 'ml-1'}`}>{getStatusText(order.status)}</span>
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{t('production.progress')}</span>
                        <span className="text-sm text-gray-500">{order.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${order.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="flex justify-between mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">{t('production.startDate')}</p>
                        <p className="font-medium">{order.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">{t('production.dueDate')}</p>
                        <p className="font-medium">{order.dueDate}</p>
                      </div>
                    </div>

                    {/* Materials */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">{t('production.requiredMaterials')}:</p>
                      <div className="flex flex-wrap gap-1">
                        {order.materials.map((material, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <Package className="h-12 w-12 text-gray-400 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">إدارة المواد الخام</h3>
                  <p className="text-gray-600">يمكنك إدارة المواد الخام المطلوبة للإنتاج من هنا</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stages' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <Factory className="h-12 w-12 text-gray-400 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">مراحل الإنتاج</h3>
                  <p className="text-gray-600">تتبع مراحل العملية الإنتاجية المختلفة</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductionManagement