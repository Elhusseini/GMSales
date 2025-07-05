import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { Factory, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'

const LoginPage: React.FC = () => {
  const { login, loading } = useAuth()
  const { t, direction } = useLanguage()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast.error('يرجى إدخال البريد الإلكتروني وكلمة المرور')
      return
    }

    setIsLoading(true)
    try {
      const success = await login(formData.email, formData.password)
      if (!success) {
        toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة')
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء تسجيل الدخول')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDemoLogin = () => {
    setFormData({
      email: 'admin@sabah-alkhair.com',
      password: 'password'
    })
    toast.info('تم ملء بيانات المدير التجريبية')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4" dir={direction}>
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <Factory className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مصنع صباح الخير</h1>
          <p className="text-gray-600">نظام إدارة المصانع المتكامل</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">تسجيل الدخول</h2>
            <p className="text-gray-600 text-center">أدخل بياناتك للوصول إلى النظام</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className={`absolute ${direction === 'rtl' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full ${direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                  placeholder="أدخل البريد الإلكتروني"
                  dir={direction}
                  disabled={isLoading || loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className={`absolute ${direction === 'rtl' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full ${direction === 'rtl' ? 'pr-10 pl-12' : 'pl-10 pr-12'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                  placeholder="أدخل كلمة المرور"
                  disabled={isLoading || loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${direction === 'rtl' ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors`}
                  disabled={isLoading || loading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Demo Login Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                disabled={isLoading || loading}
              >
                استخدام بيانات المدير التجريبية
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || loading}
              className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading || loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>تسجيل الدخول</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="text-sm font-medium text-blue-900 mb-2">بيانات تجريبية:</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p><strong>البريد:</strong> admin@sabah-alkhair.com</p>
              <p><strong>كلمة المرور:</strong> password</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2024 مصنع صباح الخير. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage