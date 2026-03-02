import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchQuery, selectedCategory, products])

  const fetchProducts = async () => {
    setProducts(mockProducts)
    setFilteredProducts(mockProducts)
    setLoading(false)
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

  const categories = ['all', ...new Set(products.map(p => p.category))]

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap capitalize transition-colors tap-highlight-transparent ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const mockProducts = [
  { id: 1, name: 'Fresh Bananas', price: 2.99, unit: '1 lb', category: 'fruits', image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400' },
  { id: 2, name: 'Organic Apples', price: 4.99, unit: '2 lbs', category: 'fruits', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400' },
  { id: 3, name: 'Fresh Tomatoes', price: 3.49, unit: '1 lb', category: 'vegetables', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400' },
  { id: 4, name: 'Carrots', price: 2.49, unit: '1 lb', category: 'vegetables', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400' },
  { id: 5, name: 'Whole Milk', price: 3.99, unit: '1 gallon', category: 'dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' },
  { id: 6, name: 'Cheddar Cheese', price: 5.99, unit: '8 oz', category: 'dairy', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },
  { id: 7, name: 'Whole Wheat Bread', price: 3.49, unit: '1 loaf', category: 'bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
  { id: 8, name: 'Croissants', price: 4.99, unit: '6 pack', category: 'bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
  { id: 9, name: 'Orange Juice', price: 4.49, unit: '64 oz', category: 'beverages', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400' },
  { id: 10, name: 'Green Tea', price: 6.99, unit: '20 bags', category: 'beverages', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
  { id: 11, name: 'Chicken Breast', price: 8.99, unit: '1 lb', category: 'meat', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400' },
  { id: 12, name: 'Ground Beef', price: 7.99, unit: '1 lb', category: 'meat', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400' },
]

export default Home
