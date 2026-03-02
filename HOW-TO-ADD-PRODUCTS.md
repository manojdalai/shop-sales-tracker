# 📝 How to Add Products and Varieties

This guide shows you how to add new products or varieties to your shop app.

## Where to Edit

All products are stored in one file:
**`/Users/mdalai/Desktop/grocery-shop-app/src/data/products.js`**

## Adding a New Variety to Existing Product

For example, to add a new rice variety:

1. Open `src/data/products.js`
2. Find the Rice section (look for `// Rice Varieties`)
3. Add a new line following this format:

```javascript
{ id: 28, name: 'Your New Rice Name', price: 100, unit: '1 kg', category: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
```

**Important:**
- `id` must be unique (use next available number)
- `price` is in Rupees
- `category` must match existing category: `rice`, `pulses`, `wheat`, `refined-oil`, or `mustard-oil`
- Keep the same image URL for similar products

## Adding a Completely New Product Category

Example: Adding "Spices" category

### Step 1: Add Products

In `src/data/products.js`, add after the last product:

```javascript
  // Spices Varieties
  { id: 28, name: 'Turmeric Powder', price: 80, unit: '100g', category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a0b3b1b1e2b0?w=400' },
  { id: 29, name: 'Red Chili Powder', price: 90, unit: '100g', category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a0b3b1b1e2b0?w=400' },
  { id: 30, name: 'Cumin Seeds', price: 120, unit: '100g', category: 'spices', image: 'https://images.unsplash.com/photo-1596040033229-a0b3b1b1e2b0?w=400' },
```

### Step 2: Add Category

In the same file, find `export const categories` section and add:

```javascript
export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'rice', name: 'Rice' },
  { id: 'pulses', name: 'Pulses' },
  { id: 'wheat', name: 'Wheat' },
  { id: 'refined-oil', name: 'Refined Oil' },
  { id: 'mustard-oil', name: 'Mustard Oil' },
  { id: 'spices', name: 'Spices' },  // <-- Add this line
]
```

## Current Products in Your Shop

### Rice (6 varieties)
- Basmati Rice - Premium (₹120/kg)
- Basmati Rice - Regular (₹80/kg)
- Sona Masoori Rice (₹60/kg)
- Kolam Rice (₹55/kg)
- Brown Rice (₹90/kg)
- Ponni Rice (₹50/kg)

### Pulses (7 varieties)
- Toor Dal (₹120/kg)
- Moong Dal (₹110/kg)
- Chana Dal (₹100/kg)
- Urad Dal (₹130/kg)
- Masoor Dal (₹95/kg)
- Kabuli Chana (₹140/kg)
- Rajma (₹150/kg)

### Wheat (5 varieties)
- Whole Wheat Atta (₹40/kg)
- Sharbati Wheat Atta (₹50/kg)
- Lokwan Wheat Atta (₹45/kg)
- Multigrain Atta (₹60/kg)
- Chakki Fresh Atta (₹48/kg)

### Refined Oil (5 varieties)
- Sunflower Oil (₹180/liter)
- Soybean Oil (₹160/liter)
- Rice Bran Oil (₹200/liter)
- Groundnut Oil (₹220/liter)
- Palm Oil (₹140/liter)

### Mustard Oil (4 varieties)
- Kachi Ghani Mustard Oil (₹180/liter)
- Pure Mustard Oil (₹160/liter)
- Organic Mustard Oil (₹220/liter)
- Double Filtered Mustard Oil (₹190/liter)

## After Making Changes

1. Save the file
2. Run: `npm run build`
3. Upload the new `dist` folder to Netlify
4. Your app updates automatically!

## Quick Tips

✅ **Always use unique ID numbers**
✅ **Keep prices in whole Rupees** (no decimals needed)
✅ **Use consistent units** (kg, liter, gram, etc.)
✅ **Category names must match exactly** (case-sensitive)
✅ **Test locally first** with `npm run dev`

## Example: Adding 3 New Rice Varieties

```javascript
// In src/data/products.js, add these lines in the Rice section:

{ id: 28, name: 'Jeera Rice', price: 95, unit: '1 kg', category: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
{ id: 29, name: 'Matta Rice', price: 70, unit: '1 kg', category: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
{ id: 30, name: 'Black Rice', price: 150, unit: '1 kg', category: 'rice', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
```

That's it! Simple and easy to maintain.
