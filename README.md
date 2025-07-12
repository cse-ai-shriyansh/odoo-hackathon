# Skill Swap Platform

A full-stack skill exchange platform with separate User and Admin apps, sharing a Node.js backend and PostgreSQL database.

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
