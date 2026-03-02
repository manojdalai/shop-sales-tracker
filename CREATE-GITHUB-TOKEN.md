# 🔑 Create GitHub Personal Access Token

GitHub requires a Personal Access Token instead of your password for Git operations.

## Step-by-Step Guide

### 1. Create Personal Access Token

1. Go to **https://github.com/settings/tokens**
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in:
   - **Note**: `Shop Sales Tracker` (or any name you want)
   - **Expiration**: `No expiration` (or choose a duration)
   - **Select scopes**: Check BOTH:
     - ✅ **`repo`** (this will check all sub-options automatically)
     - ✅ **`workflow`** (required for GitHub Actions)
4. Scroll down and click **"Generate token"**
5. **IMPORTANT**: Copy the token immediately! You won't see it again.
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2. Use Token to Push Code

Now use this token as your password:

```bash
cd /Users/mdalai/Desktop/grocery-shop-app

# Try pushing again
git push -u origin main

# When prompted:
# Username: YOUR_GITHUB_USERNAME
# Password: PASTE_YOUR_TOKEN_HERE (not your actual password!)
```

### 3. Save Token for Future Use (Optional but Recommended)

To avoid entering the token every time:

```bash
# Tell Git to remember your credentials
git config --global credential.helper store

# Now push once with your token
git push -u origin main

# Enter username and token when prompted
# Git will remember it for future pushes!
```

## Quick Reference

**Token URL**: https://github.com/settings/tokens  
**Username**: `manojdalai` (your GitHub username)  
**Password**: Use the token you generated (starts with `ghp_`)

## Troubleshooting

### If you lost your token:
1. Go to https://github.com/settings/tokens
2. Delete the old token
3. Create a new one following steps above

### If push still fails:
```bash
# Remove old remote and add again
git remote remove origin
git remote add origin https://github.com/manojdalai/shop-sales-tracker.git
git push -u origin main
```

### Alternative: Use SSH instead of HTTPS

If you prefer SSH (no token needed):

1. Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for all prompts
```

2. Copy public key:
```bash
cat ~/.ssh/id_ed25519.pub
# Copy the output
```

3. Add to GitHub:
   - Go to https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your public key
   - Click "Add SSH key"

4. Change remote URL:
```bash
git remote set-url origin git@github.com:manojdalai/shop-sales-tracker.git
git push -u origin main
```

## After Successful Push

Once you successfully push:
1. Go to https://github.com/manojdalai/shop-sales-tracker
2. Click **Settings** → **Pages**
3. Under "Source", select **"GitHub Actions"**
4. Wait 2-3 minutes
5. Your app will be live at: **https://manojdalai.github.io/shop-sales-tracker**

That's your permanent URL! 🎉
