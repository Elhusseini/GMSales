import React, { useState } from 'react'
import { Plus, Search, DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react'

const FinanceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const accounts = [
    { id: '1', name: 'الصندوق الرئيسي', type: 'نقدي', balance: 45000, currency: 'ر.س' },
    { id: '2', name: 'البنك الأهلي - حساب جاري', type: 'بنكي', balance: 125000, currency: 'ر.س' },
    { id: '3', name: 'حسابات العملاء المدينة', type: 'مدين', balance: 85000, currency: 'ر.س' },
    { id: '4', name: 'حسابات الموردين الدائنة', type: 'دائن', balance: -65000, currency: 'ر.س' }
  ]

  const transactions = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'استلام دفعة من العميل - متجر الأناقة',
      account: 'البنك الأهلي',
      type: 'credit',
      amount: 12500,
      reference: 'SO-001'
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'دفع فاتورة مورد - شركة النسيج الذهبي',
      account: 'البنك الأهلي',
      type: 'debit',
      amount: 15000,
      reference: 'PO-001'
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'مصروفات إدارية - فواتير كهرباء',
      account: 'الصندوق الرئيسي',
      type: 'debit',
      amount: 2500,
      reference: 'EXP-003'
    }
  ]

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'نقدي': return 'text-green-600 bg-green-100'
      case 'بنكي': return 'text-blue-600 bg-blue-100'
      case 'مدين': return 'text-orange-600 bg-orange-100'
      case 'دائن': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">الإدارة المالية</h1>
          <p className="text-gray-600 mt-1">إدارة الحسابات المالية والمعاملات</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-5 w-5" />
            <span>سند قبض</span>
          </button>
          <button className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
            <Plus className="h-5 w-5" />
            <span>سند صرف</span>
          </button>
          <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="h-5 w-5" />
            <span>قيد يومية</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي الأصول</p>
              <p className="text-2xl font-bold text-gray-900">255,000 ر.س</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">الإيرادات الشهرية</p>
              <p className="text-2xl font-bold text-gray-900">185,000 ر.س</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المصروفات الشهرية</p>
              <p className="text-2xl font-bold text-gray-900">125,000 ر.س</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <CreditCard className="h-6 w-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">صافي الربح</p>
              <p className="text-2xl font-bold text-green-600">60,000 ر.س</p>
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
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab('accounts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'accounts'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              الحسابات
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'transactions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              المعاملات
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'reports'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              التقارير المالية
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Stats */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">الملخص المالي</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">إجمالي الإيرادات</span>
                      <span className="text-lg font-bold text-green-600">285,000 ر.س</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">إجمالي المصروفات</span>
                      <span className="text-lg font-bold text-red-600">180,000 ر.س</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">صافي الربح</span>
                      <span className="text-lg font-bold text-blue-600">105,000 ر.س</span>
                    </div>
                  </div>
                </div>

                {/* Cash Flow */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">التدفق النقدي</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">النقد في الصندوق</span>
                      <span className="text-lg font-bold text-gray-900">45,000 ر.س</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">أرصدة البنوك</span>
                      <span className="text-lg font-bold text-gray-900">125,000 ر.س</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">إجمالي السيولة</span>
                      <span className="text-lg font-bold text-primary-600">170,000 ر.س</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'accounts' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="البحث في الحسابات..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  dir="rtl"
                />
              </div>

              {/* Accounts Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        اسم الحساب
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        النوع
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الرصيد
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        العملة
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {accounts.map((account) => (
                      <tr key={account.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{account.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccountTypeColor(account.type)}`}>
                            {account.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-bold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.abs(account.balance).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{account.currency}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="البحث في المعاملات..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  dir="rtl"
                />
              </div>

              {/* Transactions List */}
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {transaction.type === 'credit' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{transaction.description}</h4>
                          <p className="text-sm text-gray-500">{transaction.account}</p>
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <div className={`text-sm font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'credit' ? '+' : '-'}{transaction.amount.toLocaleString()} ر.س
                        </div>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                        <p className="text-xs text-gray-500">{transaction.reference}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 hover:card-shadow transition-all cursor-pointer">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-blue-100">
                      <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mr-3">قائمة الدخل</h3>
                  </div>
                  <p className="text-sm text-gray-600">عرض الإيرادات والمصروفات وصافي الربح</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:card-shadow transition-all cursor-pointer">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-green-100">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mr-3">الميزانية العمومية</h3>
                  </div>
                  <p className="text-sm text-gray-600">عرض الأصول والخصوم وحقوق الملكية</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:card-shadow transition-all cursor-pointer">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-purple-100">
                      <CreditCard className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mr-3">التدفق النقدي</h3>
                  </div>
                  <p className="text-sm text-gray-600">تتبع حركة النقد الداخل والخارج</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FinanceManagement