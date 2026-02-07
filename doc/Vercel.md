# Deploying to Vercel

This guide explains how to deploy the Sarcoin Frontend to Vercel.

## Configuration

The project includes a `vercel.json` configuration file in `apps/web/` that configures the deployment settings for the monorepo structure.

### Vercel Settings

When setting up your project in Vercel, use the following settings:

1. **Framework Preset**: Next.js
2. **Root Directory**: `apps/web`
3. **Build Command**: The build command is configured in `vercel.json` and will run from the monorepo root
4. **Install Command**: Configured to use `pnpm install`
5. **Output Directory**: `.next`

### Environment Variables

Make sure to configure the following environment variables in your Vercel project settings:

- Copy variables from `.env.production` or `.env.example` in `apps/web/`
- Set any required API keys and configuration values

## Automatic Deployments

Once configured, Vercel will automatically deploy:

- **Production**: On pushes to the `main` branch
- **Preview**: On pull requests and pushes to other branches

## Manual Deployment

You can also deploy manually using the Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Monorepo Structure

This project uses:

- **pnpm** for package management
- **Turbo** for build orchestration
- **Next.js** as the framework

The `vercel.json` configuration handles the build process for the monorepo structure automatically.

## Troubleshooting

If you encounter build issues:

1. Verify that the Node.js version matches the one specified in `package.json` (>=16.0.0)
2. Check that all environment variables are properly configured
3. Review build logs in the Vercel dashboard
4. Ensure dependencies are properly installed with `pnpm install`
