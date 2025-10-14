# Répéter - Complete Setup Guide

This comprehensive guide covers setting up all services and APIs needed for Répéter, including Google Cloud Speech-to-Text, Supabase authentication, and OpenAI integration.

## Prerequisites

- Node.js 18+
- A Google Cloud Platform account
- A Supabase account (sign up at [supabase.com](https://supabase.com))
- An OpenAI account (sign up at [platform.openai.com](https://platform.openai.com))

## 1. Google Cloud Setup

### Step 1: Enable APIs

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Speech-to-Text API**
   - **Text-to-Speech API**

### Step 2: Create Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name: `repeter-app-service`
4. Description: `Service account for Répéter French pronunciation app`
5. Grant roles:
   - `Speech-to-Text API User`
   - `Text-to-Speech API User`
6. Click "Create and Continue" > "Done"

### Step 3: Generate Service Account Key

1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the key file
6. **Keep this file secure and never commit it to version control**

## 2. Supabase Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Enter project details:
   - Name: `repeter-app` (or your preferred name)
   - Database Password: Generate a strong password
   - Region: Choose the closest to your users
4. Click "Create new project"
5. Wait for the project to be ready (usually 1-2 minutes)

### Step 2: Get Supabase Credentials

1. In your Supabase project dashboard, go to Settings > API
2. Copy the following values:
   - **Project URL**
   - **Anon public key**

### Step 3: Set Up Database Schema

Run the migration script to set up the database:

```bash
node scripts/migrate-to-supabase.js
```

Or manually run the SQL from `scripts/sql/database-schema.sql` in your Supabase SQL Editor.

## 3. OpenAI Setup

### Step 1: Get API Key

1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in to your OpenAI account
3. Click "Create new secret key"
4. Copy the API key (starts with `sk-proj-`)
5. **Keep this key secure and never commit it to version control**

## 4. Environment Configuration

Create a `.env.local` file in your project root with all the credentials:

```bash
# Google Cloud Configuration
GOOGLE_CLOUD_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_CLOUD_PROJECT_ID=your-project-id

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your-openai-api-key
```

## 5. Installation and Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Verify Setup

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open `http://localhost:3000` in your browser

3. Test the following features:
   - [ ] Microphone access and recording
   - [ ] Speech-to-text transcription
   - [ ] Text-to-speech playback
   - [ ] User authentication (sign up/login)
   - [ ] AI phrase generation
   - [ ] AI lesson generation

## 6. Production Deployment

### Environment Variables for Production

Set these environment variables in your hosting platform:

#### Google Cloud (Speech-to-Text & Text-to-Speech)

```
GOOGLE_CLOUD_CLIENT_EMAIL
GOOGLE_CLOUD_PRIVATE_KEY
GOOGLE_CLOUD_PROJECT_ID
```

#### Supabase (Authentication & Database)

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

#### OpenAI (AI Features)

```
OPENAI_API_KEY
```

### Vercel Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Set all environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Hosting Platforms

- **Netlify**: Set environment variables in site settings
- **Railway**: Set environment variables in project settings
- **DigitalOcean App Platform**: Set environment variables in app settings

## 7. Security Considerations

### Development

- Never commit `.env.local` or service account JSON files
- Use environment variables for all sensitive data
- Regularly rotate API keys

### Production

- Use environment variables, not JSON files
- Enable HTTPS (required for microphone access)
- Monitor API usage and costs
- Set up rate limiting if needed

## 8. Cost Management

### Google Cloud APIs

- Speech-to-Text: First 60 minutes/month free, then ~$0.006 per 15 seconds
- Text-to-Speech: First 1M characters/month free, then ~$4.00 per 1M characters

### OpenAI API

- GPT-3.5-turbo: ~$0.002 per 1K tokens
- Monitor usage in OpenAI dashboard

### Supabase

- Free tier: 500MB database, 50MB file storage, 2GB bandwidth
- Pro tier: $25/month for additional resources

## 9. Troubleshooting

### Common Issues

**Microphone not working:**

- Ensure HTTPS in production
- Check browser permissions
- Try different browser (Chrome works best)

**API errors:**

- Verify all environment variables are set
- Check API quotas and billing
- Ensure services are enabled in Google Cloud

**Authentication issues:**

- Verify Supabase credentials
- Check email verification if required
- Clear browser cache and try again

**AI generation not working:**

- Verify OpenAI API key is valid
- Check OpenAI account has credits
- Ensure internet connection is stable

### Getting Help

- Check browser console for error messages
- Review API logs in respective dashboards
- Test individual services separately
- Contact support with specific error details

## 10. Next Steps

After successful setup:

1. **Test all features** thoroughly
2. **Set up monitoring** for API usage and errors
3. **Configure backups** for your Supabase database
4. **Set up alerts** for quota limits
5. **Consider scaling** options as your user base grows

## Support

For additional help:

- **Documentation**: Check `/docs` pages in the app
- **Issues**: Report bugs with detailed error messages
- **Contact**: support@repeter.app

Your Répéter app is now ready for French pronunciation practice! 🎉
