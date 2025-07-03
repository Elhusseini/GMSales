import React, { useState } from 'react'
import { X, Save, Package, Upload } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import toast from 'react-hot-toast'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (productData: any) => void
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
  const { t, direction } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sku: '',
    description: '',
    costPrice: '',
    sellingPrice: '',
    minStock: '',
    maxStock: '',
    currentStock: '',
    unit: 'قطعة',
    status: 'active'
  })

  const [errors, setErrors] = useState<any>({})

  const categories = [
    'قمصان رجالية',
    'قمصان نسائية',
    'فساتين نسائية',
    'بناطيل رجالية',
    'بناطيل نسائية',
    'جاكيتات',
    'ملابس داخلية',
    'إكسسوارات'
  ]

  const units = [
    'قطعة',
    'متر',
    'كيلو',
    'عبوة',
    'صندوق'
  ]

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.name.trim()) {
      newErrors.name = 'اسم المنتج مطلوب'
    }

    if (!formData.category) {
      newErrors.category = 'الفئة مطلوبة'
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'رمز المنتج مطلوب'
    }

    if (!formData.costPrice || parseFloat(formData.costPrice) <= 0) {
      newErrors.costPrice = 'سعر التكلفة يجب أن يكون أكبر من صفر'
    }

    if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = 'سعر البيع يجب أن يكون أكبر من صفر'
    }

    if (parseFloat(formData.sellingPrice) <= parseFloat(formData.costPrice)) {
      newErrors.sellingPrice = 'سعر البيع يجب أن يكون أكبر من سعر التكلفة'
    }

    if (!formData.minStock || parseInt(formData.minStock) < 0) {
      newErrors.minStock = 'الحد الأدنى للمخزون مطلوب'
    }

    if (!formData.maxStock || parseInt(formData.maxStock) <= parseInt(formData.minStock)) {
      newErrors.maxStock = 'الحد الأقصى يجب أن يكون أكبر من الحد الأدنى'
    }

    if (!formData.currentStock || parseInt(formData.currentStock) < 0) {
      newErrors.currentStock = 'الكمية الحالية مطلوبة'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const generateSKU = () => {
    const prefix = formData.category.substring(0, 2).toUpperCase()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}-${random}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      const productData = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        sku: formData.sku,
        description: formData.description,
        price: parseFloat(formData.sellingPrice),
        cost: parseFloat(formData.costPrice),
        stock: parseInt(formData.currentStock),
        minStock: parseInt(formData.minStock),
        maxStock: parseInt(formData.maxStock),
        unit: formData.unit,
        status: formData.status,
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
        createdAt: new Date().toISOString()
      }

      onSave(productData)
      toast.success('تم إضافة المنتج بنجاح')
      onClose()
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        sku: '',
        description: '',
        costPrice: '',
        sellingPrice: '',
        minStock: '',
        maxStock: '',
        currentStock: '',
        unit: 'قطعة',
        status: 'active'
      })
      setErrors({})
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }

    // Auto-generate SKU when category changes
    if (field === 'category' && value) {
      const newSKU = generateSKU()
      setFormData(prev => ({ ...prev, sku: newSKU }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Package className={`h-6 w-6 text-primary-600 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
            إضافة منتج جديد
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">المعلومات الأساسية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم المنتج *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="أدخل اسم المنتج"
                  dir={direction}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الفئة *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">اختر الفئة</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رمز المنتج (SKU) *
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => handleChange('sku', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.sku ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="مثال: SH-001"
                />
                {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الوحدة
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  وصف المنتج
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="أدخل وصف المنتج"
                  dir={direction}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">التسعير</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سعر التكلفة (ر.س) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.costPrice}
                  onChange={(e) => handleChange('costPrice', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.costPrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.costPrice && <p className="text-red-500 text-xs mt-1">{errors.costPrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سعر البيع (ر.س) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.sellingPrice}
                  onChange={(e) => handleChange('sellingPrice', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.sellingPrice && <p className="text-red-500 text-xs mt-1">{errors.sellingPrice}</p>}
              </div>

              {formData.costPrice && formData.sellingPrice && (
                <div className="md:col-span-2 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    هامش الربح: {(parseFloat(formData.sellingPrice) - parseFloat(formData.costPrice)).toFixed(2)} ر.س
                    ({(((parseFloat(formData.sellingPrice) - parseFloat(formData.costPrice)) / parseFloat(formData.costPrice)) * 100).toFixed(1)}%)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Inventory */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">إدارة المخزون</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الكمية الحالية *
                </label>
                <input
                  type="number"
                  value={formData.currentStock}
                  onChange={(e) => handleChange('currentStock', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.currentStock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.currentStock && <p className="text-red-500 text-xs mt-1">{errors.currentStock}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الحد الأدنى *
                </label>
                <input
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => handleChange('minStock', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.minStock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.minStock && <p className="text-red-500 text-xs mt-1">{errors.minStock}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الحد الأقصى *
                </label>
                <input
                  type="number"
                  value={formData.maxStock}
                  onChange={(e) => handleChange('maxStock', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.maxStock ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.maxStock && <p className="text-red-500 text-xs mt-1">{errors.maxStock}</p>}
              </div>
            </div>
          </div>

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
              <span>حفظ المنتج</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal