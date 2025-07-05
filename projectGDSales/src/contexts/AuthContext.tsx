import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { authAPI, getAuthToken } from '../services/api'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
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
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getAuthToken()
      if (token) {
        try {
          const response = await authAPI.getCurrentUser()
          if (response.success) {
            setUser(response.data)
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          // Token might be expired, remove it
          await authAPI.logout()
        }
      }
      setLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response = await authAPI.login(email, password)
      
      if (response.success && response.data.user) {
        setUser(response.data.user)
        toast.success('تم تسجيل الدخول بنجاح')
        return true
      } else {
        toast.error('فشل في تسجيل الدخول')
        return false
      }
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error.message || 'خطأ في تسجيل الدخول')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
      setUser(null)
      toast.success('تم تسجيل الخروج بنجاح')
    } catch (error) {
      console.error('Logout error:', error)
      // Still clear user state even if API call fails
      setUser(null)
    }
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}