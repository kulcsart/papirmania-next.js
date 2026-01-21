# Papírmania Deployment Architecture Documentation

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Infrastructure Components](#infrastructure-components)
3. [Architecture Diagram](#architecture-diagram)
4. [Detailed Service Configuration](#detailed-service-configuration)
5. [Problems Solved](#problems-solved)
6. [Future Best Practices](#future-best-practices)
7. [Maintenance Guide](#maintenance-guide)
8. [Troubleshooting](#troubleshooting)

---

## System Overview

The Papírmania website is a headless CMS-based application consisting of:
- **Frontend**: Next.js 14 application serving the public website
- **Backend**: Strapi 4 CMS for content management
- **Database**: PostgreSQL hosted on Neon
- **Hosting**: Multi-provider setup (Vercel + Fly.io)
- **DNS**: Cloudflare

### Live URLs
- **Public Website**: https://www.papirmania.hu
- **CMS Admin**: https://admin.papirmania.hu
- **API Endpoint**: https://admin.papirmania.hu/api

---

## Infrastructure Components

### 1. Neon (Database Provider)
**Purpose**: PostgreSQL database hosting

**Why Neon?**
- Fly.io charges ~$35/month for managed PostgreSQL
- Neon offers generous free tier (3GB storage, 0.5GB RAM)
- Serverless architecture with auto-scaling
- Automatic backups

**Configuration**:
- Database: `papirmania-strapi`
- Connection: Uses DATABASE_URL environment variable
- SSL: Enabled (required)

**Cost**: Free tier (sufficient for this project)

---

### 2. Fly.io (Backend Hosting)
**Purpose**: Hosts the Strapi CMS backend

**App Name**: `strapicms`

**Configuration**:
```toml
# fly.toml
app = 'strapicms'
primary_region = 'ams'

[http_service]
  internal_port = 1337
  force_https = true

[mounts]
  source = "data"
  destination = "/app/public/uploads"
```

**Environment Variables** (set via `flyctl secrets`):
```
DATABASE_URL=postgresql://...         # Neon connection string
DATABASE_CLIENT=postgres
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false
PUBLIC_URL=https://admin.papirmania.hu
HOST=0.0.0.0
NODE_ENV=production
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
```

**Volume**:
- Name: `data`
- Size: 1GB
- Purpose: Stores uploaded media files
- Mount: `/app/public/uploads`

**Custom Domain**:
- Domain: `admin.papirmania.hu`
- SSL: Let's Encrypt (auto-renewed)
- Command used: `flyctl certs add admin.papirmania.hu -a strapicms`

**Cost**: Free tier (1 shared-cpu-1x VM, 256MB RAM)

**Deployment**:
```bash
# Deploy changes
flyctl deploy -a strapicms

# View logs
flyctl logs -a strapicms

# SSH into machine
flyctl ssh console -a strapicms

# Check certificate status
flyctl certs check admin.papirmania.hu -a strapicms
```

---

### 3. Vercel (Frontend Hosting)
**Purpose**: Hosts the Next.js frontend

**Project Name**: `papirmania-next.js`

**Configuration**:
```json
// vercel.json
{
  "functions": {
    "pages/api/**": {
      "maxDuration": 10
    }
  }
}
```

**Environment Variables**:
```
NEXT_PUBLIC_STRAPI_API_URL=https://admin.papirmania.hu
RESEND_API_KEY=re_...
```

**Build Settings**:
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Node Version: 24.x

**Custom Domain**:
- Domain: `www.papirmania.hu`
- DNS: CNAME to `cname.vercel-dns.com`
- SSL: Automatic (Vercel managed)

**Cost**: Free tier (Hobby)

**Deployment**:
```bash
# Deploy via CLI
vercel --prod

# Or automatic via GitHub push to main branch

# Environment variables
vercel env ls
vercel env add VARIABLE_NAME production
vercel env rm VARIABLE_NAME production
```

---

### 4. Cloudflare (DNS Management)
**Purpose**: DNS provider and optional CDN

**Domain**: `papirmania.hu`

**DNS Records**:
```
Type    Name     Target                       Proxy    TTL
------------------------------------------------------
CNAME   www      cname.vercel-dns.com        ✓ On     Auto
CNAME   admin    pnjerjl.strapicms.fly.dev   ✗ Off    Auto
CNAME   _acme-challenge.admin                ✗ Off    Auto
                 admin.papirmania.hu.pnjerjl.flydns.net
```

**Important Notes**:
- `www` subdomain: Proxied through Cloudflare (orange cloud)
- `admin` subdomain: DNS-only (gray cloud) - **MUST NOT BE PROXIED**
  - Reason: Let's Encrypt SSL validation requires direct access
  - If proxied, SSL certificate will fail to renew

**SSL/TLS Settings**:
- SSL/TLS encryption mode: Full (strict)
- Always Use HTTPS: Enabled
- Automatic HTTPS Rewrites: Enabled

**Cost**: Free tier

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Internet Users                           │
└────────────────┬────────────────────────────────────┬────────────┘
                 │                                    │
                 │                                    │
    ┌────────────▼────────────┐         ┌────────────▼────────────┐
    │  www.papirmania.hu      │         │  admin.papirmania.hu    │
    │  (Cloudflare DNS)       │         │  (Cloudflare DNS)       │
    │  Proxied ☁              │         │  DNS Only 🌐            │
    └────────────┬────────────┘         └────────────┬────────────┘
                 │                                    │
                 │                                    │
    ┌────────────▼────────────┐         ┌────────────▼────────────┐
    │   Vercel CDN            │         │   Fly.io Edge           │
    │   (Global)              │         │   (Amsterdam)           │
    └────────────┬────────────┘         └────────────┬────────────┘
                 │                                    │
                 │                                    │
    ┌────────────▼────────────┐         ┌────────────▼────────────┐
    │   Next.js 14            │         │   Strapi 4 CMS          │
    │   (SSR + Static)        │─────────│   (Node.js)             │
    │   Port: 3000            │  HTTP   │   Port: 1337            │
    └─────────────────────────┘  API    └────────────┬────────────┘
                                 Calls                │
                                                      │ PostgreSQL
                                         ┌────────────▼────────────┐
                                         │   Neon Database         │
                                         │   (PostgreSQL 15)       │
                                         │   Region: AWS us-east-2 │
                                         └─────────────────────────┘
```

**Data Flow**:

1. **Public User visits www.papirmania.hu**:
   - Request → Cloudflare → Vercel Edge Network → Next.js App
   - Next.js fetches data from `https://admin.papirmania.hu/api`
   - Strapi queries Neon PostgreSQL
   - Response rendered and cached

2. **Admin visits admin.papirmania.hu**:
   - Request → Cloudflare (DNS only) → Fly.io → Strapi
   - Strapi queries Neon PostgreSQL
   - Admin UI served

3. **Content Update Flow**:
   - Admin edits content in Strapi → Saved to Neon DB
   - Next.js fetches updated content on next page load
   - Static pages regenerated on demand (ISR)

---

## Detailed Service Configuration

### Next.js Application Configuration

**File: `next.config.mjs`**
```javascript
export default {
  images: {
    unoptimized: true,  // Using <img> tags instead of Next.js Image
  },
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  },
}
```

**File: `.env.local` (Local Development)**
```
NEXT_PUBLIC_STRAPI_API_URL=https://admin.papirmania.hu
RESEND_API_KEY=re_...
```

**API Service: `src/services/strapi.service.ts`**
- Uses `NEXT_PUBLIC_STRAPI_API_URL` environment variable
- Fetches content from Strapi API
- Client-side rendering with `useEffect` for gallery images

---

### Strapi Configuration

**File: `config/server.js`**
```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  proxy: true,  // Important for Fly.io reverse proxy
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```

**File: `config/database.js`**
```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool(
          'DATABASE_SSL_REJECT_UNAUTHORIZED',
          false
        ),
      },
    },
  },
});
```

**File: `config/admin.js`**
```javascript
module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  url: '/admin',
  serveAdminPanel: true,
});
```

---

## Problems Solved

### Problem 1: Image Loading Issues
**Symptom**: Gallery images not displaying, showing placeholder icons

**Root Causes**:
1. Next.js Image component trying to optimize images from external domain
2. Missing `remotePatterns` configuration for Strapi domain
3. Image optimization failing on Vercel

**Solutions**:
1. Replaced Next.js `<Image>` components with native `<img>` tags
2. Set `images: { unoptimized: true }` in `next.config.mjs`
3. Removed `vercel.json` image configuration (was causing validation errors)

**Files Changed**:
- `src/app/GallerySection.tsx`: Changed `Image` to `img`
- `next.config.mjs`: Added `unoptimized: true`
- `vercel.json`: Removed `images` section

---

### Problem 2: Environment Variable Configuration
**Symptom**: Next.js not fetching data from correct Strapi URL

**Root Cause**:
- Local `.env.local` pointed to `localhost:1337`
- Vercel environment variables not set correctly
- Build-time vs runtime environment variable confusion

**Solution**:
1. Updated `.env.local` to use production URL: `https://admin.papirmania.hu`
2. Set Vercel environment variables via CLI:
   ```bash
   vercel env add NEXT_PUBLIC_STRAPI_API_URL production
   vercel env add NEXT_PUBLIC_STRAPI_API_URL preview
   vercel env add NEXT_PUBLIC_STRAPI_API_URL development
   ```
3. Redeployed: `vercel --prod`

**Key Learning**: `NEXT_PUBLIC_*` variables are embedded at build time, require redeploy after changes

---

### Problem 3: Domain Configuration Conflicts
**Symptom**: Domain already assigned to another Vercel project

**Root Cause**: Multiple Vercel projects existed:
- `papirmania-hjhr` (old project with domain)
- `papirmania-next.js` (new project)
- `papirmania` (legacy project)

**Solution**:
1. Removed domain from old project via Vercel dashboard
2. Added domain to new project
3. DNS propagation took ~5 minutes

**Prevention**: Clean up old projects, use consistent naming

---

### Problem 4: SSL Certificate for Custom Domain on Fly.io
**Symptom**: SSL certificate not provisioning for admin.papirmania.hu

**Root Cause**: Cloudflare proxy mode interfering with Let's Encrypt validation

**Solution**:
1. Added certificate: `flyctl certs add admin.papirmania.hu -a strapicms`
2. Added DNS records in Cloudflare:
   - CNAME: `admin` → `pnjerjl.strapicms.fly.dev` (Proxy OFF)
   - CNAME: `_acme-challenge.admin` → `admin.papirmania.hu.pnjerjl.flydns.net` (Proxy OFF)
3. Waited 2-3 minutes for validation
4. Verified: `flyctl certs check admin.papirmania.hu -a strapicms`

**Critical**: Admin subdomain MUST NOT be proxied through Cloudflare

---

### Problem 5: Strapi Public URL Configuration
**Symptom**: Strapi generating incorrect URLs for uploaded files

**Root Cause**: `PUBLIC_URL` not set in Fly.io environment

**Solution**:
```bash
flyctl secrets set PUBLIC_URL=https://admin.papirmania.hu -a strapicms
```

**Result**: Strapi now generates correct absolute URLs for media files

---

### Problem 6: vercel.json Configuration Errors
**Symptom**: Deployment failing with validation errors

**Error Messages**:
- `images should NOT have additional property unoptimized`
- `images missing required property sizes`

**Root Cause**: `vercel.json` had invalid schema for `images` configuration

**Solution**: Removed `images` section entirely from `vercel.json`:
```json
{
  "functions": {
    "pages/api/**": {
      "maxDuration": 10
    }
  }
}
```

**Key Learning**: Image optimization settings belong in `next.config.mjs`, not `vercel.json`

---

### Problem 7: Gallery Rendering "0 images" During Build
**Symptom**: Build logs showing "Rendering gallery with 0 images"

**Root Cause**: Gallery component uses `useEffect` for client-side data fetching

**Why This Is Actually Correct**:
- Gallery is a client component (`'use client'`)
- Data fetches at runtime in browser, not during build
- Build-time log shows 0 images because it's SSR pass
- Actual images load after hydration in browser

**No Fix Needed**: This is expected behavior for client-side data fetching

---

## Future Best Practices

### 1. Simplify Infrastructure
**Current Complexity**: 4 services (Neon, Fly.io, Vercel, Cloudflare)

**Recommendation for Future Projects**:
- **Option A**: Use Vercel for both frontend and backend
  - Vercel can host Next.js API routes
  - Strapi can run on Vercel (with limitations)
  - Reduces to 2 services: Vercel + Neon

- **Option B**: Use Fly.io for everything
  - Host Next.js on Fly.io
  - Host Strapi on Fly.io
  - Use Fly.io Postgres (if budget allows)
  - Reduces to 1 service: Fly.io

**Why Current Setup**:
- Fly.io Postgres is expensive ($35/month)
- Neon offers generous free tier
- Vercel has excellent Next.js DX and CDN
- Trade-off: Complexity vs Cost

---

### 2. Environment Variable Management

**Do**:
- ✅ Use `.env.local` for local development (gitignored)
- ✅ Set production variables via CLI/dashboard
- ✅ Use `NEXT_PUBLIC_*` prefix for client-exposed variables
- ✅ Document all required environment variables in README
- ✅ Use separate values for production, preview, development

**Don't**:
- ❌ Commit `.env` files to git
- ❌ Hardcode URLs in code
- ❌ Mix up build-time vs runtime variables
- ❌ Forget to redeploy after changing `NEXT_PUBLIC_*` variables

---

### 3. Image Handling

**Lessons Learned**:
- Next.js Image component is great for same-origin images
- For external/CMS images, native `<img>` tags are simpler
- Always configure `remotePatterns` if using Next.js Image
- Consider CDN for image optimization (Cloudinary, imgix)

**Recommended Approach**:
```javascript
// For static images (in /public)
import Image from 'next/image'
<Image src="/logo.png" />

// For CMS images (external)
<img src={strapiImageUrl} loading="lazy" />
```

---

### 4. Domain Configuration

**Best Practices**:
- Use separate subdomains for frontend and admin
  - `www.domain.com` → Frontend
  - `admin.domain.com` → Backend
- Avoid path-based routing (`/admin`) across different services
- Always use `DNS only` for services requiring SSL validation
- Document DNS records in repository

---

### 5. Deployment Strategy

**Current Setup**: Manual deployments via CLI

**Recommended Improvements**:
1. **Enable Automatic Deployments**:
   - Vercel: Already connected to GitHub, auto-deploys on push
   - Fly.io: Set up GitHub Actions for auto-deploy

2. **Use Git Branches**:
   - `main` → Production
   - `staging` → Preview deployments
   - `dev` → Development

3. **Environment-Specific Configs**:
   ```
   .env.development    # Local development
   .env.production     # Production (set in hosting dashboard)
   .env.preview        # Preview deployments
   ```

---

### 6. Database Backup Strategy

**Current**: Relying on Neon automatic backups

**Recommendations**:
1. Set up additional backup script:
   ```bash
   # Backup script
   pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
   ```
2. Store backups in separate location (S3, Backblaze B2)
3. Test restoration process regularly
4. Document restoration procedure

---

### 7. Monitoring and Logging

**Add for Production**:
1. **Error Tracking**: Sentry or similar
2. **Performance Monitoring**: Vercel Analytics
3. **Uptime Monitoring**: UptimeRobot or Pingdom
4. **Log Aggregation**: Consider Papertrail for Fly.io logs

**Current Logging**:
```bash
# Vercel logs
vercel logs --follow

# Fly.io logs
flyctl logs -a strapicms
```

---

### 8. Security Hardening

**Implemented**:
- ✅ HTTPS everywhere
- ✅ SSL certificates auto-renewed
- ✅ Secrets stored in environment variables
- ✅ Database SSL enabled

**Additional Recommendations**:
1. Set up Cloudflare WAF rules
2. Implement rate limiting on API endpoints
3. Regular security updates: `npm audit fix`
4. Use Strapi API tokens instead of public access
5. Implement CORS restrictions in Strapi

---

### 9. Cost Optimization

**Current Monthly Costs**: ~$0 (all on free tiers)

**Limits to Watch**:
- Neon: 3GB storage, 0.5GB RAM
- Vercel: 100GB bandwidth, unlimited deployments
- Fly.io: 1 shared-cpu-1x VM, 256MB RAM

**When to Upgrade**:
- Traffic > 10,000 unique visitors/month
- Database > 2GB
- Media files > 5GB
- API calls > 100k/month

**Upgrade Path**:
1. Vercel Pro: $20/month (more bandwidth)
2. Fly.io Scale: $5/month (dedicated CPU)
3. Neon Pro: $19/month (3 projects, 10GB storage)

---

### 10. Code Organization

**Maintain Separation**:
```
papirmania-next.js/          # Frontend repo
├── src/
├── public/
├── .env.local
└── vercel.json

--strapiCMS/                 # Backend repo
├── config/
├── src/
├── .env
└── fly.toml
```

**Don't**:
- ❌ Mix frontend and backend code in same repo
- ❌ Commit large media files to git
- ❌ Store secrets in code

**Do**:
- ✅ Keep repos separate
- ✅ Use git submodules if needed
- ✅ Document inter-service communication
- ✅ Version API contracts

---

## Maintenance Guide

### Regular Tasks

#### Weekly
- [ ] Check Fly.io app health: `flyctl status -a strapicms`
- [ ] Review Vercel deployment status
- [ ] Check for npm security updates: `npm audit`

#### Monthly
- [ ] Review Neon database storage usage
- [ ] Check SSL certificate expiry (should auto-renew)
- [ ] Review Vercel bandwidth usage
- [ ] Update dependencies: `npm update`

#### Quarterly
- [ ] Review and optimize database queries
- [ ] Clean up old Vercel deployments
- [ ] Review and update documentation
- [ ] Test backup restoration process

---

### Updating Content

**Via Strapi Admin**:
1. Go to https://admin.papirmania.hu
2. Login with admin credentials
3. Navigate to Content Manager
4. Edit content, upload images
5. Click "Publish"
6. Changes appear on www.papirmania.hu within seconds

**Note**: No deployment needed for content changes!

---

### Deploying Code Changes

**Frontend (Next.js)**:
```bash
cd papirmania-next.js
git add .
git commit -m "Description of changes"
git push origin main
# Vercel auto-deploys from GitHub
```

**Backend (Strapi)**:
```bash
cd --strapiCMS
git add .
git commit -m "Description of changes"
git push origin main
flyctl deploy -a strapicms
```

---

### Database Migrations

**When Strapi schema changes**:
```bash
# Local development
npm run strapi develop

# Make changes in Content-Type Builder

# Migrations are auto-generated in database/migrations/

# Deploy to production
git add database/migrations/
git commit -m "Add new content type"
git push
flyctl deploy -a strapicms
```

---

### Rolling Back

**Frontend (Vercel)**:
1. Go to Vercel dashboard
2. Select project → Deployments
3. Find previous successful deployment
4. Click "Promote to Production"

**Backend (Fly.io)**:
```bash
# List recent releases
flyctl releases -a strapicms

# Rollback to previous version
flyctl releases rollback -a strapicms
```

---

## Troubleshooting

### Images Not Loading

**Symptoms**: Placeholder images instead of actual content

**Checklist**:
1. Check Strapi is running: `curl https://admin.papirmania.hu/api/gallery-items`
2. Verify environment variable: `vercel env ls`
3. Check browser console for CORS errors
4. Verify Fly.io volume is mounted: `flyctl ssh console -a strapicms -C "ls /app/public/uploads"`

**Solution**:
```bash
# Redeploy frontend with correct env var
vercel env add NEXT_PUBLIC_STRAPI_API_URL production
vercel --prod
```

---

### Admin Panel Not Accessible

**Symptoms**: admin.papirmania.hu not loading or SSL error

**Checklist**:
1. Check Fly.io app status: `flyctl status -a strapicms`
2. Check SSL certificate: `flyctl certs check admin.papirmania.hu -a strapicms`
3. Verify DNS: `dig admin.papirmania.hu CNAME`
4. Check Cloudflare proxy is OFF (gray cloud)

**Solution**:
```bash
# Restart Fly.io app
flyctl restart -a strapicms

# If SSL expired
flyctl certs add admin.papirmania.hu -a strapicms
```

---

### Database Connection Issues

**Symptoms**: Strapi admin blank, "Connection refused" errors

**Checklist**:
1. Verify Neon database is running (check Neon dashboard)
2. Check DATABASE_URL secret: `flyctl secrets list -a strapicms`
3. Test connection: `psql $DATABASE_URL`

**Solution**:
```bash
# Update DATABASE_URL if changed
flyctl secrets set DATABASE_URL="postgresql://..." -a strapicms
```

---

### Build Failures

**Symptoms**: Vercel deployment fails

**Common Causes**:
1. TypeScript errors
2. Missing environment variables
3. Invalid configuration files

**Solution**:
```bash
# Test build locally
npm run build

# Check for errors
npm run lint

# Fix and redeploy
git add .
git commit -m "Fix build errors"
git push
```

---

### High Memory Usage (Fly.io)

**Symptoms**: App restarting frequently, OOM errors

**Solution**:
```bash
# Check memory usage
flyctl ssh console -a strapicms -C "free -h"

# Scale up if needed (costs money)
flyctl scale memory 512 -a strapicms
```

**Prevention**: Optimize Strapi plugins, reduce concurrent requests

---

## Emergency Contacts

**Services**:
- Vercel Status: https://www.vercel-status.com/
- Fly.io Status: https://status.flyio.net/
- Neon Status: https://neon.tech/status
- Cloudflare Status: https://www.cloudflarestatus.com/

**Documentation**:
- Vercel Docs: https://vercel.com/docs
- Fly.io Docs: https://fly.io/docs
- Strapi Docs: https://docs.strapi.io
- Next.js Docs: https://nextjs.org/docs

---

## Conclusion

This setup, while complex, provides:
- ✅ Zero-cost hosting (free tiers)
- ✅ High performance (CDN + serverless)
- ✅ Scalability (can upgrade as needed)
- ✅ Reliability (multiple providers)
- ✅ Security (HTTPS, isolated services)

**Key Takeaway**: Document everything! This README should be updated whenever infrastructure changes are made.

**Last Updated**: January 21, 2026
**Maintained By**: Development Team
**Next Review**: April 2026
