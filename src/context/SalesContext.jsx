import { createContext, useContext, useState, useEffect } from 'react'

const SalesContext = createContext()

export const useSales = () => {
  const context = useContext(SalesContext)
  if (!context) {
    throw new Error('useSales must be used within a SalesProvider')
  }
  return context
}

export const SalesProvider = ({ children }) => {
  const [currentSale, setCurrentSale] = useState([])
  const [salesHistory, setSalesHistory] = useState(() => {
    const saved = localStorage.getItem('salesHistory')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('salesHistory', JSON.stringify(salesHistory))
  }, [salesHistory])

  const addItemToSale = (product, quantity) => {
    setCurrentSale(prevSale => {
      const existingItem = prevSale.find(item => item.id === product.id)
      if (existingItem) {
        return prevSale.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevSale, { ...product, quantity }]
    })
  }

  const updateItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItemFromSale(productId)
      return
    }
    setCurrentSale(prevSale =>
      prevSale.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeItemFromSale = (productId) => {
    setCurrentSale(prevSale => prevSale.filter(item => item.id !== productId))
  }

  const getCurrentTotal = () => {
    return currentSale.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const completeSale = () => {
    if (currentSale.length === 0) return

    const sale = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: currentSale,
      total: getCurrentTotal()
    }

    setSalesHistory(prev => [sale, ...prev])
    setCurrentSale([])
    return sale
  }

  const clearCurrentSale = () => {
    setCurrentSale([])
  }

  const deleteSale = (saleId) => {
    setSalesHistory(prev => prev.filter(sale => sale.id !== saleId))
  }

  const getTodaysSales = () => {
    const today = new Date().toDateString()
    return salesHistory.filter(sale => 
      new Date(sale.date).toDateString() === today
    )
  }

  const getTodaysTotal = () => {
    return getTodaysSales().reduce((total, sale) => total + sale.total, 0)
  }

  const exportToCSV = () => {
    if (salesHistory.length === 0) return null

    const headers = ['Date', 'Time', 'Items', 'Total']
    const rows = salesHistory.map(sale => {
      const date = new Date(sale.date)
      const dateStr = date.toLocaleDateString()
      const timeStr = date.toLocaleTimeString()
      const itemsStr = sale.items.map(item => 
        `${item.name} x${item.quantity}`
      ).join('; ')
      return [dateStr, timeStr, itemsStr, sale.total.toFixed(2)]
    })

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    return csvContent
  }

  return (
    <SalesContext.Provider
      value={{
        currentSale,
        salesHistory,
        addItemToSale,
        updateItemQuantity,
        removeItemFromSale,
        getCurrentTotal,
        completeSale,
        clearCurrentSale,
        deleteSale,
        getTodaysSales,
        getTodaysTotal,
        exportToCSV
      }}
    >
      {children}
    </SalesContext.Provider>
  )
}
