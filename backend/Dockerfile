# Dockerfile pour le backend NestJS
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire le projet
RUN npm run build

# Exposer le port (par défaut 3000 pour NestJS)
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "start:prod"]
