import { useState, useEffect } from 'react'
import { Download, TrendingUp, Calendar, Package, DollarSign } from 'lucide-react'
import { useSales } from '../context/SalesContext'

const Reports = () => {
  const { salesHistory, exportToCSV, getTodaysTotal } = useSales()
  const [stats, setStats] = useState({
    today: 0,
    week: 0,
    month: 0,
    totalSales: 0,
    totalRevenue: 0,
    avgSale: 0
  })

  useEffect(() => {
    calculateStats()
  }, [salesHistory])

  const calculateStats = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const todaySales = salesHistory.filter(sale => 
      new Date(sale.date) >= today
    )
    const weekSales = salesHistory.filter(sale => 
      new Date(sale.date) >= weekAgo
    )
    const monthSales = salesHistory.filter(sale => 
      new Date(sale.date) >= monthAgo
    )

    const totalRevenue = salesHistory.reduce((sum, sale) => sum + sale.total, 0)
    const avgSale = salesHistory.length > 0 ? totalRevenue / salesHistory.length : 0

    setStats({
      today: todaySales.reduce((sum, sale) => sum + sale.total, 0),
      week: weekSales.reduce((sum, sale) => sum + sale.total, 0),
      month: monthSales.reduce((sum, sale) => sum + sale.total, 0),
      totalSales: salesHistory.length,
      totalRevenue,
      avgSale
    })
  }

  const handleExportCSV = () => {
    const csv = exportToCSV()
    if (!csv) {
      alert('No sales data to export')
      return
    }

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales-report-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleExportGoogleSheets = () => {
    const csv = exportToCSV()
    if (!csv) {
      alert('No sales data to export')
      return
    }

    const instructions = `
To import this data to Google Sheets:

1. Download the CSV file first (click "Download CSV" button)
2. Open Google Sheets (sheets.google.com)
3. Create a new spreadsheet or open existing one
4. Go to File → Import
5. Upload the CSV file
6. Choose "Replace current sheet" or "Insert new sheet"
7. Click "Import data"

Or copy the data below and paste directly into Google Sheets:
    `.trim()

    alert(instructions)
    handleExportCSV()
  }

  const topProducts = () => {
    const productSales = {}
    
    salesHistory.forEach(sale => {
      sale.items.forEach(item => {
        if (!productSales[item.name]) {
          productSales[item.name] = {
            name: item.name,
            quantity: 0,
            revenue: 0
          }
        }
        productSales[item.name].quantity += item.quantity
        productSales[item.name].revenue += item.price * item.quantity
      })
    })

    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-600">Today</span>
          </div>
          <p className="text-2xl font-bold text-primary">₹{stats.today.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">This Week</span>
          </div>
          <p className="text-2xl font-bold text-blue-500">₹{stats.week.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">This Month</span>
          </div>
          <p className="text-2xl font-bold text-green-500">₹{stats.month.toFixed(2)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">Total Sales</span>
          </div>
          <p className="text-2xl font-bold text-purple-500">{stats.totalSales}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="font-bold mb-2">Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Total Revenue:</span>
            <span className="font-bold">₹{stats.totalRevenue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Average Sale:</span>
            <span className="font-bold">₹{stats.avgSale.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Transactions:</span>
            <span className="font-bold">{stats.totalSales}</span>
          </div>
        </div>
      </div>

      {topProducts().length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 className="font-bold mb-3">Top Products</h3>
          <div className="space-y-2">
            {topProducts().map((product, idx) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-gray-600">{product.quantity} sold</p>
                  </div>
                </div>
                <span className="font-bold text-primary">₹{product.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={handleExportCSV}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 tap-highlight-transparent active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>Download CSV</span>
        </button>

        <button
          onClick={handleExportGoogleSheets}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 tap-highlight-transparent active:scale-95"
        >
          <Download className="w-5 h-5" />
          <span>Export to Google Sheets</span>
        </button>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
        <p className="font-semibold mb-1">💡 Tip:</p>
        <p>Export your sales data and import it into Google Sheets to track your business performance over time!</p>
      </div>
    </div>
  )
}

export default Reports
