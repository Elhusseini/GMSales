import React from 'react'
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  AlertTriangle,
  BarChart3,
  PieChart
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import DashboardCard from '../components/dashboard/DashboardCard'
import SalesChart from '../components/dashboard/SalesChart'
import InventoryStatus from '../components/dashboard/InventoryStatus'
import RecentActivities from '../components/dashboard/RecentActivities'

const Dashboard: React.FC = () => {
  const { t, direction } = useLanguage()

  const dashboardStats = [
    {
      title: t('dashboard.totalSales'),
      value: '285,000 ر.س',
      change: '+12.3%',
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: t('dashboard.totalOrders'),
      value: '156',
      change: '+8.1%',
      changeType: 'increase' as const,
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      title: t('dashboard.activeProducts'),
      value: '842',
      change: '+2.4%',
      changeType: 'increase' as const,
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      title: t('dashboard.activeCustomers'),
      value: '94',
      change: '-1.2%',
      changeType: 'decrease' as const,
      icon: Users,
      color: 'bg-orange-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* ترحيب */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{t('dashboard.welcome')}</h1>
        <p className="text-primary-100">{t('dashboard.description')}</p>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* الرسوم البيانية والتقارير */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <InventoryStatus />
      </div>

      {/* الأنشطة الأخيرة والتنبيهات */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <AlertTriangle className={`h-5 w-5 text-orange-500 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
              {t('dashboard.importantAlerts')}
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">انخفاض مخزون قمصان قطنية - متبقي 5 قطع</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">طلب شراء #1024 يحتاج موافقة</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">تم استلام شحنة جديدة من المورد الرئيسي</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard