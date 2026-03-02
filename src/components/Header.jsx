import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, History, BarChart3, Store } from 'lucide-react'
import { useSales } from '../context/SalesContext'

const Header = () => {
  const { currentSale, getTodaysTotal } = useSales()
  const location = useLocation()
  const itemCount = currentSale.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <header className="bg-primary text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Store className="w-7 h-7" />
              <div>
                <h1 className="text-xl font-bold">My Shop</h1>
                <p className="text-xs text-green-100">Today: ₹{getTodaysTotal().toFixed(2)}</p>
              </div>
            </Link>
            {itemCount > 0 && (
              <div className="bg-white text-primary px-3 py-1 rounded-full text-sm font-bold">
                {itemCount} items
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center flex-1 h-full tap-highlight-transparent ${
              location.pathname === '/' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs mt-1">New Sale</span>
          </Link>
          <Link
            to="/history"
            className={`flex flex-col items-center justify-center flex-1 h-full tap-highlight-transparent ${
              location.pathname === '/history' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <History className="w-6 h-6" />
            <span className="text-xs mt-1">History</span>
          </Link>
          <Link
            to="/reports"
            className={`flex flex-col items-center justify-center flex-1 h-full tap-highlight-transparent ${
              location.pathname === '/reports' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs mt-1">Reports</span>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Header
