import { Plus, Minus, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart()
  const cartItem = cart.find(item => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  const handleAdd = () => {
    addToCart(product)
  }

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1)
  }

  const handleDecrease = () => {
    updateQuantity(product.id, quantity - 1)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-square bg-gray-100 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.unit}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-secondary transition-colors tap-highlight-transparent active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecrease}
                className="bg-gray-200 text-gray-700 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors tap-highlight-transparent active:scale-95"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors tap-highlight-transparent active:scale-95"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
