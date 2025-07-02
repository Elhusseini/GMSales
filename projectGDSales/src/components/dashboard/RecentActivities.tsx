import React from 'react'
import { ShoppingCart, Package, User, DollarSign } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const activities = [
  {
    type: 'sale',
    icon: ShoppingCart,
    title: 'طلب مبيعات جديد',
    description: 'تم إنشاء طلب مبيعات #1234 بقيمة 15,000 ر.س',
    time: 'منذ 5 دقائق',
    color: 'bg-green-500'
  },
  {
    type: 'inventory',
    icon: Package,
    title: 'تحديث المخزون',
    description: 'تم إضافة 50 قطعة من القمصان القطنية للمخزون',
    time: 'منذ 15 دقيقة',
    color: 'bg-blue-500'
  },
  {
    type: 'user',
    icon: User,
    title: 'مستخدم جديد',
    description: 'تم إضافة موظف جديد في قسم المبيعات',
    time: 'منذ ساعة',
    color: 'bg-purple-500'
  },
  {
    type: 'finance',
    icon: DollarSign,
    title: 'دفعة مالية',
    description: 'تم استلام دفعة 25,000 ر.س من العميل الرئيسي',
    time: 'منذ ساعتين',
    color: 'bg-orange-500'
  }
]

const RecentActivities: React.FC = () => {
  const { t, direction } = useLanguage()

  return (
    <div className="bg-white rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.recentActivities')}</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecentActivities