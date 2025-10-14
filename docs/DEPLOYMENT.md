# Répéter - Deployment Guide

This guide covers deploying Répéter to production with all necessary configurations for Google Cloud APIs, Supabase, and OpenAI integration.

## Prerequisites

- All services set up (Google Cloud, Supabase, OpenAI)
- Environment variables configured locally
- Repository pushed to GitHub/GitLab
- Hosting platform account (Vercel recommended)

## 1. Pre-Deployment Checklist

### Environment Variables Required

Ensure you have all these values ready:

```bash
# Google Cloud APIs
GOOGLE_CLOUD_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_CLOUD_PROJECT_ID=your-project-id

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# OpenAI
OPENAI_API_KEY=sk-proj-your-api-key
```

### Security Verification

- [ ] No sensitive files in git repository
- [ ] `.env.local` in `.gitignore`
- [ ] Service account JSON file not committed
- [ ] All API keys are valid and active
- [ ] Supabase project is ready and schema migrated

## 2. Vercel Deployment (Recommended)

### Step 1: Connect Repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select your Répéter repository

### Step 2: Configure Environment Variables

In Vercel dashboard, go to Project Settings > Environment Variables:

```
GOOGLE_CLOUD_CLIENT_EMAIL = your-service-account@project.iam.gserviceaccount.com
GOOGLE_CLOUD_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
GOOGLE_CLOUD_PROJECT_ID = your-project-id
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
OPENAI_API_KEY = sk-proj-your-api-key
```

**Important:**

- Set all variables for "Production", "Preview", and "Development"
- For `GOOGLE_CLOUD_PRIVATE_KEY`, include the full key with `\n` for newlines
- Make sure `NEXT_PUBLIC_` variables are set as public (they'll be exposed to client)

### Step 3: Configure Build Settings

Vercel should auto-detect Next.js, but verify:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (default)
- **Install Command:** `npm install`

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Test your deployed app

### Step 5: Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Enable HTTPS (automatic with Vercel)

## 3. Alternative Hosting Platforms

### Netlify

1. Connect GitHub repository
2. Set environment variables in Site Settings > Environment Variables
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out` (if using static export)
4. Deploy

### Railway

1. Connect GitHub repository
2. Set environment variables in project settings
3. Railway auto-detects Next.js
4. Deploy automatically

### DigitalOcean App Platform

1. Create new app from GitHub
2. Configure environment variables
3. Set build command: `npm run build`
4. Deploy

## 4. Production Configuration

### Next.js Configuration

Ensure your `next.config.ts` includes:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // PWA configuration
  experimental: {
    appDir: true,
  },
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Environment-Specific Settings

Create environment-specific configurations:

```typescript
// lib/config.ts
export const config = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  googleCloud: {
    clientEmail: process.env.GOOGLE_CLOUD_CLIENT_EMAIL!,
    privateKey: process.env.GOOGLE_CLOUD_PRIVATE_KEY!,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID!,
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
  },
};
```

## 5. Post-Deployment Testing

### Core Features Test

1. **Authentication**

   - [ ] Sign up with email
   - [ ] Sign in with existing account
   - [ ] Password reset functionality
   - [ ] User profile access

2. **Speech Features**

   - [ ] Microphone access on HTTPS
   - [ ] Audio recording and playback
   - [ ] Speech-to-text transcription
   - [ ] Text-to-speech generation

3. **AI Features**

   - [ ] Phrase generation with OpenAI
   - [ ] Lesson generation
   - [ ] Local storage of generated content

4. **PWA Features**

   - [ ] App installation prompt
   - [ ] Offline functionality
   - [ ] Service worker updates

5. **Database**
   - [ ] Phrase loading from Supabase
   - [ ] User data persistence
   - [ ] Real-time updates

### Performance Testing

- [ ] Page load times < 3 seconds
- [ ] Audio recording latency < 500ms
- [ ] Speech-to-text response < 2 seconds
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

## 6. Monitoring and Analytics

### Set Up Monitoring

1. **Vercel Analytics** (if using Vercel)

   - Enable in project settings
   - Monitor performance metrics

2. **Google Cloud Monitoring**

   - Set up alerts for API quotas
   - Monitor usage and costs

3. **Supabase Monitoring**

   - Check database performance
   - Monitor authentication metrics

4. **OpenAI Usage**
   - Monitor API usage and costs
   - Set up usage alerts

### Error Tracking

Consider adding error tracking:

```bash
npm install @sentry/nextjs
```

Configure Sentry for production error monitoring.

## 7. Security Hardening

### HTTPS Configuration

- Ensure HTTPS is enabled (required for microphone access)
- Configure HSTS headers
- Use secure cookies for authentication

### API Security

- Rate limiting on API routes
- Input validation and sanitization
- CORS configuration
- API key rotation schedule

### Database Security

- Row Level Security (RLS) in Supabase
- Proper user permissions
- Regular backups
- Access logging

## 8. Scaling Considerations

### Performance Optimization

- Enable Next.js image optimization
- Implement caching strategies
- Use CDN for static assets
- Optimize bundle size

### Database Scaling

- Monitor Supabase usage limits
- Implement query optimization
- Consider read replicas for heavy traffic
- Plan for data archiving

### API Rate Limits

- Monitor Google Cloud API quotas
- Implement client-side rate limiting
- Consider caching for TTS audio
- Plan for API cost increases

## 9. Backup and Recovery

### Database Backups

- Enable Supabase automated backups
- Export data regularly
- Test restore procedures

### Code Backups

- Maintain multiple repository mirrors
- Tag stable releases
- Document rollback procedures

### Configuration Backups

- Backup environment variables
- Document all service configurations
- Maintain deployment runbooks

## 10. Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Monitor API usage and costs
- [ ] Review security logs
- [ ] Test backup restoration
- [ ] Update documentation

### Monitoring Alerts

Set up alerts for:

- API quota usage > 80%
- Error rates > 5%
- Response times > 5 seconds
- Database connection issues
- SSL certificate expiration

## Troubleshooting

### Common Deployment Issues

**Build Failures:**

- Check environment variables are set
- Verify all dependencies are in package.json
- Check for TypeScript errors

**Runtime Errors:**

- Verify API keys are valid
- Check service quotas
- Review application logs

**Performance Issues:**

- Enable Vercel analytics
- Check bundle size
- Optimize images and assets

### Support

For deployment issues:

- Check hosting platform documentation
- Review application logs
- Test locally with production environment variables
- Contact platform support if needed

Your Répéter app is now deployed and ready for users! 🚀
