# 🚀 GitLab Setup - Get Your Permanent URL!

This guide will help you deploy your app to GitLab and get a **permanent URL** that never changes.

## Why GitLab Pages?

✅ **Same URL forever** - No random names like Netlify  
✅ **Free hosting** - 100% free forever  
✅ **Automatic updates** - Push code, app updates automatically  
✅ **Your own domain** - URL format: `https://YOUR_USERNAME.gitlab.io/shop-sales-tracker`

## Step-by-Step Setup

### Step 1: Create GitLab Account (if you don't have one)

1. Go to **https://gitlab.com/users/sign_up**
2. Sign up with your email
3. Verify your email
4. Done!

### Step 2: Create a New Project

1. Go to **https://gitlab.com/projects/new**
2. Click "Create blank project"
3. Fill in:
   - **Project name**: `shop-sales-tracker`
   - **Visibility**: Private (recommended) or Public
4. Click "Create project"
5. **Copy the Git URL** shown (looks like: `https://gitlab.com/YOUR_USERNAME/shop-sales-tracker.git`)

### Step 3: Push Your Code to GitLab

Open Terminal and run these commands:

```bash
# Navigate to your project
cd /Users/mdalai/Desktop/grocery-shop-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit - Shop Sales Tracker"

# Add GitLab as remote (replace YOUR_USERNAME with your actual GitLab username)
git remote add origin https://gitlab.com/YOUR_USERNAME/shop-sales-tracker.git

# Push to GitLab
git branch -M main
git push -u origin main
```

**Note:** You'll be asked for your GitLab username and password when pushing.

### Step 4: Wait for Deployment (Automatic!)

1. Go to your GitLab project page
2. Click on **CI/CD → Pipelines** in the left menu
3. You'll see a pipeline running (blue circle)
4. Wait 2-3 minutes for it to complete (green checkmark)
5. Click on **Settings → Pages** in the left menu
6. **Your URL is ready!** It will be: `https://YOUR_USERNAME.gitlab.io/shop-sales-tracker`

### Step 5: Access on Your Phone

1. Open the URL on your phone: `https://YOUR_USERNAME.gitlab.io/shop-sales-tracker`
2. **iPhone**: Tap Share → "Add to Home Screen"
3. **Android**: Tap Menu (⋮) → "Add to Home screen"
4. Done! You have an app icon on your phone!

## Your Permanent URL

Your app will always be at:
```
https://YOUR_USERNAME.gitlab.io/shop-sales-tracker
```

**This URL never changes!** Bookmark it, share it, use it forever.

## Updating Your App in Future

When you want to add new products or make changes:

```bash
# Make your changes in the code
# Then:

cd /Users/mdalai/Desktop/grocery-shop-app
git add .
git commit -m "Added new products"
git push

# That's it! GitLab automatically rebuilds and updates your app
# Wait 2-3 minutes and your changes are live!
```

## Troubleshooting

### If pipeline fails:
1. Go to **CI/CD → Pipelines**
2. Click on the failed pipeline
3. Check the error message
4. Usually it's just a timeout - click "Retry" button

### If you forgot your GitLab password:
1. Use a Personal Access Token instead
2. Go to **Settings → Access Tokens**
3. Create token with `write_repository` scope
4. Use token as password when pushing

### To change repository name:
1. Go to **Settings → General**
2. Expand "Advanced"
3. Change project name
4. Update your local git remote:
```bash
git remote set-url origin https://gitlab.com/YOUR_USERNAME/NEW_NAME.git
```

## Benefits Over Netlify

| Feature | GitLab Pages | Netlify Drop |
|---------|-------------|--------------|
| URL | Same forever | Changes every time |
| Updates | Git push | Manual upload |
| Cost | Free | Free |
| Setup | One time | Every deployment |
| Version Control | Yes | No |

## Quick Reference

**Your Project URL:** `https://gitlab.com/YOUR_USERNAME/shop-sales-tracker`  
**Your App URL:** `https://YOUR_USERNAME.gitlab.io/shop-sales-tracker`  
**Update Command:** `git add . && git commit -m "update" && git push`

That's it! Your shop is now live with a permanent URL! 🎉
