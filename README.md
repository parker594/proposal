# Valentine's Week Journey 💖

A viral MERN stack application to create a 7-day interactive Valentine's gift.
**Ready for Vercel Deployment.**

## Prerequisites
- Node.js installed
- MongoDB installed (or MongoDB Atlas URI)

## Local Development

1.  **Install Dependencies**:
    Locally, we install dependencies for both the root (api) and client.
    - Root/Backend: `npm install` (in `c:\Users\ASUS\prposal`)
    - Frontend: `cd client && npm install`

2.  **Environment Variables**:
    - A `.env` file is created in the root for local development.
    - `MONGO_URI=mongodb://localhost:27017/valentine_journey`

3.  **Start the App**:
    - **Backend**: `npm start` (Runs `node api/index.js`) -> You might need to add this script to package.json or run `node api/index.js` directly.
    - **Frontend**: `cd client && npm run dev`

## Vercel Deployment Guide 🚀

1.  **Push to GitHub**:
    Initialize legacy git if needed and push this entire folder.

2.  **Import to Vercel**:
    - Select the repository.
    - **Framework Preset**: Vite (for the frontend).
    - **Root Directory**: `client` ? **NO**, keep root as `./` but configure Vercel Settings:
        - Actually, for a monorepo-style like this:
        - **Root Directory**: Leave as `./`
        - **Build Command**: `cd client && npm install && npm run build`
        - **Output Directory**: `client/dist`
        - **Install Command**: `npm install`

3.  **Environment Variables (CRITICAL)**:
    - Go to Vercel Dashboard > Settings > Environment Variables.
    - Add `MONGO_URI` with your **MongoDB Atlas Connection String**.
    - (The `.env` file is ignored or not used in production usually, Vercel injects these).

## Features
- **Floating Hearts**: Interactive background cursor effect.
- **Glassmorphism UI**: Premium feel.
- **Serverless API**: `api/` directory ready for Vercel functions.
