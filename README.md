# Travel Plan Generator

A complete system for generating **vacation itineraries** and **international relocation guides**, based on destination, budget, and trip duration. Uses Clerk authentication, Zod validation, Prisma ORM, and AI API via Google Gemini.

##  Technologies Used

```txt
- Node.js + Express
- React (Frontend)
- Prisma ORM
- PostgreSQL
- Zod (Validation)
- Clerk (Authentication)
- Google Gemini API (AI)
- Docker + Docker Compose

```

## Features

- Generate personalized **vacation itineraries** based on destination, budget, and trip duration.
- Create detailed **international relocation guides** with information on cost of living, taxes, climate, and job market.
- User authentication and management using **Clerk**.
- Integration with **Google Gemini AI API** to automatically generate travel plans and relocation guides.
- Responsive and interactive frontend built with **React**, **Tailwind CSS**, and **Framer Motion** for smooth animations.
- Fully containerized setup using **Docker** and **Docker Compose** for easy deployment.


## Archicheture 
- Controller: handles HTTP requests
- Service: applies business logic and calls the repository
- Repository: communicates with the database via Prisma
- Input validation with Zod
- Authentication using Clerk (clerkUserId in every plan)
- Gemini API integration for automatic plan generation
- Database: PostgreSQL in Docker container
- Frontend: React + Tailwind + Framer Motion

  ## How to run the project
  
 1. Start everything with Docker
```bash
docker-compose up --build
```

# 2. Run the backend (if not inside Docker Compose)
```bash
cd backend/
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```
# 3. Run the frontend
```bash
cd frontend/
npm install
npm run dev

```
