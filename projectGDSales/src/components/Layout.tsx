import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import Sidebar from './Sidebar'
import Header from './Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  const { direction } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 flex" dir={direction}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        direction === 'rtl' 
          ? (sidebarCollapsed ? 'mr-16' : 'mr-64')
          : (sidebarCollapsed ? 'ml-16' : 'ml-64')
      }`}>
        <Header />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout