import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Save, X, Search, Cloud, Settings, Check, AlertCircle } from 'lucide-react'
import GoogleSheetsService from '../services/googleSheets'

const Admin = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAddItemForm, setShowAddItemForm] = useState(false)
  const [selectedCategoryForAdd, setSelectedCategoryForAdd] = useState(null)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    unit: '1 kg',
    category: 'rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    hasPacketLoose: false,
    packetPrice: '',
    packetUnit: '25 kg',
    loosePrice: '',
    looseUnit: '1 kg'
  })
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    unit: '1 kg',
    packetPrice: '',
    packetUnit: '25 kg',
    loosePrice: '',
    looseUnit: '1 kg'
  })

  // Google Sheets state
  const [googleSheets, setGoogleSheets] = useState(new GoogleSheetsService())
  const [showGoogleSettings, setShowGoogleSettings] = useState(false)
  const [googleConfig, setGoogleConfig] = useState({
    scriptUrl: '',
    sheetUrl: ''
  })
  const [syncStatus, setSyncStatus] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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
    if (!newProduct.name) {
      alert('Please fill in product name')
      return
    }

    if (newProduct.hasPacketLoose) {
      if (!newProduct.packetPrice || !newProduct.loosePrice) {
        alert('Please fill in both packet and loose prices')
        return
      }
    } else {
      if (!newProduct.price) {
        alert('Please fill in product price')
        return
      }
    }

    let product;
    if (newProduct.hasPacketLoose) {
      product = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: newProduct.name,
        category: newProduct.category,
        hasPacketLoose: true,
        packetPrice: parseFloat(newProduct.packetPrice),
        packetUnit: newProduct.packetUnit,
        loosePrice: parseFloat(newProduct.loosePrice),
        looseUnit: newProduct.looseUnit,
        image: newProduct.image
      }
    } else {
      product = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        unit: newProduct.unit,
        category: newProduct.category,
        image: newProduct.image
      }
    }

    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    saveProducts(updatedProducts, categories)
    
    setNewProduct({
      name: '',
      price: '',
      unit: '1 kg',
      category: 'rice',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
      hasPacketLoose: false,
      packetPrice: '',
      packetUnit: '25 kg',
      loosePrice: '',
      looseUnit: '1 kg'
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

  // Google Sheets functions
  useEffect(() => {
    const status = googleSheets.getSyncStatus()
    setSyncStatus(status)
    setGoogleConfig({
      scriptUrl: status.scriptUrl || '',
      sheetUrl: status.sheetUrl || ''
    })
  }, [googleSheets])

  const handleTestConnection = async () => {
    setIsLoading(true)
    try {
      const result = await googleSheets.testConnection()
      if (result.success) {
        alert('✅ Connection successful!')
        const status = googleSheets.getSyncStatus()
        setSyncStatus(status)
      } else {
        alert(`❌ Connection failed: ${result.message}`)
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateSheet = async () => {
    setIsLoading(true)
    try {
      const result = await googleSheets.createSheet()
      if (result.success) {
        alert('✅ Sheet created successfully!')
      } else {
        alert(`❌ Sheet creation failed: ${result.message}`)
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveGoogleConfig = () => {
    if (!googleConfig.scriptUrl || !googleConfig.sheetUrl) {
      alert('Please enter both Script URL and Sheet URL')
      return
    }

    googleSheets.saveConfig(googleConfig.scriptUrl, googleConfig.sheetUrl)
    alert('✅ Configuration saved!')
    setShowGoogleSettings(false)
  }

  const handleClearGoogleConfig = () => {
    if (window.confirm('Clear Google Sheets configuration?')) {
      googleSheets.clearConfig()
      setGoogleConfig({ scriptUrl: '', sheetUrl: '' })
      setSyncStatus({ status: 'disconnected' })
      alert('✅ Configuration cleared!')
    }
  }

  const handleAddItemToCategory = (category) => {
    setSelectedCategoryForAdd(category)
    const packetUnit = category.id?.includes('oil') ? '20 packets' : '25 kg'
    const looseUnit = category.id?.includes('oil') ? '1 packet' : '1 kg'
    setNewItem({
      name: '',
      price: '',
      unit: '1 kg',
      packetPrice: '',
      packetUnit: packetUnit,
      loosePrice: '',
      looseUnit: looseUnit
    })
    setShowAddItemForm(true)
  }

  const handleSaveNewItem = () => {
    if (!newItem.name) {
      alert('Please fill in item name')
      return
    }

    const category = selectedCategoryForAdd
    let item

    if (category.id === 'rice' || category.id?.includes('oil')) {
      if (!newItem.packetPrice || !newItem.loosePrice) {
        alert('Please fill in both packet and loose prices')
        return
      }

      item = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: newItem.name,
        category: category.id,
        hasPacketLoose: true,
        packetPrice: parseFloat(newItem.packetPrice),
        packetUnit: newItem.packetUnit,
        loosePrice: parseFloat(newItem.loosePrice),
        looseUnit: newItem.looseUnit,
        image: category.id === 'rice' 
          ? 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
          : 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'
      }
    } else {
      if (!newItem.price) {
        alert('Please fill in item price')
        return
      }

      item = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        name: newItem.name,
        price: parseFloat(newItem.price),
        unit: newItem.unit,
        category: category.id,
        image: category.id === 'wheat'
          ? 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400'
          : 'https://images.unsplash.com/photo-1598301164398-30ba2ae72a5e?w=400'
      }
    }

    const updatedProducts = [...products, item]
    setProducts(updatedProducts)
    saveProducts(updatedProducts, categories)
    setShowAddItemForm(false)
    setSelectedCategoryForAdd(null)
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
        <div className="flex gap-2">
          <button
            onClick={() => setShowGoogleSettings(!showGoogleSettings)}
            className="bg-blue-500 text-white p-2 rounded-lg tap-highlight-transparent"
          >
            <Cloud className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary text-white p-2 rounded-lg tap-highlight-transparent"
          >
            {showAddForm ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Google Sheets Settings */}
      {showGoogleSettings && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center gap-2">
              <Cloud className="w-5 h-5" />
              Google Sheets Settings
            </h3>
            <button
              onClick={() => setShowGoogleSettings(false)}
              className="text-gray-500 p-1 tap-highlight-transparent"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sync Status */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">Status:</span>
              {syncStatus.status === 'connected' && (
                <span className="flex items-center gap-1 text-green-600">
                  <Check className="w-4 h-4" />
                  Connected
                </span>
              )}
              {syncStatus.status === 'synced' && (
                <span className="flex items-center gap-1 text-green-600">
                  <Check className="w-4 h-4" />
                  Synced
                </span>
              )}
              {syncStatus.status === 'disconnected' && (
                <span className="flex items-center gap-1 text-gray-600">
                  <AlertCircle className="w-4 h-4" />
                  Not Connected
                </span>
              )}
              {syncStatus.status === 'error' && (
                <span className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  Error
                </span>
              )}
            </div>
            {syncStatus.lastSyncTime && (
              <p className="text-sm text-gray-600">
                Last sync: {new Date(syncStatus.lastSyncTime).toLocaleString()}
              </p>
            )}
          </div>

          {/* Configuration */}
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Script URL</label>
              <input
                type="url"
                placeholder="https://script.google.com/macros/s/..."
                value={googleConfig.scriptUrl}
                onChange={(e) => setGoogleConfig({ ...googleConfig, scriptUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sheet URL</label>
              <input
                type="url"
                placeholder="https://docs.google.com/spreadsheets/d/..."
                value={googleConfig.sheetUrl}
                onChange={(e) => setGoogleConfig({ ...googleConfig, sheetUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={handleSaveGoogleConfig}
              className="bg-primary text-white py-2 rounded-lg text-sm font-semibold tap-highlight-transparent"
            >
              Save Config
            </button>
            <button
              onClick={handleTestConnection}
              disabled={isLoading}
              className="bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold tap-highlight-transparent disabled:opacity-50"
            >
              {isLoading ? 'Testing...' : 'Test Connection'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCreateSheet}
              disabled={isLoading}
              className="bg-green-500 text-white py-2 rounded-lg text-sm font-semibold tap-highlight-transparent disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Sheet'}
            </button>
            <button
              onClick={handleClearGoogleConfig}
              className="bg-red-500 text-white py-2 rounded-lg text-sm font-semibold tap-highlight-transparent"
            >
              Clear Config
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs">
            <p className="font-semibold mb-1">Setup Instructions:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>See GOOGLE-SCRIPT.md for setup steps</li>
              <li>Copy Google Apps Script URL</li>
              <li>Create Google Sheet and copy URL</li>
              <li>Test connection and create sheet</li>
            </ol>
          </div>
        </div>
      )}

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
            
            {(newProduct.category === 'rice' || newProduct.category?.includes('oil')) && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasPacketLoose"
                  checked={newProduct.hasPacketLoose}
                  onChange={(e) => setNewProduct({ ...newProduct, hasPacketLoose: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="hasPacketLoose" className="text-sm font-medium">
                  Sell as both Packet and Loose
                </label>
              </div>
            )}

            {newProduct.hasPacketLoose ? (
              <>
                <div className="border rounded-lg p-3">
                  <p className="text-sm font-semibold mb-2">Packet Pricing</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Packet Price (₹)"
                      value={newProduct.packetPrice}
                      onChange={(e) => setNewProduct({ ...newProduct, packetPrice: e.target.value })}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={newProduct.category?.includes('oil') ? "Packet Unit (e.g., 20 packets)" : "Packet Unit (e.g., 25 kg)"}
                      value={newProduct.packetUnit}
                      onChange={(e) => setNewProduct({ ...newProduct, packetUnit: e.target.value })}
                      className="px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <p className="text-sm font-semibold mb-2">Loose Pricing</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Loose Price (₹)"
                      value={newProduct.loosePrice}
                      onChange={(e) => setNewProduct({ ...newProduct, loosePrice: e.target.value })}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={newProduct.category?.includes('oil') ? "Loose Unit (e.g., 1 packet)" : "Loose Unit (e.g., 1 kg)"}
                      value={newProduct.looseUnit}
                      onChange={(e) => setNewProduct({ ...newProduct, looseUnit: e.target.value })}
                      className="px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Unit (e.g., 1 kg)"
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
            )}
            
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

      {showAddItemForm && selectedCategoryForAdd && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 className="font-bold mb-3">Add New Item to {selectedCategoryForAdd.name}</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
            
            {(selectedCategoryForAdd.id === 'rice' || selectedCategoryForAdd.id?.includes('oil')) ? (
              <>
                <div className="border rounded-lg p-3">
                  <p className="text-sm font-semibold mb-2">Packet Pricing</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Packet Price (₹)"
                      value={newItem.packetPrice}
                      onChange={(e) => setNewItem({ ...newItem, packetPrice: e.target.value })}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={newItem.packetUnit}
                      value={newItem.packetUnit}
                      onChange={(e) => setNewItem({ ...newItem, packetUnit: e.target.value })}
                      className="px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="border rounded-lg p-3">
                  <p className="text-sm font-semibold mb-2">Loose Pricing</p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Loose Price (₹)"
                      value={newItem.loosePrice}
                      onChange={(e) => setNewItem({ ...newItem, loosePrice: e.target.value })}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={newItem.looseUnit}
                      value={newItem.looseUnit}
                      onChange={(e) => setNewItem({ ...newItem, looseUnit: e.target.value })}
                      className="px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Unit (e.g., 1 kg)"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
            )}
            
            <div className="flex gap-2">
              <button
                onClick={handleSaveNewItem}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold tap-highlight-transparent"
              >
                Add Item
              </button>
              <button
                onClick={() => setShowAddItemForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold tap-highlight-transparent"
              >
                Cancel
              </button>
            </div>
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

      <div className="space-y-6">
        {categories.filter(c => c.id !== 'all').map(category => {
          const categoryProducts = filteredProducts.filter(p => p.category === category.id)
          if (categoryProducts.length === 0) return null
          
          return (
            <div key={category.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{category.name}</h3>
                <button
                  onClick={() => handleAddItemToCategory(category)}
                  className="bg-green-500 text-white px-3 py-1 rounded tap-highlight-transparent text-sm font-semibold"
                >
                  Add New Item
                </button>
              </div>
              
              <div className="space-y-3">
                {categoryProducts.map(product => (
                  <div key={product.id} className="border rounded-lg p-3">
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
                              value={editingProduct.price || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                              className="flex-1 px-3 py-2 border rounded-lg"
                              placeholder="Price"
                            />
                            <input
                              type="text"
                              value={editingProduct.unit || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                              className="flex-1 px-3 py-2 border rounded-lg"
                              placeholder="Unit"
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
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-semibold">{product.name}</p>
                            {product.hasPacketLoose ? (
                              <div className="text-sm text-gray-600">
                                <p>Packet: ₹{product.packetPrice} / {product.packetUnit}</p>
                                <p>Loose: ₹{product.loosePrice} / {product.looseUnit}</p>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-600">₹{product.price?.toFixed(2) || 0} / {product.unit || ''}</p>
                            )}
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
            </div>
          )
        })}
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
