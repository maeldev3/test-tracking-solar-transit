
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

/frontend                   # Contient l'application React
  /public                   # Fichiers statiques
  /src                      # Code source de l'application React
    /components             # Composants React
    /services               # Services (ex: API calls)
    App.js                  # Composant principal de l'application
  /package.json             # Dépendances NPM

/backend                    # Contient le projet Laravel
  /app                      # Code backend (contrôleurs, modèles)
  /database                 # Migrations et seeders
  /routes                   # Routes API (ex: api.php)
  composer.json             # Dépendances Laravel
  .env                      # Variables d'environnement (base de données, etc.)
