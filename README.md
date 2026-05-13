# Blog123 — Blog Sportif

Application web full-stack pour publier et consulter des articles sportifs (football, basketball, tennis, rugby, F1, MMA…). Frontend Vue 3 + backend NestJS + MySQL, le tout conteneurisé avec Docker.

## Architecture

```
blog123/
├── frontend/             # Application Vue 3 (Vite)
│   ├── src/
│   │   ├── components/   # Header, Footer, ArticleCard…
│   │   ├── views/        # HomeView, SportView, ArticleView, AboutView, ContactView, AdminView
│   │   ├── router/       # Vue Router
│   │   ├── stores/       # Pinia (articles)
│   │   └── services/     # Clients API (articles, admin, contact…)
│   ├── public/assets/    # Images, audio, logo
│   ├── Dockerfile        # Build statique servi par nginx
│   └── nginx.conf
│
├── backend/              # API NestJS
│   └── src/
│       ├── articles/     # CRUD articles
│       ├── auth/         # JWT + Passport (local + jwt)
│       ├── users/        # Utilisateurs
│       ├── categories/   # Catégories (sports)
│       ├── interviews/   # Interviews (audio MP3 inclus)
│       ├── comments/     # Commentaires sur articles
│       ├── contact/      # Formulaire de contact (envoi mail)
│       └── database/     # Seed + config
│
├── docs/                 # Ancienne version statique (archivée)
├── docker-compose.yml    # Stack frontend + backend + MySQL
└── package.json          # Scripts orchestrant frontend & backend
```

## Technologies

### Frontend
- **Vue 3** (Composition API) + **Vite**
- **Vue Router** — routage SPA
- **Pinia** — gestion d'état
- **Tailwind CSS** + CSS scoped Vue
- **Axios** — client HTTP
- Polices : Oswald (titres) & Source Sans 3 (texte)
- Design responsive (desktop ≥ 1280px, tablette, mobile, très petit mobile)

### Backend
- **NestJS** 10 (modules par domaine)
- **TypeORM** + **MySQL 8**
- **JWT** + **Passport** (stratégies `local` & `jwt`)
- **bcryptjs** — hash des mots de passe
- **Nodemailer** — envoi des messages du formulaire de contact
- **Multer** — uploads (audio interviews)
- **class-validator** / **class-transformer** — DTO validation

### Infra
- **Docker / docker-compose** — orchestration (backend Nest, frontend nginx, MySQL)
- **Woodpecker CI** — pipeline (`.woodpecker.yml`)

## Installation

### Prérequis
- Node.js 18+
- MySQL 8+ (ou Docker)
- npm

### Installation rapide

```bash
# Installe les dépendances root + frontend + backend
npm run install:all
```

### Installation manuelle

```bash
npm install                  # racine (concurrently)
cd frontend && npm install   # frontend Vue
cd ../backend && npm install # backend Nest
```

## Configuration

Créer un fichier `.env` à la racine (utilisé par Docker compose et par le backend) :

```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=blog123
DB_SYNCHRONIZE=true

# MySQL (Docker)
MYSQL_ROOT_PASSWORD=your_password
MYSQL_DATABASE=blog123

# JWT
JWT_SECRET=change-me-in-production
JWT_EXPIRES_IN=7d

# Frontend (CORS)
FRONTEND_URL=http://localhost:5173

# SMTP (formulaire de contact)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=app_password
CONTACT_EMAIL=destination@email.com
```

Créer la base si vous lancez MySQL en local :

```sql
CREATE DATABASE blog123;
```

## Démarrage

### Développement (front + back en parallèle)

```bash
npm run dev
```

- Frontend : http://localhost:5173
- Backend  : http://localhost:3000/api

Ou séparément :

```bash
npm run dev:frontend
npm run dev:backend
```

### Production

```bash
npm run build              # build frontend + backend
cd backend && npm run start:prod
cd frontend && npm run preview   # ou servir dist/ via nginx
```

### Docker (tout-en-un)

```bash
docker compose up -d --build
```

- Frontend (nginx)  → http://localhost
- Backend (Nest)    → réseau interne
- MySQL             → 127.0.0.1:3306 (exposé en local seulement)

### Seed des données initiales

```bash
cd backend
npm run seed
```

## API Endpoints

### Auth
- `POST /api/auth/register` — créer un compte
- `POST /api/auth/login` — se connecter (retourne un JWT)

### Articles
- `GET /api/articles` — liste (filtrable par catégorie)
- `GET /api/articles/:id` — détail
- `POST /api/articles` — créer 🔒
- `PATCH /api/articles/:id` — modifier 🔒
- `DELETE /api/articles/:id` — supprimer 🔒

### Catégories
- `GET /api/categories` — liste
- `GET /api/categories/:id` — détail
- `POST /api/categories` — créer 🔒
- `DELETE /api/categories/:id` — supprimer 🔒

### Interviews
- `GET /api/interviews` — liste (filtrable par sport)
- `GET /api/interviews/:id` — détail
- `POST /api/interviews` — créer 🔒
- `PATCH /api/interviews/:id` — modifier 🔒
- `DELETE /api/interviews/:id` — supprimer 🔒

### Commentaires
- `GET /api/comments?articleId=…` — liste pour un article
- `POST /api/comments` — ajouter un commentaire
- `DELETE /api/comments/:id` — supprimer 🔒

### Utilisateurs
- `GET /api/users` — liste 🔒
- `GET /api/users/:id` — détail 🔒

### Contact
- `POST /api/contact` — envoyer un message (formulaire public)

🔒 = nécessite un JWT valide.

## Fonctionnalités principales

- **Hero dynamique** sur la page d'accueil avec article mis en avant
- **Navigation par sport** avec filtres
- **Recherche globale** (overlay avec résultats live)
- **Articles** avec image, extrait, contenu HTML, vidéo YouTube embarquée et audio MP3
- **Page interviews** avec lecteur audio
- **Formulaire de contact** branché à SMTP
- **Espace admin** (`/admin`) — login JWT, CRUD articles & catégories
- **Newsletter** (UI seule pour l'instant)
- **Design responsive** complet (desktop / tablette / mobile / petit mobile) avec menu hamburger

## Structure de la base de données

### Users
`id (uuid)`, `email (unique)`, `password (hashed)`, `role (admin/user)`, `firstName`, `lastName`, `createdAt`, `updatedAt`

### Articles
`id (uuid)`, `title`, `content (text)`, `excerpt`, `imageUrl`, `videoUrl` (iframe YouTube), `audioUrl`, `categoryId (FK)`, `authorId (FK)`, `published`, `createdAt`, `updatedAt`

### Categories
`id (uuid)`, `name (unique)`, `slug (unique)`, `description`, `createdAt`

### Interviews
`id (uuid)`, `sportifName`, `sport`, `questions[]`, `answers[]`, `audioUrl`, `imageUrl`, `published`, `createdAt`

### Comments
`id (uuid)`, `articleId (FK)`, `author`, `email`, `content`, `createdAt`

## Conventions

- **Frontend** : Composition API Vue 3, CSS scoped par composant, breakpoints 1280 / 1024 / 768 / 480 / 420.
- **Backend** : un module par domaine, DTO avec `class-validator`, guards JWT sur les routes protégées.
- **Commits** : conventionnels (`feat:`, `fix:`, `chore:`…).
- **Lint** : ESLint côté front et back (`npm run lint`).

## Tests

```bash
cd backend
npm run test          # unit
npm run test:e2e      # end-to-end
npm run test:cov      # coverage
```

## Licence

MIT
