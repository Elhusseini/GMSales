import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, Package, Star, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import AddProductModal from '../components/modals/AddProductModal'

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

const ProductsManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'قميص قطني رجالي',
      category: 'قمصان رجالية',
      price: 120,
      cost: 80,
      stock: 156,
      sku: 'SH-001',
      status: 'active',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'قميص قطني عالي الجودة للرجال'
    },
    {
      id: '2',
      name: 'فستان صيفي نسائي',
      category: 'فساتين نسائية',
      price: 200,
      cost: 130,
      stock: 89,
      sku: 'DR-002',
      status: 'active',
      image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'فستان صيفي أنيق ومريح'
    },
    {
      id: '3',
      name: 'بنطلون جينز',
      category: 'بناطيل',
      price: 180,
      cost: 120,
      stock: 34,
      sku: 'JP-003',
      status: 'active',
      image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'بنطلون جينز كلاسيكي'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showAddProductModal, setShowAddProductModal] = useState(false)

  const handleAddProduct = () => {
    setShowAddProductModal(true)
  }

  const handleSaveNewProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    }
    setProducts(prevProducts => [...prevProducts, newProduct])
  }

  const handleEditProduct = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      toast.success(`سيتم فتح نافذة تعديل المنتج: ${product.name}`)
    }
  }

  const handleDeleteProduct = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      if (window.confirm(`هل أنت متأكد من حذف المنتج "${product.name}"؟`)) {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId))
        toast.success('تم حذف المنتج بنجاح')
      }
    }
  }

  const handleViewProduct = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      toast.success(`عرض تفاصيل المنتج: ${product.name}`)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(products.map(p => p.category))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المنتجات</h1>
          <p className="text-gray-600 mt-1">إدارة منتجات المصنع وتصنيفاتها</p>
        </div>
        
        <button
          onClick={handleAddProduct}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة منتج جديد</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي المنتجات</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المنتجات النشطة</p>
              <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.status === 'active').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">الفئات</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 card-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي المخزون</p>
              <p className="text-2xl font-bold text-gray-900">{products.reduce((sum, p) => sum + p.stock, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg p-6 card-shadow">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث عن المنتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              dir="rtl"
            />
          </div>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">جميع الفئات</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option>جميع الحالات</option>
            <option>نشط</option>
            <option>غير نشط</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg card-shadow overflow-hidden hover-scale">
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <p className="text-xs text-gray-400 mb-3">SKU: {product.sku}</p>
                </div>
                
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-lg font-bold text-primary-600">{product.price} ر.س</p>
                  <p className="text-sm text-gray-500">التكلفة: {product.cost} ر.س</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">المخزون</p>
                  <p className={`text-sm font-bold ${
                    product.stock > 50 ? 'text-green-600' : 
                    product.stock > 20 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {product.stock} قطعة
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="text-primary-600 hover:text-primary-900 p-1 rounded transition-colors"
                    title="تعديل"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleViewProduct(product.id)}
                    className="text-gray-600 hover:text-gray-900 p-1 rounded transition-colors"
                    title="عرض التفاصيل"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-xs text-gray-500">الربح</p>
                  <p className="text-sm font-bold text-green-600">
                    {product.price - product.cost} ر.س
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onSave={handleSaveNewProduct}
      />
    </div>
  )
}

export default ProductsManagement