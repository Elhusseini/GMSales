import React from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  category: string
  price: number
  cost: number
  stock: number
  sku: string
  status: 'active' | 'inactive'
  image: string
  description: string
}

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Omit<Product, 'id'>) => void
}

interface FormData {
  name: string
  category: string
  price: number
  cost: number
  stock: number
  sku: string
  status: 'active' | 'inactive'
  image: string
  description: string
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      status: 'active',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  })

  const onSubmit = (data: FormData) => {
    onSave(data)
    reset()
    onClose()
    toast.success('تم إضافة المنتج بنجاح')
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
          <h2 className="text-xl font-bold text-gray-900">إضافة منتج جديد</h2>
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
                اسم المنتج *
              </label>
              <input
                type="text"
                {...register('name', { required: 'اسم المنتج مطلوب' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                dir="rtl"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الفئة *
              </label>
              <select
                {...register('category', { required: 'الفئة مطلوبة' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">اختر الفئة</option>
                <option value="قمصان رجالية">قمصان رجالية</option>
                <option value="فساتين نسائية">فساتين نسائية</option>
                <option value="بناطيل">بناطيل</option>
                <option value="جاكيتات">جاكيتات</option>
                <option value="ملابس داخلية">ملابس داخلية</option>
                <option value="إكسسوارات">إكسسوارات</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رمز المنتج (SKU) *
              </label>
              <input
                type="text"
                {...register('sku', { required: 'رمز المنتج مطلوب' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="مثال: SH-001"
                dir="rtl"
              />
              {errors.sku && (
                <p className="text-red-500 text-sm mt-1">{errors.sku.message}</p>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                سعر التكلفة (ر.س) *
              </label>
              <input
                type="number"
                step="0.01"
                {...register('cost', { 
                  required: 'سعر التكلفة مطلوب',
                  min: { value: 0, message: 'السعر يجب أن يكون أكبر من صفر' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.cost && (
                <p className="text-red-500 text-sm mt-1">{errors.cost.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                سعر البيع (ر.س) *
              </label>
              <input
                type="number"
                step="0.01"
                {...register('price', { 
                  required: 'سعر البيع مطلوب',
                  min: { value: 0, message: 'السعر يجب أن يكون أكبر من صفر' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الكمية في المخزون *
              </label>
              <input
                type="number"
                {...register('stock', { 
                  required: 'الكمية مطلوبة',
                  min: { value: 0, message: 'الكمية يجب أن تكون أكبر من أو تساوي صفر' }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط الصورة
              </label>
              <input
                type="url"
                {...register('image')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وصف المنتج
            </label>
            <textarea
              rows={3}
              {...register('description')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="وصف مختصر للمنتج..."
              dir="rtl"
            />
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
              إضافة المنتج
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal