import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LoginPage from './components/auth/LoginPage'
import Dashboard from './pages/Dashboard'
import UsersManagement from './pages/UsersManagement'
import ProductsManagement from './pages/ProductsManagement'
import InventoryManagement from './pages/InventoryManagement'
import PurchasesManagement from './pages/PurchasesManagement'
import ProductionManagement from './pages/ProductionManagement'
import SalesManagement from './pages/SalesManagement'
import FinanceManagement from './pages/FinanceManagement'
import HRManagement from './pages/HRManagement'
import ReportsCenter from './pages/ReportsCenter'
import SystemSettings from './pages/SystemSettings'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { DataProvider } from './contexts/DataContext'

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <DataProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="/products" element={<ProductsManagement />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/purchases" element={<PurchasesManagement />} />
          <Route path="/production" element={<ProductionManagement />} />
          <Route path="/sales" element={<SalesManagement />} />
          <Route path="/finance" element={<FinanceManagement />} />
          <Route path="/hr" element={<HRManagement />} />
          <Route path="/reports" element={<ReportsCenter />} />
          <Route path="/settings" element={<SystemSettings />} />
        </Routes>
      </Layout>
    </DataProvider>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App