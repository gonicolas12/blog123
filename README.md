# Blog123 - Blog Sportif

Une application web full-stack pour publier et consulter des articles sportifs.

## Architecture

```
blog123/
├── frontend/          # Application Vue.js 3
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── views/        # Pages/vues
│   │   ├── router/       # Configuration Vue Router
│   │   ├── stores/       # Stores Pinia
│   │   └── services/     # Services API
│   └── public/
│       └── assets/       # Images, audio, etc.
│
├── backend/           # API NestJS
│   └── src/
│       ├── articles/     # Module articles
│       ├── auth/         # Module authentification
│       ├── users/        # Module utilisateurs
│       ├── categories/   # Module catégories
│       └── interviews/   # Module interviews
│
└── docs/             # Ancienne version statique (archivée)
```

## Technologies

### Frontend
- **Vue 3** - Framework JavaScript progressif
- **Vue Router** - Routage SPA
- **Pinia** - Gestion d'état
- **Tailwind CSS** - Framework CSS utilitaire
- **Axios** - Client HTTP
- **Vite** - Build tool

### Backend
- **NestJS** - Framework Node.js
- **TypeORM** - ORM pour MySQL
- **MySQL** - Base de données
- **JWT** - Authentification
- **Passport** - Stratégies d'authentification
- **bcrypt** - Hashage de mots de passe

## Installation

### Prérequis
- Node.js 18+
- MySQL 8+
- npm ou yarn

### Installation rapide

```bash
# Installer toutes les dépendances (root + frontend + backend)
npm run install:all
```

### Installation manuelle

```bash
# Installer les dépendances root
npm install

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

## Configuration

### Backend

1. Créer le fichier `.env` dans le dossier `backend/` :

```bash
cp backend/.env.example backend/.env
```

2. Configurer les variables d'environnement :

```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=blog123

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

3. Créer la base de données MySQL :

```sql
CREATE DATABASE blog123;
```

## Démarrage

### Développement

```bash
# Lancer frontend et backend simultanément
npm run dev

# Ou séparément :
# Frontend (http://localhost:5173)
npm run dev:frontend

# Backend (http://localhost:3000)
npm run dev:backend
```

### Production

```bash
# Build
npm run build

# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build
cd backend && npm run start:prod
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter

### Articles
- `GET /api/articles` - Liste des articles
- `GET /api/articles?sport=foot` - Articles par sport
- `GET /api/articles/:id` - Détail d'un article
- `POST /api/articles` - Créer un article (Auth requise)
- `PATCH /api/articles/:id` - Modifier un article (Auth requise)
- `DELETE /api/articles/:id` - Supprimer un article (Auth requise)

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs (Auth requise)
- `GET /api/users/:id` - Détail utilisateur (Auth requise)

### Catégories
- `GET /api/categories` - Liste des catégories
- `GET /api/categories/:id` - Détail catégorie
- `POST /api/categories` - Créer catégorie (Auth requise)

### Interviews
- `GET /api/interviews` - Liste des interviews
- `GET /api/interviews?sport=basket` - Interviews par sport
- `GET /api/interviews/:id` - Détail interview
- `POST /api/interviews` - Créer interview (Auth requise)

## Déploiement

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Déployer le dossier dist/
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
# Déployer avec start:prod
```

### Database (PlanetScale)
Configurer la connexion MySQL avec les credentials PlanetScale

## Structure de la base de données

### Users
- id (uuid)
- email (unique)
- password (hashed)
- role (admin/user)
- firstName
- lastName
- createdAt
- updatedAt

### Articles
- id (uuid)
- title
- content (text)
- sport
- imageUrl
- excerpt
- published (boolean)
- authorId (FK users)
- createdAt
- updatedAt

### Interviews
- id (uuid)
- sportifName
- sport
- questions (array)
- answers (array)
- audioUrl
- imageUrl
- published (boolean)
- createdAt

### Categories
- id (uuid)
- name (unique)
- slug (unique)
- description
- createdAt

## Développement

### Conventions de code
- Utiliser ESLint pour le linting
- Commits conventionnels (conventional commits)
- TypeScript pour le backend
- Composition API pour Vue.js

### Tests
```bash
# Backend tests
cd backend
npm run test
npm run test:e2e
```

## Licence

MIT
