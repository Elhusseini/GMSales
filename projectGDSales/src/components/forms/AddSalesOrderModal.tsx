import React, { useState } from 'react'
import { X, Save, ShoppingCart, Plus, Trash2 } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import toast from 'react-hot-toast'

interface AddSalesOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (orderData: any) => void
  customers: any[]
  products: any[]
}

const AddSalesOrderModal: React.FC<AddSalesOrderModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  customers, 
  products 
}) => {
  const { t, direction } = useLanguage()
  const [formData, setFormData] = useState({
    customer_id: '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    notes: '',
    discount: '0',
    tax: '15',
    status: 'pending'
  })

  const [orderItems, setOrderItems] = useState([
    { product: '', quantity: 1, price: 0, total: 0 }
  ])

  const [errors, setErrors] = useState<any>({})

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.customer_id) {
      newErrors.customer_id = 'العميل مطلوب'
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'تاريخ التسليم مطلوب'
    }

    if (orderItems.length === 0 || !orderItems.some(item => item.product)) {
      newErrors.items = 'يجب إضافة منتج واحد على الأقل'
    }

    orderItems.forEach((item, index) => {
      if (item.product && item.quantity <= 0) {
        newErrors[`quantity_${index}`] = 'الكمية يجب أن تكون أكبر من صفر'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      const validItems = orderItems.filter(item => item.product)
      const subtotal = validItems.reduce((sum, item) => sum + item.total, 0)
      const discountAmount = (subtotal * parseFloat(formData.discount)) / 100
      const taxAmount = ((subtotal - discountAmount) * parseFloat(formData.tax)) / 100
      const total = subtotal - discountAmount + taxAmount

      const orderData = {
        customer_id: formData.customer_id,
        date: formData.orderDate,
        deliveryDate: formData.deliveryDate,
        items: validItems.length,
        total: total,
        subtotal: subtotal,
        discount: discountAmount,
        tax: taxAmount,
        status: formData.status,
        notes: formData.notes,
        orderItems: validItems,
        createdAt: new Date().toISOString()
      }

      onSave(orderData)
      onClose()
      
      // Reset form
      setFormData({
        customer_id: '',
        orderDate: new Date().toISOString().split('T')[0],
        deliveryDate: '',
        notes: '',
        discount: '0',
        tax: '15',
        status: 'pending'
      })
      setOrderItems([{ product: '', quantity: 1, price: 0, total: 0 }])
      setErrors({})
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...orderItems]
    newItems[index] = { ...newItems[index], [field]: value }

    if (field === 'product') {
      const selectedProduct = products.find(p => p.id === value)
      if (selectedProduct) {
        newItems[index].price = selectedProduct.price
        newItems[index].total = newItems[index].quantity * selectedProduct.price
      }
    }

    if (field === 'quantity' || field === 'price') {
      newItems[index].total = newItems[index].quantity * newItems[index].price
    }

    setOrderItems(newItems)
  }

  const addItem = () => {
    setOrderItems([...orderItems, { product: '', quantity: 1, price: 0, total: 0 }])
  }

  const removeItem = (index: number) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter((_, i) => i !== index))
    }
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0)
  const discountAmount = (subtotal * parseFloat(formData.discount || '0')) / 100
  const taxAmount = ((subtotal - discountAmount) * parseFloat(formData.tax || '0')) / 100
  const total = subtotal - discountAmount + taxAmount

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <ShoppingCart className={`h-6 w-6 text-primary-600 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
            إنشاء أمر بيع جديد
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Header */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">معلومات الطلب</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  العميل *
                </label>
                <select
                  value={formData.customer_id}
                  onChange={(e) => handleChange('customer_id', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.customer_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">اختر العميل</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
                {errors.customer_id && <p className="text-red-500 text-xs mt-1">{errors.customer_id}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ الطلب
                </label>
                <input
                  type="date"
                  value={formData.orderDate}
                  onChange={(e) => handleChange('orderDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ التسليم *
                </label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleChange('deliveryDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.deliveryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.deliveryDate && <p className="text-red-500 text-xs mt-1">{errors.deliveryDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  حالة الطلب
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="pending">في الانتظار</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="shipped">تم الشحن</option>
                  <option value="delivered">تم التسليم</option>
                </select>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-b pb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">أصناف الطلب</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>إضافة صنف</span>
              </button>
            </div>

            {errors.items && <p className="text-red-500 text-sm mb-4">{errors.items}</p>}

            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      المنتج
                    </label>
                    <select
                      value={item.product}
                      onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">اختر المنتج</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {product.price} ر.س
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الكمية
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors[`quantity_${index}`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`quantity_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`quantity_${index}`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      السعر (ر.س)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الإجمالي (ر.س)
                    </label>
                    <input
                      type="text"
                      value={item.total.toFixed(2)}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={orderItems.length === 1}
                      className="w-full px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="h-4 w-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص الطلب</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ملاحظات
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="أدخل أي ملاحظات إضافية"
                  dir={direction}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">المجموع الفرعي:</span>
                  <span className="text-sm font-medium">{subtotal.toFixed(2)} ر.س</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الخصم (%):</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.discount}
                      onChange={(e) => handleChange('discount', e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-sm font-medium">-{discountAmount.toFixed(2)} ر.س</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">الضريبة (%):</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.tax}
                      onChange={(e) => handleChange('tax', e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-sm font-medium">+{taxAmount.toFixed(2)} ر.س</span>
                  </div>
                </div>

                <div className="flex justify-between border-t pt-3">
                  <span className="text-lg font-semibold text-gray-900">الإجمالي:</span>
                  <span className="text-lg font-bold text-primary-600">{total.toFixed(2)} ر.س</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3">
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
              <span>حفظ الطلب</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSalesOrderModal