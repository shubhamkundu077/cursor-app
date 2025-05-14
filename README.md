# AI-Powered Adaptive Educational Gaming Platform

An innovative educational gaming platform that uses AI to generate adaptive learning experiences for students from grade 1 to undergraduate level.

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI
- Zustand (State Management)
- Three.js (3D Game Rendering)
- Chart.js (Analytics)

### Backend
- Laravel 11 (API-only)
- Laravel Sanctum (JWT Authentication)
- MySQL (via XAMPP)

### AI Service (Future)
- Python Flask
- OpenAI Integration

## Project Structure

```
/
├── frontend/           # Next.js 14 application
│   ├── app/           # App router pages
│   ├── components/    # React components
│   ├── lib/          # Utilities and configurations
│   ├── store/        # Zustand stores
│   └── public/       # Static assets
│
├── backend/           # Laravel 11 API
│   ├── app/          # Application code
│   ├── routes/       # API routes
│   └── database/     # Migrations and seeds
│
└── ai-service/        # Future Python Flask service
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- PHP 8.2+
- Composer
- XAMPP (MySQL)
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Database Setup
1. Start XAMPP and ensure MySQL is running
2. Create database: `playnlearn_db`
3. Create user: `playnlearn_user` with password: `secure_password`
4. Import database schema (will be provided in migrations)

## Development Workflow

1. Clone the repository
2. Create a new branch for your feature
3. Make changes and commit
4. Push to remote
5. Create pull request

## Available Branches
- `main` - Production-ready code
- `auth-system` - Authentication implementation
- `ai-engine` - AI service integration
- `game-modules` - Game templates and mechanics
- `rewards-system` - Points and rewards system
- `analytics-dashboard` - Analytics and reporting

## License
Proprietary - All rights reserved 