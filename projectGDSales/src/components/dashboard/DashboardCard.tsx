import React from 'react'
import { DivideIcon as LucideIcon } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

interface DashboardCardProps {
  title: string
  value: string
  change: string
  changeType: 'increase' | 'decrease'
  icon: LucideIcon
  color: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color
}) => {
  const { t, direction } = useLanguage()

  return (
    <div className="bg-white rounded-lg p-6 card-shadow hover-scale">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm font-medium mt-1 ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change} {t('dashboard.lastMonth')}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  )
}

export default DashboardCard