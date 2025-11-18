# Comflow

A platform connecting businesses with elite college committees for innovative project collaborations.

## Features

- **Company Dashboard**: Post projects, browse committees, manage proposals
- **Committee Dashboard**: Browse projects, submit proposals, manage active projects
- **Messaging System**: Integrated communication between companies and committees
- **Project Management**: Milestone tracking, progress updates, portfolio showcase

## Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Lucide React for icons

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts** to configure your deployment.

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

Alternatively, you can deploy directly through the [Vercel Dashboard](https://vercel.com):
- Push your code to GitHub/GitLab/Bitbucket
- Import your repository in Vercel
- Vercel will auto-detect Vite and deploy automatically

### Deploy to Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy
   ```

3. **For production deployment**:
   ```bash
   netlify deploy --prod
   ```

Or deploy through [Netlify Dashboard](https://app.netlify.com):
- Drag and drop your `dist` folder after running `npm run build`
- Or connect your Git repository for continuous deployment

### Build Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite

The project includes configuration files for both Vercel (`vercel.json`) and Netlify (`netlify.toml`) for easy deployment.
