# SkillSwap Platform

A full-stack skill exchange and barter platform for the Odoo Hackathon.

## Features
- Modern React frontend (user-app) with premium Tailwind UI
- Node.js/Express backend with PostgreSQL (Prisma ORM)
- JWT authentication and user profiles
- Offer, want, and manage skills (dropdown, filtering, validation)
- Send and receive swap requests between users
- Real-time user rating system (1–5 stars, with average)
- Public/private profile visibility
- Robust error handling and validation
- Ready for hackathon demo and judging

## How to Run Locally

1. **Clone the repo:**
   ```sh
   git clone https://github.com/cse-ai-shriyansh/odoo-hackathon.git
   cd odoo-hackathon
   ```
2. **Install dependencies:**
   - For backend: `cd apps/backend && npm install`
   - For frontend: `cd ../user-app && npm install`
3. **Setup environment:**
   - Copy `.env.example` to `.env` in `apps/backend` and set your DB credentials
4. **Run database migrations:**
   - `cd apps/backend && npx prisma migrate deploy`
5. **Start backend:**
   - `npm start` (runs on port 4000)
6. **Start frontend:**
   - `cd ../user-app && npm run dev` (runs on port 5173)

## Usage
- **Sign up/login** as a user
- **Edit your profile** and set offered/wanted skills
- **Explore** other users and their skills
- **Send swap requests** to users for skill exchange
- **Rate users** after swaps (1–5 stars)
- **See average ratings** on user profiles

## Submission Notes
- All code is in this repo (monorepo structure)
- Backend: `/apps/backend`
- Frontend: `/apps/user-app`
- Database: PostgreSQL (see `.env.example`)
- Judging/demo: Start both servers, open frontend, and test full flow

---

Made with ❤️ for the Odoo Hackathon 2025.
 Admin apps, sharing a Node.js backend and PostgreSQL database.

## Structure
- `apps/user-app`: User-facing React app (TailwindCSS)
- `apps/admin-app`: Admin dashboard React app (Chakra UI)
- `apps/backend`: Node.js/Express backend, PostgreSQL (Prisma)
- `shared/types`, `shared/utils`: Shared code

## Quick Start
1. Install dependencies in each app folder
2. Set up PostgreSQL and configure `.env`
3. Run backend, then user/admin apps

## Features
- User: Auth, profile, skills, swap requests, ratings, reviews, themes
- Admin: Auth, dashboard, user/skill/swap moderation, analytics, exports
- Real-time updates, email notifications, premium UI

---
