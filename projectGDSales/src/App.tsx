import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
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
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
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
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App