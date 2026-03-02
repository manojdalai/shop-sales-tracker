# Shop Sales Tracker

A mobile-first sales tracking app for grocery shop owners to record daily sales and export data to Google Sheets.

## Features

- � **Mobile-First Design**: Optimized for use on your phone while managing your shop
- � **Quick Sales Entry**: Fast product search and quantity selection
- 📊 **Sales History**: View all past transactions organized by date
- � **Reports & Analytics**: Track daily, weekly, and monthly revenue
- � **Google Sheets Export**: Export sales data as CSV for Google Sheets
- � **Offline Storage**: All data saved locally on your device
- 🏆 **Top Products**: See which items sell the most

## Tech Stack

- **Frontend**: React 18, React Router, TailwindCSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Backend**: Express.js
- **Styling**: TailwindCSS with responsive design

## Installation

1. Clone or navigate to the project directory:
```bash
cd grocery-shop-app
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

1. Start the backend server (in one terminal):
```bash
npm run server
```

2. Start the frontend development server (in another terminal):
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

### Production Build

1. Build the application:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## 📱 Using Without a Computer (Mobile-Only Setup)

**You don't need a computer in your shop!** Deploy the app once, then access it from your phone anywhere.

### Quick Deploy (One-Time Setup):

1. **On your computer, build the app:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify (FREE):**
   - Go to https://app.netlify.com/drop
   - Drag the `dist` folder
   - Get your URL (e.g., `https://my-shop-tracker.netlify.app`)

3. **On your phone:**
   - Open the URL in your browser
   - **iPhone**: Tap Share → "Add to Home Screen"
   - **Android**: Tap Menu → "Add to Home screen"
   - Now you have an app icon!

4. **Use it daily:**
   - Works offline
   - All data saved on your phone
   - No computer needed
   - Export to Google Sheets anytime

📖 **See [MOBILE-SETUP.md](MOBILE-SETUP.md) for detailed instructions**

## Mobile Testing (Development)

To test during development:

1. Make sure your mobile device is on the same network as your development machine
2. Find your computer's local IP address
3. Access the app using: `http://YOUR_IP:3000`

## Project Structure

```
grocery-shop-app/
├── src/
│   ├── components/
│   │   └── Header.jsx          # Navigation with today's total
│   ├── context/
│   │   └── SalesContext.jsx    # Sales tracking state management
│   ├── pages/
│   │   ├── SalesEntry.jsx      # Record new sales
│   │   ├── SalesHistory.jsx    # View past transactions
│   │   └── Reports.jsx         # Analytics and export
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles
├── server/
│   └── index.js                # Express API server for products
├── index.html
├── package.json
└── README.md
```

## How to Use

### Recording a Sale
1. Open the app on your mobile device
2. Search or browse for products
3. Tap "Add" to add items to current sale
4. Adjust quantities with +/- buttons
5. Tap "Complete Sale" when done
6. Sale is automatically saved to history

### Viewing Sales History
1. Tap "History" in bottom navigation
2. View sales organized by date
3. Tap any sale to see item details
4. Swipe to delete if needed

### Exporting to Google Sheets
1. Tap "Reports" in bottom navigation
2. Tap "Export to Google Sheets"
3. Download the CSV file
4. Open Google Sheets
5. Go to File → Import → Upload file
6. Select the downloaded CSV
7. Click "Import data"

### Mobile Optimization
- Touch-friendly buttons with tap highlights
- Bottom navigation bar for easy access
- Quick product search
- Persistent data storage
- Works offline

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

## Customization

### Adding Products

Edit `server/index.js` and add products to the `products` array:

```javascript
{
  id: 19,
  name: 'Product Name',
  price: 9.99,
  unit: '1 unit',
  category: 'category',
  image: 'image-url'
}
```

### Styling

The app uses TailwindCSS. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#10b981',    // Main brand color
      secondary: '#059669',  // Secondary brand color
    }
  }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Data Management

All sales data is stored locally in your browser's localStorage. This means:
- ✅ Works offline
- ✅ No server costs
- ✅ Your data stays private
- ⚠️ Clear browser data = lose sales history
- 💡 Export regularly to Google Sheets as backup!

## Future Enhancements

- Cloud sync across devices
- Inventory management
- Low stock alerts
- Customer management
- Receipt printing
- Multiple shop locations
- Profit margin tracking
- Progressive Web App (PWA) for installation

## License

MIT License - feel free to use this project for personal or commercial purposes.
