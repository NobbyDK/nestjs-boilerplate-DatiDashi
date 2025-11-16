# 🚀 Deployment Guide: Vercel (Frontend) + Render (Backend)

## 📋 Overview

Aplikasi ini akan di-deploy dengan arsitektur terpisah:
- **Frontend**: Vercel (Static HTML/JS/CSS)
- **Backend**: Render (NestJS API)
- **Database**: Neon PostgreSQL (sudah configured)

---

## ✅ Perubahan yang Sudah Dilakukan

### 1. Frontend Configuration
✅ Created `public/config.js` - Runtime environment configuration  
✅ Updated 5 JavaScript files (`admin-*.js`) - Dynamic BACKEND_URL  
✅ Updated 8 HTML files - Added config.js script tag  
✅ Copied `themes/` folder to `public/themes/`  

### 2. Backend Configuration
✅ Updated `src/main.ts` - CORS untuk Vercel & Render domains  
✅ Database: Neon PostgreSQL sudah siap  

### 3. Deployment Files
✅ `vercel-frontend.json` - Frontend deployment config  
✅ `vercel.json` - Backend deployment config (existing)  

---

## 🎯 Step 1: Deploy Backend ke Render

### 1.1 Create Render Account
1. Buka https://render.com
2. Sign up dengan GitHub account
3. Authorize Render untuk akses repository

### 1.2 Create New Web Service
1. Dashboard → **New** → **Web Service**
2. Connect repository: `NobbyDK/nestjs-boilerplate-DatiDashi`
3. Configure:
   ```
   Name: nestjs-datidashi-backend (atau nama lain)
   Region: Singapore (terdekat dengan Neon DB)
   Branch: main
   Root Directory: (kosongkan)
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm run start:prod
   ```

### 1.3 Set Environment Variables di Render
Klik **Environment** tab, tambahkan semua variable dari `.env`:

**Required Variables:**
```bash
NODE_ENV=production
APP_PORT=3000
APP_NAME=NestJS DatiDashi API
API_PREFIX=api
APP_FALLBACK_LANGUAGE=en
APP_HEADER_LANGUAGE=x-custom-lang

# Database Neon (COPY from your .env)
DATABASE_TYPE=postgres
DATABASE_SYNCHRONIZE=false
DATABASE_MAX_CONNECTIONS=100
DATABASE_SSL_ENABLED=true
DATABASE_REJECT_UNAUTHORIZED=false
DATABASE_URL=postgresql://neondb_owner:npg_ovVcL6pGE1Mm@ep-cold-water-a150onl8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# File Upload
FILE_DRIVER=local

# Mail (optional for demo)
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_DEFAULT_EMAIL=noreply@example.com
MAIL_DEFAULT_NAME=DatiDashi API
MAIL_IGNORE_TLS=true
MAIL_SECURE=false
MAIL_REQUIRE_TLS=false

# Auth Secrets (GENERATE NEW SECRETS!)
AUTH_JWT_SECRET=<generate-new-random-32-chars>
AUTH_JWT_TOKEN_EXPIRES_IN=15m
AUTH_REFRESH_SECRET=<generate-new-random-32-chars>
AUTH_REFRESH_TOKEN_EXPIRES_IN=45d
AUTH_FORGOT_SECRET=<generate-new-random-32-chars>
AUTH_FORGOT_TOKEN_EXPIRES_IN=30m
AUTH_CONFIRM_EMAIL_SECRET=<generate-new-random-32-chars>
AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN=1d
```

**Generate Random Secrets:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Run 4x untuk generate 4 secrets berbeda.

### 1.4 Deploy Backend
1. Klik **Create Web Service**
2. Tunggu build & deploy (~3-5 menit)
3. Setelah success, copy **Backend URL**: `https://nestjs-datidashi-backend.onrender.com`

### 1.5 Test Backend API
```bash
# Test health check
curl https://nestjs-datidashi-backend.onrender.com/api

# Test products endpoint (should return empty array or data)
curl https://nestjs-datidashi-backend.onrender.com/api/products
```

---

## 🎯 Step 2: Deploy Frontend ke Vercel

### 2.1 Update Backend URL di Config
1. Buka `public/config.js`
2. Update line 16-19:
```javascript
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  // Production mode - GANTI dengan Backend URL dari Render
  window.ENV.BACKEND_URL = 'https://nestjs-datidashi-backend.onrender.com';
  console.log('🌍 Running in PRODUCTION mode');
```

3. Save & commit:
```bash
git add public/config.js
git commit -m "feat: update backend URL for production"
git push origin main
```

### 2.2 Create Vercel Project (Frontend Only)
1. Buka https://vercel.com
2. Login dengan GitHub account
3. **Import Project** → Pilih repository `NobbyDK/nestjs-boilerplate-DatiDashi`

### 2.3 Configure Vercel Project
**IMPORTANT**: Gunakan `vercel-frontend.json` config

**Framework Preset:** Other  
**Root Directory:** `public/`  
**Build Command:** (kosongkan)  
**Output Directory:** (kosongkan)  
**Install Command:** (kosongkan)  

**Advanced Settings:**
- Override vercel.json: Use `vercel-frontend.json`

### 2.4 Deploy Frontend
1. Klik **Deploy**
2. Tunggu deployment (~1-2 menit)
3. Copy **Frontend URL**: `https://your-project.vercel.app`

---

## 🎯 Step 3: Update Environment Variables

### 3.1 Update Backend CORS (di Render)
1. Buka Render Dashboard → Your Web Service
2. **Environment** tab
3. Tambahkan:
```bash
FRONTEND_DOMAIN=https://your-project.vercel.app
BACKEND_DOMAIN=https://nestjs-datidashi-backend.onrender.com
```
4. Save → Auto redeploy

### 3.2 Test Full Integration
1. Buka frontend: `https://your-project.vercel.app`
2. Check console log: Should show backend URL
3. Data should load dari backend API
4. Test login: `https://your-project.vercel.app/login`
5. Test admin panel: `https://your-project.vercel.app/admin`

---

## 🔧 Troubleshooting

### ❌ Error: CORS Policy
**Symptom:** Console error: "blocked by CORS policy"

**Solution:**
1. Check `FRONTEND_DOMAIN` di Render environment variables
2. Pastikan tidak ada typo di URL
3. Redeploy backend setelah update env vars

### ❌ Error: 404 Not Found on Frontend Routes
**Symptom:** Direct URL access ke `/admin` returns 404

**Solution:**
Vercel configuration sudah ada di `vercel-frontend.json`. Pastikan:
1. Root directory = `public/`
2. Routes sudah configured untuk HTML files

### ❌ Error: Backend Cold Start (Render Free Tier)
**Symptom:** First request setelah idle lambat (15-30 detik)

**Expected Behavior:** Ini normal di Render free tier. Setelah warm, fast.

**Solution:** Tidak ada (free tier limitation). Upgrade ke paid plan untuk always-on.

### ❌ Error: Database Connection Failed
**Solution:**
1. Check Neon database masih aktif
2. Verify `DATABASE_URL` di Render environment
3. Pastikan `DATABASE_SSL_ENABLED=true`

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     USER BROWSER                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│               VERCEL (Frontend)                         │
│  https://your-project.vercel.app                        │
│                                                          │
│  • Static HTML/CSS/JS                                   │
│  • public/config.js (BACKEND_URL configured)            │
│  • Themes, Images                                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP Fetch
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│           RENDER (Backend API)                          │
│  https://nestjs-datidashi-backend.onrender.com          │
│                                                          │
│  • NestJS Application                                   │
│  • REST API Endpoints (/api/*)                          │
│  • CORS: Allow Vercel domain                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ PostgreSQL Connection
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│         NEON POSTGRESQL (Database)                      │
│  ep-cold-water-a150onl8-pooler.ap-southeast-1...        │
│                                                          │
│  • Managed PostgreSQL                                   │
│  • SSL Enabled                                          │
│  • Connection Pooling                                   │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Deployment Checklist

**Backend (Render):**
- [ ] Web Service created
- [ ] All environment variables set
- [ ] Auth secrets generated (new random values)
- [ ] Database URL configured
- [ ] Deployment successful
- [ ] API endpoints tested
- [ ] FRONTEND_DOMAIN & BACKEND_DOMAIN set

**Frontend (Vercel):**
- [ ] Project imported
- [ ] Root directory = `public/`
- [ ] Backend URL updated in `public/config.js`
- [ ] Changes committed & pushed to GitHub
- [ ] Deployment successful
- [ ] Routes working (/, /login, /admin)
- [ ] Data loading from backend

**Testing:**
- [ ] Homepage loads with data
- [ ] Login works
- [ ] Admin panel accessible
- [ ] CRUD operations work (products, pricing, etc)
- [ ] No CORS errors in console
- [ ] Images & themes loading

---

## 🔐 Security Notes

1. ⚠️ **JANGAN commit `.env` ke Git**
2. ⚠️ **Generate NEW auth secrets untuk production**
3. ⚠️ **Gunakan strong passwords**
4. ✅ Database SSL enabled
5. ✅ CORS configured untuk specific domains only

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| **Vercel (Frontend)** | Hobby | **FREE** |
| **Render (Backend)** | Free Tier | **FREE** (with limitations) |
| **Neon PostgreSQL** | Free Tier | **FREE** (0.5GB storage) |
| **TOTAL** | | **$0/month** |

**Render Free Tier Limitations:**
- Cold start after 15 minutes idle
- 750 hours/month (auto suspend jika melebihi)
- Shared resources

**Upgrade Options:**
- Render Starter: $7/month (no cold start, always-on)
- Vercel Pro: $20/month (advanced features)

---

## 📝 Next Steps (Optional)

### 1. Custom Domain
**Vercel:**
1. Settings → Domains
2. Add your domain
3. Update DNS records

**Render:**
1. Settings → Custom Domain
2. Add domain & update DNS

### 2. Environment-Based Config
Create multiple configs:
```javascript
// public/config.js
const configs = {
  production: { BACKEND_URL: 'https://api.yourdomain.com' },
  staging: { BACKEND_URL: 'https://staging-api.yourdomain.com' },
  development: { BACKEND_URL: 'http://localhost:3000' }
};

const env = window.location.hostname.includes('staging') ? 'staging' 
           : window.location.hostname === 'localhost' ? 'development' 
           : 'production';

window.ENV = configs[env];
```

### 3. Monitoring & Analytics
- Vercel Analytics (built-in)
- Render Logs & Metrics
- Sentry for error tracking
- Google Analytics for frontend

---

## 🆘 Need Help?

### Render Support
- Docs: https://render.com/docs
- Community: https://community.render.com

### Vercel Support
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord

### Database (Neon)
- Docs: https://neon.tech/docs
- Discord: https://neon.tech/discord

---

**🎉 Deployment Complete!**

Your application is now live:
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://nestjs-datidashi-backend.onrender.com/api`
- Database: Neon PostgreSQL (managed)

Happy coding! 🚀
