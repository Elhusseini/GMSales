import React from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive'
  lastLogin: string
  permissions: string[]
}

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (user: Omit<User, 'id' | 'lastLogin'>) => void
}

interface FormData {
  name: string
  email: string
  role: string
  department: string
  status: 'active' | 'inactive'
  permissions: string[]
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      status: 'active',
      permissions: []
    }
  })

  const onSubmit = (data: FormData) => {
    onSave(data)
    reset()
    onClose()
    toast.success('تم إضافة المستخدم بنجاح')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">إضافة مستخدم جديد</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم الكامل *
              </label>
              <input
                type="text"
                {...register('name', { required: 'الاسم مطلوب' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                dir="rtl"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني *
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'البريد الإلكتروني مطلوب',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'البريد الإلكتروني غير صحيح'
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الدور *
              </label>
              <select
                {...register('role', { required: 'الدور مطلوب' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">اختر الدور</option>
                <option value="مدير النظام">مدير النظام</option>
                <option value="مدير مبيعات">مدير مبيعات</option>
                <option value="مدير مخزن">مدير مخزن</option>
                <option value="محاسب">محاسب</option>
                <option value="موظف مبيعات">موظف مبيعات</option>
                <option value="موظف مخزن">موظف مخزن</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                القسم *
              </label>
              <select
                {...register('department', { required: 'القسم مطلوب' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">اختر القسم</option>
                <option value="تقنية المعلومات">تقنية المعلومات</option>
                <option value="المبيعات">المبيعات</option>
                <option value="المخازن">المخازن</option>
                <option value="المحاسبة">المحاسبة</option>
                <option value="الإنتاج">الإنتاج</option>
                <option value="الموارد البشرية">الموارد البشرية</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحالة
              </label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الصلاحيات
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { value: 'users', label: 'إدارة المستخدمين' },
                { value: 'products', label: 'إدارة المنتجات' },
                { value: 'inventory', label: 'إدارة المخزون' },
                { value: 'sales', label: 'إدارة المبيعات' },
                { value: 'purchases', label: 'إدارة المشتريات' },
                { value: 'finance', label: 'الإدارة المالية' },
                { value: 'reports', label: 'التقارير' },
                { value: 'settings', label: 'الإعدادات' }
              ].map((permission) => (
                <label key={permission.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={permission.value}
                    {...register('permissions')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="mr-2 text-sm text-gray-700">{permission.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              إضافة المستخدم
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddUserModal