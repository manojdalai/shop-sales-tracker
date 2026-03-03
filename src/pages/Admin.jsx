import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Save, X, Search } from 'lucide-react'

const Admin = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    unit: '1 kg',
    category: 'rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
  })

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchQuery, selectedCategory, products])

  const loadProducts = () => {
    const stored = localStorage.getItem('adminProducts')
    if (stored) {
      const data = JSON.parse(stored)
      setProducts(data.products)
      setCategories(data.categories)
    } else {
      // Load default products from data file
      import('../data/products').then(module => {
        setProducts(module.products)
        setCategories(module.categories)
        saveProducts(module.products, module.categories)
      })
    }
  }

  const saveProducts = (prods, cats) => {
    localStorage.setItem('adminProducts', JSON.stringify({
      products: prods,
      categories: cats
    }))
    // Also update the products used by sales
    localStorage.setItem('products', JSON.stringify(prods))
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill in product name and price')
      return
    }

    const product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      unit: newProduct.unit,
      category: newProduct.category,
      image: newProduct.image
    }

    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    saveProducts(updatedProducts, categories)
    
    setNewProduct({
      name: '',
      price: '',
      unit: '1 kg',
      category: 'rice',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
    })
    setShowAddForm(false)
  }

  const handleDeleteProduct = (id) => {
    if (window.confirm('Delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id)
      setProducts(updatedProducts)
      saveProducts(updatedProducts, categories)
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product })
  }

  const handleSaveEdit = () => {
    const updatedProducts = products.map(p =>
      p.id === editingProduct.id ? editingProduct : p
    )
    setProducts(updatedProducts)
    saveProducts(updatedProducts, categories)
    setEditingProduct(null)
  }

  const handlePriceChange = (productId, change) => {
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        const newPrice = Math.max(1, p.price + change)
        return { ...p, price: newPrice }
      }
      return p
    })
    setProducts(updatedProducts)
    saveProducts(updatedProducts, categories)
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl mb-20">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin - Product Management</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary text-white p-2 rounded-lg tap-highlight-transparent"
        >
          {showAddForm ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 className="font-bold mb-3">Add New Product</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Unit (e.g., 1 kg, 1 liter)"
              value={newProduct.unit}
              onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <select
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              {categories.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button
              onClick={handleAddProduct}
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold tap-highlight-transparent"
            >
              Add Product
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors tap-highlight-transparent ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            {editingProduct?.id === product.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg font-semibold"
                />
                {editingProduct.hasPacketLoose ? (
                  <>
                    <div className="border rounded-lg p-3">
                      <p className="text-sm font-semibold mb-2">Packet Pricing</p>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Packet Price"
                          value={editingProduct.packetPrice}
                          onChange={(e) => setEditingProduct({ ...editingProduct, packetPrice: parseFloat(e.target.value) })}
                          className="flex-1 px-3 py-2 border rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Unit"
                          value={editingProduct.packetUnit}
                          onChange={(e) => setEditingProduct({ ...editingProduct, packetUnit: e.target.value })}
                          className="flex-1 px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-sm font-semibold mb-2">Loose Pricing</p>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Loose Price"
                          value={editingProduct.loosePrice}
                          onChange={(e) => setEditingProduct({ ...editingProduct, loosePrice: parseFloat(e.target.value) })}
                          className="flex-1 px-3 py-2 border rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Unit"
                          value={editingProduct.looseUnit}
                          onChange={(e) => setEditingProduct({ ...editingProduct, looseUnit: e.target.value })}
                          className="flex-1 px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      value={editingProduct.unit}
                      onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="flex-1 bg-primary text-white py-2 rounded-lg tap-highlight-transparent flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg tap-highlight-transparent flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold">{product.name}</p>
                    {product.hasPacketLoose ? (
                      <div className="text-sm text-gray-600">
                        <p>Packet: ₹{product.packetPrice} / {product.packetUnit}</p>
                        <p>Loose: ₹{product.loosePrice} / {product.looseUnit}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">₹{product.price.toFixed(2)} / {product.unit}</p>
                    )}
                    <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-500 p-2 tap-highlight-transparent"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 p-2 tap-highlight-transparent"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {!product.hasPacketLoose && (
                  <div className="flex items-center gap-2 pt-3 border-t">
                    <span className="text-sm text-gray-600">Quick Price:</span>
                    <button
                      onClick={() => handlePriceChange(product.id, -5)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded tap-highlight-transparent text-sm font-semibold"
                    >
                      -₹5
                    </button>
                    <button
                      onClick={() => handlePriceChange(product.id, -1)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded tap-highlight-transparent text-sm font-semibold"
                    >
                      -₹1
                    </button>
                    <button
                      onClick={() => handlePriceChange(product.id, 1)}
                      className="bg-green-100 text-green-600 px-3 py-1 rounded tap-highlight-transparent text-sm font-semibold"
                    >
                      +₹1
                    </button>
                    <button
                      onClick={() => handlePriceChange(product.id, 5)}
                      className="bg-green-100 text-green-600 px-3 py-1 rounded tap-highlight-transparent text-sm font-semibold"
                    >
                      +₹5
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No products found</p>
        </div>
      )}
    </div>
  )
}

export default Admin
