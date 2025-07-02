import React, { useState } from 'react'
import { FileText, Download, Calendar, Filter, TrendingUp, Package, DollarSign, Users } from 'lucide-react'

const ReportsCenter: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('')
  const [dateRange, setDateRange] = useState('month')

  const reportCategories = [
    {
      title: 'تقارير المبيعات',
      icon: DollarSign,
      color: 'bg-green-500',
      reports: [
        'تقرير المبيعات اليومية',
        'تقرير المبيعات الشهرية',
        'تقرير المبيعات حسب العميل',
        'تقرير المبيعات حسب المنتج',
        'تقرير ربحية المبيعات'
      ]
    },
    {
      title: 'تقارير المخزون',
      icon: Package,
      color: 'bg-blue-500',
      reports: [
        'تقرير أرصدة المخزون',
        'تقرير حركة المخزون',
        'تقرير قيمة المخزون',
        'تقرير المنتجات الراكدة',
        'تقرير تنبيهات المخزون'
      ]
    },
    {
      title: 'تقارير المشتريات',
      icon: TrendingUp,
      color: 'bg-purple-500',
      reports: [
        'تقرير أوامر الشراء',
        'تقرير فواتير الموردين',
        'تقرير المبالغ المستحقة للموردين',
        'تقرير أداء الموردين',
        'تقرير تكاليف الشراء'
      ]
    },
    {
      title: 'التقارير المالية',
      icon: FileText,
      color: 'bg-orange-500',
      reports: [
        'قائمة الدخل',
        'الميزانية العمومية',
        'تقرير التدفق النقدي',
        'ميزان المراجعة',
        'تقرير المصروفات'
      ]
    },
    {
      title: 'تقارير الموارد البشرية',
      icon: Users,
      color: 'bg-pink-500',
      reports: [
        'تقرير بيانات الموظفين',
        'تقرير الرواتب',
        'تقرير الحضور والانصراف',
        'تقرير الإجازات',
        'تقرير تكاليف الموظفين'
      ]
    }
  ]

  const quickStats = [
    { label: 'إجمالي المبيعات', value: '285,000 ر.س', change: '+12.3%' },
    { label: 'أوامر الإنتاج', value: '156', change: '+8.1%' },
    { label: 'قيمة المخزون', value: '180,000 ر.س', change: '+5.2%' },
    { label: 'عدد العملاء', value: '94', change: '+3.7%' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مركز التقارير</h1>
          <p className="text-gray-600 mt-1">تقارير شاملة ومفصلة لجميع أقسام المصنع</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
            <option value="quarter">هذا الربع</option>
            <option value="year">هذا العام</option>
            <option value="custom">فترة مخصصة</option>
          </select>
          
          <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Download className="h-5 w-5" />
            <span>تصدير التقرير</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} من الفترة السابقة</p>
              </div>
              <div className="p-3 rounded-lg bg-primary-100">
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <div key={index} className="bg-white rounded-lg card-shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mr-4">{category.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  {category.reports.map((report, reportIndex) => (
                    <button
                      key={reportIndex}
                      onClick={() => setSelectedReport(report)}
                      className={`w-full text-right p-3 rounded-lg transition-colors hover:bg-gray-50 border ${
                        selectedReport === report 
                          ? 'border-primary-200 bg-primary-50 text-primary-700' 
                          : 'border-gray-200 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{report}</span>
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Download className="h-4 w-4" />
                          </button>
                          <FileText className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Report Preview */}
      {selectedReport && (
        <div className="bg-white rounded-lg card-shadow">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{selectedReport}</h3>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>فلترة</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>تاريخ مخصص</span>
                </button>
                <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>تصدير</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">معاينة التقرير</h3>
                <p className="text-gray-600">سيتم عرض بيانات التقرير "{selectedReport}" هنا</p>
                <div className="mt-6">
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    إنشاء التقرير
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Reports */}
      <div className="bg-white rounded-lg card-shadow">
        <div className="border-b border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900">التقارير الأخيرة</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: 'تقرير المبيعات الشهرية - ديسمبر 2023', date: '2024-01-15', size: '2.4 MB' },
              { name: 'تقرير المخزون - نهاية العام', date: '2024-01-10', size: '1.8 MB' },
              { name: 'قائمة الدخل - Q4 2023', date: '2024-01-05', size: '956 KB' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="mr-4">
                    <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-500">{report.date} • {report.size}</p>
                  </div>
                </div>
                
                <button className="text-gray-400 hover:text-gray-600">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportsCenter