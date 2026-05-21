# FlowBoard 🗂️
A full-featured project management app built with the MERN stack — inspired by Trello.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, dnd-kit, Zustand, Socket.io-client
- **Backend**: Node.js, Express, Mongoose, Passport.js, Socket.io
- **Database**: MongoDB Atlas
- **Storage**: Cloudinary
- **Auth**: JWT (access + refresh tokens), Google OAuth

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)
- Google Cloud project with OAuth credentials

### Setup

```bash
# Clone and install
git clone <your-repo-url>

# Backend
cd server && cp .env.example .env
# Fill in .env values
npm install && npm run dev

# Frontend (new terminal)
cd client && cp .env.example .env
npm install && npm run dev
```

App runs at `http://localhost:5173`, API at `http://localhost:5000`.

## Features
- ✅ JWT auth with refresh tokens + Google OAuth
- ✅ Workspaces with member roles
- ✅ Boards with background themes and visibility settings
- ✅ Lists and cards with drag-and-drop reordering
- ✅ Card details: description, due dates, labels, checklists, attachments
- ✅ Real-time collaboration via Socket.io
- ✅ Activity log per board
- ✅ File attachments via Cloudinary

## Project Structure
See the directory tree below for full layout.

## Deployment
- **Frontend** → Vercel (connect GitHub repo, auto-deploy)
- **Backend** → Render (web service, add env vars)
- **Database** → MongoDB Atlas
