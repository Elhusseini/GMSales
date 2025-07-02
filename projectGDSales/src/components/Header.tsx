import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { Bell, Search, Settings, User, LogOut, Globe } from 'lucide-react'

const Header: React.FC = () => {
  const { user, logout } = useAuth()
  const { language, setLanguage, t, direction } = useLanguage()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar')
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">{t('header.title')}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* البحث */}
          <div className="relative">
            <Search className={`absolute ${direction === 'rtl' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4`} />
            <input
              type="text"
              placeholder={t('header.search')}
              className={`${direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
              dir={direction}
            />
          </div>

          {/* تبديل اللغة */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            title={language === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          >
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium">
              {language === 'ar' ? 'EN' : 'ع'}
            </span>
          </button>

          {/* الإشعارات */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
          </button>

          {/* قائمة المستخدم */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className={`flex flex-col ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                <span className="text-xs text-gray-500">{user?.role}</span>
              </div>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </button>

            {showProfileMenu && (
              <div className={`absolute ${direction === 'rtl' ? 'right-0' : 'left-0'} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50`}>
                <button className={`flex items-center space-x-2 w-full px-4 py-2 ${direction === 'rtl' ? 'text-right' : 'text-left'} hover:bg-gray-100 transition-colors`}>
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{t('header.settings')}</span>
                </button>
                <hr className="my-1" />
                <button 
                  onClick={logout}
                  className={`flex items-center space-x-2 w-full px-4 py-2 ${direction === 'rtl' ? 'text-right' : 'text-left'} hover:bg-gray-100 transition-colors text-red-600`}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">{t('header.logout')}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header