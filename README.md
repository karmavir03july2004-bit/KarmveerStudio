# Karmveer Studio Portfolio Website

A premium, database-driven portfolio website for Karmveer Studio - Video Editor & Motion Graphics Designer.

## Features

- **Premium Dark Design**: Cinematic, minimal, and modern visual identity
- **Database-Driven Portfolio**: All projects stored in PostgreSQL via Prisma
- **Admin Dashboard**: Full CMS for managing projects, testimonials, and messages
- **Secure Authentication**: NextAuth.js with credentials provider
- **Cloudinary Integration**: Secure media uploads for thumbnails and videos
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for elegant interactions
- **SEO Optimized**: Proper metadata, Open Graph, and sitemap support

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Media**: Cloudinary
- **Animations**: Framer Motion
- **Validation**: Zod

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see `.env.example`):

```env
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

5. Create an admin user (run this in your database or use Prisma Studio):

```bash
npx prisma studio
```

Create a user in the `User` table with:
- `email`: Your admin email
- `password`: Hashed password (use bcrypt to hash)

6. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For Netlify, add `DATABASE_URL` as a server-side environment variable in the site
settings, then redeploy. It must be the connection string for the existing
PostgreSQL database. Do not expose it as a `NEXT_PUBLIC_` variable.

## Admin Access

- Admin Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)
- Admin Login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Database Schema

The application uses the following models:

- **User**: Admin users for authentication
- **Project**: Portfolio projects with full media support
- **Testimonial**: Client testimonials
- **Message**: Contact form submissions
- **SiteSettings**: Configurable site settings

## Cloudinary Setup

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add these values to your `.env` file

Images are automatically optimized and stored in the `karmveer-studio/projects` folder.

## Project Categories

- Video Editing
- Motion Graphics
- SaaS Animation
- Color Grading

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is ready for deployment on:

- **Netlify**: Connect your GitHub repository and configure environment variables
- **Vercel**: Import project and add environment variables
- **Node.js servers**: Build and run with `npm start`

### Netlify Configuration

Build command: `npm run build`
Publish directory: `.next`
Environment variables: Add all variables from `.env.example`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes to database
- `npx prisma studio` - Open Prisma Studio

## Security Notes

- Never commit `.env` file or real credentials
- Always use strong `NEXTAUTH_SECRET` in production
- Cloudinary API Secret should never be exposed to client
- Admin routes are protected server-side
- All file uploads are validated and authenticated

## License

© 2026 Karmveer Studio. All rights reserved.
