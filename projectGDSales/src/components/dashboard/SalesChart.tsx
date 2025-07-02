import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useLanguage } from '../../contexts/LanguageContext'

const Dashboard: React.FC = () => {
  const { t } = useLanguage()

  const data = [
    { month: t('months.january'), sales: 45000 },
    { month: t('months.february'), sales: 52000 },
    { month: t('months.march'), sales: 48000 },
    { month: t('months.april'), sales: 61000 },
    { month: t('months.may'), sales: 55000 },
    { month: t('months.june'), sales: 67000 },
  ]

  return (
    <div className="bg-white rounded-lg p-6 card-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.salesChart')}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} ر.س`, 'المبيعات']} />
            <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Dashboard