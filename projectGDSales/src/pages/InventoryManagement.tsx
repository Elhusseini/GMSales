import React, { useState } from 'react'
import { Package, AlertTriangle, TrendingUp, TrendingDown, Plus, Search } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import toast from 'react-hot-toast'

const InventoryManagement: React.FC = () => {
  const { t, direction } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')

  const inventoryData = [
    { id: '1', name: 'قميص قطني رجالي', sku: 'SH-001', currentStock: 156, minStock: 50, maxStock: 200, location: 'مخزن A - رف 1', status: 'normal' },
    { id: '2', name: 'فستان صيفي نسائي', sku: 'DR-002', currentStock: 25, minStock: 30, maxStock: 100, location: 'مخزن B - رف 2', status: 'low' },
    { id: '3', name: 'بنطلون جينز', sku: 'JP-003', currentStock: 89, minStock: 40, maxStock: 150, location: 'مخزن A - رف 3', status: 'normal' },
  ]

  const movements = [
    { id: '1', type: 'in', product: 'قميص قطني رجالي', quantity: 50, date: '2024-01-15', reference: 'PO-001', notes: 'استلام من المورد الرئيسي' },
    { id: '2', type: 'out', product: 'فستان صيفي نسائي', quantity: 15, date: '2024-01-15', reference: 'SO-123', notes: 'شحن للعميل أحمد محمد' },
    { id: '3', type: 'transfer', product: 'بنطلون جينز', quantity: 10, date: '2024-01-14', reference: 'TR-001', notes: 'تحويل بين المخازن' },
  ]

  const handleStockCount = () => {
    toast.success('تم فتح نموذج جرد المخزون')
  }

  const handleStockMovement = () => {
    toast.success('تم فتح نموذج حركة مخزنية جديدة')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      default: return 'text-green-600 bg-green-100'
    }
  }

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'in': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'out': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <Package className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('inventory.title')}</h1>
          <p className="text-gray-600 mt-1">{t('inventory.description')}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleStockCount}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>{t('inventory.stockCount')}</span>
          </button>
          <button 
            onClick={handleStockMovement}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>{t('inventory.stockMovement')}</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('inventory.totalItems')}</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('inventory.totalQuantity')}</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryData.reduce((sum, item) => sum + item.currentStock, 0)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('inventory.belowMinimum')}</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryData.filter(item => item.status === 'low').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className={`${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>
              <p className="text-sm font-medium text-gray-600">{t('inventory.stockValue')}</p>
              <p className="text-2xl font-bold text-gray-900">245,000 ر.س</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg card-shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('inventory.overview')}
            </button>
            <button
              onClick={() => setActiveTab('movements')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'movements'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('inventory.movements')}
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'locations'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('inventory.locations')}
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className={`absolute ${direction === 'rtl' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`} />
                <input
                  type="text"
                  placeholder={t('inventory.searchPlaceholder')}
                  className={`w-full ${direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  dir={direction}
                />
              </div>

              {/* Inventory Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        المنتج
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        {t('inventory.currentStock')}
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        {t('inventory.minimumLevel')}
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        {t('inventory.maximumLevel')}
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        {t('inventory.location')}
                      </th>
                      <th className={`px-6 py-3 ${direction === 'rtl' ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}>
                        الحالة
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventoryData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-bold">{item.currentStock}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.minStock}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.maxStock}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                            {item.status === 'low' ? t('inventory.low') : 
                             item.status === 'high' ? t('inventory.high') : t('inventory.normal')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'movements' && (
            <div className="space-y-6">
              {/* Movements List */}
              <div className="space-y-4">
                {movements.map((movement) => (
                  <div key={movement.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-gray-100">
                          {getMovementIcon(movement.type)}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{movement.product}</h4>
                          <p className="text-sm text-gray-500">{movement.notes}</p>
                        </div>
                      </div>
                      
                      <div className={`${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-bold ${
                            movement.type === 'in' ? 'text-green-600' : 
                            movement.type === 'out' ? 'text-red-600' : 'text-blue-600'
                          }`}>
                            {movement.type === 'out' ? '-' : '+'}{movement.quantity}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{movement.date}</p>
                        <p className="text-xs text-gray-500">{movement.reference}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">مخزن A</h4>
                  <p className="text-sm text-gray-600 mb-4">المخزن الرئيسي - الدور الأول</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">السعة الكلية:</span>
                      <span className="text-sm font-medium">1000 قطعة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">المستخدم:</span>
                      <span className="text-sm font-medium">245 قطعة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">المتاح:</span>
                      <span className="text-sm font-medium text-green-600">755 قطعة</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">مخزن B</h4>
                  <p className="text-sm text-gray-600 mb-4">مخزن المنتجات النهائية</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">السعة الكلية:</span>
                      <span className="text-sm font-medium">500 قطعة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">المستخدم:</span>
                      <span className="text-sm font-medium">125 قطعة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">المتاح:</span>
                      <span className="text-sm font-medium text-green-600">375 قطعة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InventoryManagement