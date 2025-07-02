import React from 'react'
import { Package, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const inventoryData = [
  { category: 'قمصان', stock: 156, status: 'high', change: 12 },
  { category: 'بناطيل', stock: 89, status: 'medium', change: -5 },
  { category: 'فساتين', stock: 34, status: 'low', change: 8 },
  { category: 'جاكيتات', stock: 67, status: 'medium', change: 0 },
]

const InventoryStatus: React.FC = () => {
  const { t, direction } = useLanguage()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Minus className="h-4 w-4 text-gray-600" />
  }

  return (
    <div className="bg-white rounded-lg p-6 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.inventoryStatus')}</h3>
        <Package className="h-5 w-5 text-gray-600" />
      </div>
      
      <div className="space-y-4">
        {inventoryData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                {item.stock}
              </span>
              <span className="font-medium text-gray-900">{item.category}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              {getChangeIcon(item.change)}
              <span className="text-sm text-gray-600">{Math.abs(item.change)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InventoryStatus