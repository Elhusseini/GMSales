import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Warehouse, 
  ShoppingCart, 
  Factory, 
  CreditCard, 
  DollarSign, 
  UserCheck, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation()
  const { t, direction } = useLanguage()

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: t('sidebar.dashboard'), color: 'text-blue-600' },
    { path: '/users', icon: Users, label: t('sidebar.users'), color: 'text-green-600' },
    { path: '/products', icon: Package, label: t('sidebar.products'), color: 'text-purple-600' },
    { path: '/inventory', icon: Warehouse, label: t('sidebar.inventory'), color: 'text-orange-600' },
    { path: '/purchases', icon: ShoppingCart, label: t('sidebar.purchases'), color: 'text-indigo-600' },
    { path: '/production', icon: Factory, label: t('sidebar.production'), color: 'text-red-600' },
    { path: '/sales', icon: CreditCard, label: t('sidebar.sales'), color: 'text-emerald-600' },
    { path: '/finance', icon: DollarSign, label: t('sidebar.finance'), color: 'text-yellow-600' },
    { path: '/hr', icon: UserCheck, label: t('sidebar.hr'), color: 'text-pink-600' },
    { path: '/reports', icon: FileText, label: t('sidebar.reports'), color: 'text-cyan-600' },
    { path: '/settings', icon: Settings, label: t('sidebar.settings'), color: 'text-gray-600' },
  ]

  const ChevronIcon = direction === 'rtl' 
    ? (collapsed ? ChevronLeft : ChevronRight)
    : (collapsed ? ChevronRight : ChevronLeft)

  return (
    <div className={`fixed ${direction === 'rtl' ? 'right-0' : 'left-0'} top-0 h-full bg-white border-${direction === 'rtl' ? 'l' : 'r'} border-gray-200 transition-all duration-300 z-40 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* هيدر الشريط الجانبي */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Factory className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{t('sidebar.systemName')}</h2>
              <p className="text-xs text-gray-500">{t('sidebar.systemDesc')}</p>
            </div>
          </div>
        )}
        
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronIcon className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* قائمة التنقل */}
      <nav className="p-4 space-y-2 overflow-y-auto h-full scrollbar-thin">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? `bg-primary-50 border-${direction === 'rtl' ? 'l' : 'r'}-4 border-primary-600 text-primary-700` 
                  : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : item.color} transition-colors`} />
              {!collapsed && (
                <span className={`font-medium transition-colors ${isActive ? 'text-primary-700' : 'group-hover:text-gray-900'}`}>
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar