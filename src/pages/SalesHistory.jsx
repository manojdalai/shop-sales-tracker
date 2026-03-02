import { useState } from 'react'
import { Trash2, Calendar, DollarSign, Package } from 'lucide-react'
import { useSales } from '../context/SalesContext'

const SalesHistory = () => {
  const { salesHistory, deleteSale } = useSales()
  const [expandedSale, setExpandedSale] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }

  const toggleExpand = (saleId) => {
    setExpandedSale(expandedSale === saleId ? null : saleId)
  }

  const handleDelete = (saleId, e) => {
    e.stopPropagation()
    if (window.confirm('Delete this sale?')) {
      deleteSale(saleId)
    }
  }

  if (salesHistory.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center">
          <Package className="w-20 h-20 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">No Sales Yet</h2>
          <p className="text-gray-600">Start recording sales to see them here</p>
        </div>
      </div>
    )
  }

  const groupedSales = salesHistory.reduce((groups, sale) => {
    const date = new Date(sale.date).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(sale)
    return groups
  }, {})

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Sales History</h1>

      {Object.entries(groupedSales).map(([date, sales]) => {
        const dayTotal = sales.reduce((sum, sale) => sum + sale.total, 0)
        
        return (
          <div key={date} className="mb-6">
            <div className="bg-gray-100 px-4 py-2 rounded-lg mb-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="font-semibold">{formatDate(sales[0].date)}</span>
              </div>
              <div className="flex items-center space-x-1 text-primary font-bold">
                <DollarSign className="w-4 h-4" />
                <span>{dayTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              {sales.map(sale => (
                <div key={sale.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div
                    onClick={() => toggleExpand(sale.id)}
                    className="p-4 cursor-pointer tap-highlight-transparent"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm text-gray-600">{formatTime(sale.date)}</span>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                            {sale.items.length} items
                          </span>
                        </div>
                        <p className="text-lg font-bold text-primary">₹{sale.total.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={(e) => handleDelete(sale.id, e)}
                        className="text-red-500 p-2 tap-highlight-transparent"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {expandedSale === sale.id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <h4 className="font-semibold mb-2 text-sm">Items:</h4>
                      <div className="space-y-1">
                        {sale.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-700">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="font-semibold">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SalesHistory
