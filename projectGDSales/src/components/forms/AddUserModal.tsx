import React, { useState } from 'react'
import { X, Save, User, Mail, Shield, Building } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import toast from 'react-hot-toast'

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (userData: any) => void
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const { t, direction } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: '',
    phone: '',
    status: 'active',
    permissions: [] as string[]
  })

  const [errors, setErrors] = useState<any>({})

  const roles = [
    'مدير النظام',
    'مدير مبيعات',
    'مدير مخزن',
    'محاسب',
    'موظف مبيعات',
    'موظف مخزن',
    'موظف إنتاج'
  ]

  const departments = [
    'تقنية المعلومات',
    'المبيعات',
    'المخازن',
    'المحاسبة',
    'الإنتاج',
    'الموارد البشرية',
    'الإدارة العامة'
  ]

  const permissionsList = [
    { value: 'users', label: 'إدارة المستخدمين' },
    { value: 'products', label: 'إدارة المنتجات' },
    { value: 'inventory', label: 'إدارة المخزون' },
    { value: 'sales', label: 'إدارة المبيعات' },
    { value: 'purchases', label: 'إدارة المشتريات' },
    { value: 'finance', label: 'الإدارة المالية' },
    { value: 'reports', label: 'التقارير' },
    { value: 'settings', label: 'الإعدادات' }
  ]

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.name.trim()) {
      newErrors.name = 'اسم المستخدم مطلوب'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة'
    } else if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور غير متطابقة'
    }

    if (!formData.role) {
      newErrors.role = 'الدور مطلوب'
    }

    if (!formData.department) {
      newErrors.department = 'القسم مطلوب'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        phone: formData.phone,
        status: formData.status,
        permissions: formData.role === 'مدير النظام' ? ['all'] : formData.permissions
      }

      onSave(userData)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        department: '',
        phone: '',
        status: 'active',
        permissions: []
      })
      setErrors({})
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permission]
        : prev.permissions.filter(p => p !== permission)
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <User className={`h-6 w-6 text-primary-600 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
            إضافة مستخدم جديد
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم الكامل *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="أدخل الاسم الكامل"
                dir={direction}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="user@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="أدخل كلمة المرور"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تأكيد كلمة المرور *
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="أعد إدخال كلمة المرور"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الدور *
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">اختر الدور</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                القسم *
              </label>
              <select
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.department ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">اختر القسم</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم الهاتف
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+966 50 123 4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحالة
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </div>

          {formData.role !== 'مدير النظام' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الصلاحيات
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {permissionsList.map((permission) => (
                  <label key={permission.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission.value)}
                      onChange={(e) => handlePermissionChange(permission.value, e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="mr-2 text-sm text-gray-700">{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>حفظ المستخدم</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal