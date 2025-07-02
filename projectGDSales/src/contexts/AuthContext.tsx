import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'أحمد محمد',
    email: 'admin@sabah-alkhair.com',
    role: 'مدير النظام',
    permissions: ['all']
  })

  const login = async (email: string, password: string): Promise<boolean> => {
    // محاكاة عملية تسجيل الدخول
    if (email && password) {
      setUser({
        id: '1',
        name: 'أحمد محمد',
        email: email,
        role: 'مدير النظام',
        permissions: ['all']
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}