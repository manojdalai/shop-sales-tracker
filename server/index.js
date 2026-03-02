const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const products = [
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
  { id: 13, name: 'Fresh Strawberries', price: 5.99, unit: '1 lb', category: 'fruits', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400' },
  { id: 14, name: 'Broccoli', price: 2.99, unit: '1 lb', category: 'vegetables', image: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=400' },
  { id: 15, name: 'Greek Yogurt', price: 4.49, unit: '32 oz', category: 'dairy', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
  { id: 16, name: 'Bagels', price: 3.99, unit: '6 pack', category: 'bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
  { id: 17, name: 'Coffee Beans', price: 12.99, unit: '12 oz', category: 'beverages', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400' },
  { id: 18, name: 'Salmon Fillet', price: 14.99, unit: '1 lb', category: 'meat', image: 'https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?w=400' },
]

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id))
  if (product) {
    res.json(product)
  } else {
    res.status(404).json({ error: 'Product not found' })
  }
})

app.get('/api/products/category/:category', (req, res) => {
  const categoryProducts = products.filter(p => p.category === req.params.category)
  res.json(categoryProducts)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
