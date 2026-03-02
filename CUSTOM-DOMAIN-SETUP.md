# 🌐 Custom Domain Setup for GitHub Pages

How to use your own domain: **www.maa-annapurna-store.com**

## Overview

Instead of `manojdalai.github.io/shop-sales-tracker`, your app will be at:
**www.maa-annapurna-store.com**

## Step 1: Buy Your Domain

You need to purchase the domain `maa-annapurna-store.com` from a domain registrar.

### Recommended Domain Registrars (Cheap & Easy):

**India-based (Best for you):**
- **GoDaddy India**: https://www.godaddy.com/en-in
  - Price: ₹99-₹699/year for .com domains
  - Easy to use, popular in India
  
- **Hostinger**: https://www.hostinger.in
  - Price: ₹149/year for .com domains
  - Very cheap, good support

- **BigRock**: https://www.bigrock.in
  - Price: ₹199/year for .com domains
  - Indian company

**International:**
- **Namecheap**: https://www.namecheap.com
  - Price: $8-12/year
  - Very popular, good prices

- **Cloudflare**: https://www.cloudflare.com/products/registrar/
  - Price: At-cost pricing (~$9/year)
  - No markup, best value

### How to Buy:

1. Go to any registrar above
2. Search for: `maa-annapurna-store.com`
3. Check if it's available
4. Add to cart and purchase (usually ₹200-700/year)
5. Complete payment
6. You now own the domain!

## Step 2: Configure DNS Settings

After buying the domain, you need to point it to GitHub Pages.

### In Your Domain Registrar (GoDaddy/Hostinger/etc):

1. **Login to your domain registrar**
2. **Go to DNS Management** (or DNS Settings)
3. **Add these DNS records:**

#### For `www.maa-annapurna-store.com`:

**Add a CNAME record:**
```
Type: CNAME
Name: www
Value: manojdalai.github.io
TTL: 3600 (or Auto)
```

#### For `maa-annapurna-store.com` (without www):

**Add 4 A records:**
```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600
```

4. **Save the DNS records**
5. **Wait 10-60 minutes** for DNS to propagate (sometimes up to 24 hours)

## Step 3: Add Domain to GitHub

1. Go to: **https://github.com/manojdalai/shop-sales-tracker/settings/pages**

2. Under **"Custom domain"** section:
   - Enter: `www.maa-annapurna-store.com`
   - Click **"Save"**

3. **Wait a few minutes**, then:
   - Check the box: **"Enforce HTTPS"** (for secure connection)

4. Done! Your site will be available at both:
   - `https://www.maa-annapurna-store.com`
   - `https://maa-annapurna-store.com` (redirects to www)

## Step 4: Update Your App Config

After domain is working, update the Vite config:

Edit `/Users/mdalai/Desktop/grocery-shop-app/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Change from '/shop-sales-tracker/' to '/'
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

Then rebuild and push:
```bash
cd /Users/mdalai/Desktop/grocery-shop-app
git add .
git commit -m "Updated for custom domain"
git push
```

## DNS Configuration Examples by Registrar

### GoDaddy:
1. Login → My Products → DNS
2. Add records as shown above
3. Save

### Hostinger:
1. Login → Domains → Manage
2. DNS / Name Servers → DNS Records
3. Add records as shown above
4. Save

### Namecheap:
1. Login → Domain List → Manage
2. Advanced DNS
3. Add records as shown above
4. Save

### Cloudflare:
1. Login → Select domain
2. DNS → Records
3. Add records as shown above
4. Save

## Verification

After DNS propagates (10-60 minutes), test:

```bash
# Check if DNS is working
nslookup www.maa-annapurna-store.com

# Should show GitHub's IP addresses
```

Or use online tool: https://dnschecker.org

## Troubleshooting

### Domain not working after 24 hours:
- Check DNS records are correct
- Make sure you saved them in registrar
- Try clearing browser cache
- Check GitHub Pages settings

### "Domain is already taken" error:
- Someone else might own that domain
- Try different domain name
- Check domain availability first

### HTTPS not working:
- Wait 24 hours after adding domain
- Make sure "Enforce HTTPS" is checked
- GitHub automatically provisions SSL certificate

### App shows 404 error:
- Make sure you updated `vite.config.js` base to '/'
- Rebuild and push code
- Wait for GitHub Actions to complete

## Cost Summary

**One-time Setup:**
- Domain purchase: ₹200-700/year (renew yearly)
- GitHub Pages: FREE forever
- SSL Certificate: FREE (automatic from GitHub)

**Total Cost:** ₹200-700/year for domain only!

## Alternative: Use Free Subdomain

If you don't want to buy a domain, you can use:
- **https://manojdalai.github.io/shop-sales-tracker** (FREE forever)

Or get a free subdomain from:
- **Freenom**: https://www.freenom.com (.tk, .ml, .ga domains - FREE)
- **InfinityFree**: https://infinityfree.net (free subdomain)

## Your Final URLs

After setup:
- **Primary**: https://www.maa-annapurna-store.com
- **Alternate**: https://maa-annapurna-store.com (redirects to www)
- **GitHub**: https://manojdalai.github.io/shop-sales-tracker (still works)

## Quick Checklist

- [ ] Buy domain `maa-annapurna-store.com`
- [ ] Add CNAME record for `www`
- [ ] Add 4 A records for root domain
- [ ] Wait for DNS propagation (10-60 min)
- [ ] Add custom domain in GitHub Pages settings
- [ ] Enable "Enforce HTTPS"
- [ ] Update `vite.config.js` base to '/'
- [ ] Push changes to GitHub
- [ ] Test your domain!

Your professional shop app will be live at **www.maa-annapurna-store.com**! 🎉
