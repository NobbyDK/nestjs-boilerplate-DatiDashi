# Frontend Assets

This folder contains all frontend assets for the DatiDashi Company website.

## Structure

```
public/
├── config.js           # Environment configuration (BACKEND_URL)
├── html/              # Static HTML pages
│   ├── index.html     # Homepage
│   ├── login.html     # Login page
│   ├── admin.html     # Admin dashboard
│   └── admin-*.html   # Admin CRUD pages
├── js/                # JavaScript files
│   ├── admin-*.js     # Admin CRUD operations
│   └── admin-auth.js  # Authentication utilities
└── themes/            # CSS & Images
    └── default/
        ├── partials/  # CSS themes (dark/light)
        └── img/       # Logo & images
```

## Deployment

This folder is deployed to **Vercel** as a static site.

### Configuration
- Backend URL is configured in `config.js`
- Update `BACKEND_URL` after deploying backend to Render

### Routes
All routes are configured in `vercel-frontend.json`:
- `/` → index.html
- `/login` → login.html
- `/admin` → admin.html
- `/admin/products` → admin-products.html
- etc.

## Development

To test locally:
1. Update `config.js` with local backend URL (http://localhost:3000)
2. Start backend: `npm run start:dev` (in root folder)
3. Serve frontend: Use any static server or `npm run start:frontend`

## Production

1. Deploy backend to Render
2. Update `config.js` with production BACKEND_URL
3. Commit & push to GitHub
4. Vercel auto-deploys from `public/` folder
