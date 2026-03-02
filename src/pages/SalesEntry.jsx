import { useState, useEffect } from 'react'
import { Search, Plus, Minus, Trash2, Check, X } from 'lucide-react'
import { useSales } from '../context/SalesContext'
import { products as productList, categories as categoryList } from '../data/products'

const SalesEntry = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    currentSale,
    addItemToSale,
    updateItemQuantity,
    removeItemFromSale,
    getCurrentTotal,
    completeSale,
    clearCurrentSale
  } = useSales()

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchQuery, selectedCategory, products])

  const fetchProducts = async () => {
    setProducts(productList)
    setFilteredProducts(productList)
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

  const handleAddItem = (product) => {
    addItemToSale(product, 1)
  }

  const handleCompleteSale = () => {
    completeSale()
    setShowConfirm(true)
    setTimeout(() => setShowConfirm(false), 2000)
  }

  const categories = categoryList

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      {showConfirm && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <Check className="w-5 h-5" />
          <span className="font-semibold">Sale Completed!</span>
        </div>
      )}

      {currentSale.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Current Sale</h2>
            <button
              onClick={clearCurrentSale}
              className="text-red-500 text-sm tap-highlight-transparent"
            >
              Clear All
            </button>
          </div>
          
          <div className="space-y-2 mb-4">
            {currentSale.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">₹{item.price} × {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 w-8 h-8 rounded-lg flex items-center justify-center tap-highlight-transparent active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center tap-highlight-transparent active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItemFromSale(item.id)}
                    className="text-red-500 ml-2 tap-highlight-transparent"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 flex items-center justify-between">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-primary">₹{getCurrentTotal().toFixed(2)}</span>
          </div>

          <button
            onClick={handleCompleteSale}
            className="w-full mt-4 bg-primary text-white py-3 rounded-lg font-semibold tap-highlight-transparent active:scale-95"
          >
            Complete Sale
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-bold mb-3">Add Items</h2>
        
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
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

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">₹{product.price.toFixed(2)} / {product.unit}</p>
              </div>
              <button
                onClick={() => handleAddItem(product)}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-1 tap-highlight-transparent active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SalesEntry
