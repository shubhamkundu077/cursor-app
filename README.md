# PlayNLearn - Educational Gaming Platform

A modern educational gaming platform built with Next.js 14 and Laravel 11, featuring interactive games, achievements, and analytics.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + ShadCN UI
- **State Management:** Zustand
- **Data Visualization:** Chart.js
- **3D Graphics:** Three.js

### Backend
- **Framework:** Laravel 11 (API-only)
- **Authentication:** Laravel Sanctum (JWT)
- **Database:** MySQL (XAMPP)

### AI Service (Future)
- **Framework:** Python Flask
- **Purpose:** AI-powered game mechanics and analytics

## 📁 Project Structure

```
/
├── frontend/                 # Next.js 14 frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   ├── lib/            # Utilities and API clients
│   │   └── store/          # Zustand stores
│   └── public/             # Static assets
│
├── backend/                 # Laravel 11 API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   └── Middleware/
│   │   └── Models/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
│       └── api.php
│
└── ai-service/             # Future Python Flask service
```

## 🛠️ Setup Instructions

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
php artisan db:seed
php artisan serve
```

### Database Setup
1. Start XAMPP (Apache + MySQL)
2. Create database: `playnlearn_db`
3. Create user: `playnlearn_user` with password: `secure_password`
4. Import migrations and seeders

## 🌟 Features

- **Authentication System**
  - JWT-based auth with Sanctum
  - Protected routes
  - User roles (Admin/User)

- **Game Modules**
  - Kingdom Expansion (Educational Game)
  - Interactive questions
  - Real-time feedback

- **Rewards System**
  - Achievements
  - Leaderboards
  - Progress tracking

- **Analytics Dashboard**
  - User performance metrics
  - Game statistics
  - Learning progress

## 🔄 Development Workflow

1. **Branch Strategy**
   - `auth-system`: Authentication features
   - `ai-engine`: AI integration
   - `game-modules`: Game development
   - `rewards-system`: Achievements and rewards
   - `analytics-dashboard`: Analytics features

2. **Commit Guidelines**
   - Use conventional commits
   - Reference issue numbers
   - Write clear commit messages

## 📝 License

MIT License - See LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 