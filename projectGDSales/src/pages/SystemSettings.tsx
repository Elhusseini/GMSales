import React, { useState } from 'react'
import { Save, Upload, Download, Settings, Shield, Database, Palette, Bell, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import toast from 'react-hot-toast'

const SystemSettings: React.FC = () => {
  const { t, language, setLanguage, direction } = useLanguage()
  const [activeTab, setActiveTab] = useState('general')
  const [appName, setAppName] = useState(t('header.title'))
  const [companyName, setCompanyName] = useState('شركة صباح الخير للصناعات النسيجية')
  const [companyAddress, setCompanyAddress] = useState('الرياض، المملكة العربية السعودية')
  const [companyPhone, setCompanyPhone] = useState('+966 11 234 5678')
  const [companyEmail, setCompanyEmail] = useState('info@sabah-alkhair.com')

  const handleSaveSettings = () => {
    toast.success('تم حفظ الإعدادات بنجاح')
  }

  const handleBackup = () => {
    toast.success('تم إنشاء نسخة احتياطية بنجاح')
  }

  const handleRestore = () => {
    toast.success('تم استعادة البيانات بنجاح')
  }

  const handleLanguageChange = (newLanguage: 'ar' | 'en') => {
    setLanguage(newLanguage)
    toast.success(newLanguage === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h1>
          <p className="text-gray-600 mt-1">{t('settings.description')}</p>
        </div>
        
        <button
          onClick={handleSaveSettings}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Save className="h-5 w-5" />
          <span>{t('settings.saveSettings')}</span>
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-lg card-shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'general'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('settings.general')}
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'company'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('settings.company')}
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'security'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('settings.security')}
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'backup'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('settings.backup')}
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'appearance'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t('settings.appearance')}
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Settings className={`h-6 w-6 text-gray-600 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                <h3 className="text-lg font-semibold text-gray-900">{t('settings.general')}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم البرنامج
                  </label>
                  <input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    dir={direction}
                  />
                  <p className="text-sm text-gray-500 mt-1">هذا الاسم سيظهر في شريط العنوان</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('settings.language')}
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleLanguageChange('ar')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                        language === 'ar'
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Globe className="h-4 w-4" />
                      <span>{t('settings.arabic')}</span>
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                        language === 'en'
                          ? 'bg-primary-50 border-primary-200 text-primary-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Globe className="h-4 w-4" />
                      <span>{t('settings.english')}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العملة الافتراضية
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="SAR">ريال سعودي (ر.س)</option>
                    <option value="USD">دولار أمريكي ($)</option>
                    <option value="EUR">يورو (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تنسيق التاريخ
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">إعدادات التنبيهات</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className={`h-5 w-5 text-gray-400 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">تنبيهات انخفاض المخزون</p>
                        <p className="text-sm text-gray-500">إرسال تنبيه عند انخفاض مستوى المخزون</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell className={`h-5 w-5 text-gray-400 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">تنبيهات طلبات الشراء</p>
                        <p className="text-sm text-gray-500">إرسال تنبيه عند وجود طلبات تحتاج موافقة</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Settings className={`h-6 w-6 text-gray-600 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                <h3 className="text-lg font-semibold text-gray-900">{t('settings.company')}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الشركة
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    dir={direction}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان الشركة
                  </label>
                  <textarea
                    rows={3}
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    dir={direction}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="text"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    dir={direction}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    dir={direction}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">شعار الشركة</h4>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <span className="text-gray-400 text-sm">الشعار</span>
                  </div>
                  <div>
                    <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>رفع شعار جديد</span>
                    </button>
                    <p className="text-sm text-gray-500 mt-1">PNG أو JPG، حد أقصى 2MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Shield className={`h-6 w-6 text-gray-600 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                <h3 className="text-lg font-semibold text-gray-900">{t('settings.security')}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">تسجيل خروج تلقائي</h4>
                    <p className="text-sm text-gray-500">تسجيل خروج المستخدم تلقائياً بعد فترة عدم نشاط</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="30">30 دقيقة</option>
                    <option value="60">60 دقيقة</option>
                    <option value="120">120 دقيقة</option>
                    <option value="0">معطل</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">تتبع سجل النشاط</h4>
                    <p className="text-sm text-gray-500">حفظ سجل بجميع العمليات المهمة في النظام</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">تشفير البيانات الحساسة</h4>
                    <p className="text-sm text-gray-500">تشفير البيانات المالية والمعلومات الحساسة</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    disabled
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Database className={`h-6 w-6 text-gray-600 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                <h3 className="text-lg font-semibold text-gray-900">{t('settings.backup')}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">إنشاء نسخة احتياطية</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    قم بإنشاء نسخة احتياطية من جميع بيانات النظام بما في ذلك قاعدة البيانات والإعدادات
                  </p>
                  <button
                    onClick={handleBackup}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full justify-center"
                  >
                    <Download className="h-4 w-4" />
                    <span>إنشاء نسخة احتياطية</span>
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">استعادة البيانات</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    استعادة البيانات من نسخة احتياطية سابقة. تحذير: سيتم استبدال البيانات الحالية
                  </p>
                  <button
                    onClick={handleRestore}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-full justify-center"
                  >
                    <Upload className="h-4 w-4" />
                    <span>استعادة من ملف</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Palette className={`h-6 w-6 text-gray-600 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
                <h3 className="text-lg font-semibold text-gray-900">{t('settings.appearance')}</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    سمة النظام
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-2 border-primary-200 rounded-lg p-4 cursor-pointer bg-primary-50">
                      <div className="flex items-center mb-3">
                        <div className="w-4 h-4 border-2 border-primary-600 rounded-full bg-primary-600"></div>
                        <span className={`${direction === 'rtl' ? 'mr-3' : 'ml-3'} font-medium text-gray-900`}>السمة الافتراضية</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-6 bg-primary-600 rounded"></div>
                        <div className="w-8 h-6 bg-gray-200 rounded"></div>
                        <div className="w-8 h-6 bg-gray-100 rounded"></div>
                      </div>
                    </div>

                    <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                      <div className="flex items-center mb-3">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        <span className={`${direction === 'rtl' ? 'mr-3' : 'ml-3'} font-medium text-gray-900`}>السمة الداكنة</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-6 bg-gray-800 rounded"></div>
                        <div className="w-8 h-6 bg-gray-600 rounded"></div>
                        <div className="w-8 h-6 bg-gray-400 rounded"></div>
                      </div>
                    </div>

                    <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                      <div className="flex items-center mb-3">
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                        <span className={`${direction === 'rtl' ? 'mr-3' : 'ml-3'} font-medium text-gray-900`}>سمة مخصصة</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-8 h-6 bg-green-600 rounded"></div>
                        <div className="w-8 h-6 bg-blue-200 rounded"></div>
                        <div className="w-8 h-6 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    حجم الخط
                  </label>
                  <select className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="small">صغير</option>
                    <option value="medium" selected>متوسط</option>
                    <option value="large">كبير</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عدد العناصر في الصفحة
                  </label>
                  <select className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="10">10 عناصر</option>
                    <option value="25" selected>25 عنصر</option>
                    <option value="50">50 عنصر</option>
                    <option value="100">100 عنصر</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SystemSettings