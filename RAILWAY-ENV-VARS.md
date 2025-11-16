# Railway Environment Variables

Copy paste variables ini ke Railway dashboard (Settings → Variables):

## Database Configuration
```
DATABASE_URL=postgresql://neondb_owner:npg_ovVcL6pGE1Mm@ep-cold-water-a150onl8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
DATABASE_TYPE=postgres
DATABASE_SSL_ENABLED=true
DATABASE_REJECT_UNAUTHORIZED=false
DATABASE_SYNCHRONIZE=false
```

## App Configuration
```
NODE_ENV=production
APP_PORT=3000
FILE_DRIVER=local
API_PREFIX=api
```

## JWT Secrets (GANTI dengan secret yang aman untuk production!)
```
AUTH_JWT_SECRET=production-jwt-secret-change-this-to-random-string
AUTH_JWT_TOKEN_EXPIRES_IN=30m
AUTH_REFRESH_SECRET=production-refresh-secret-change-this-to-random-string
AUTH_REFRESH_TOKEN_EXPIRES_IN=45d
AUTH_FORGOT_SECRET=production-forgot-secret-change-this-to-random-string
AUTH_FORGOT_TOKEN_EXPIRES_IN=60m
AUTH_CONFIRM_EMAIL_SECRET=production-confirm-secret-change-this-to-random-string
AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN=1d
```

## Mail Configuration (TIDAK DIPAKAI - email disabled untuk sementara)
JANGAN SET MAIL_* variables dulu. Aplikasi akan skip email functionality kalau MAIL_HOST tidak diset.

## PENTING:
1. **HAPUS** `?channel_binding=require` dari DATABASE_URL
2. **HAPUS** semua MAIL_* variables dari Railway (kecuali kamu punya SMTP server)
3. Railway otomatis set PORT, jadi APP_PORT fallback ke Railway PORT kalau perlu

## Testing:
Setelah set variables:
1. Redeploy aplikasi
2. Cek logs: Railway dashboard → Deployments → Latest → Logs
3. Test endpoint: https://web-production-72539.up.railway.app/
