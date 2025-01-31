
git clone https://github.com/maeldev3/test-tracking-solar-transit/tree/master/tracking-backend
cd votre-repo/api-laravel



composer install
cp .env.example .env
php artisan key:generate


DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nom_de_votre_bdd
DB_USERNAME=nom_utilisateur
DB_PASSWORD=mot_de_passe


php artisan migrate


php artisan serve

 Endpoints de l'API Laravel

➤ Enregistrer une coordonnée GPS

Méthode : POST

URL : /api/coordinates

Body :

{
  "name": "John Doe",
  "latitude": 48.8566,
  "longitude": 2.3522
}

Réponse :

{
  "message": "Coordonnée enregistrée"
}

➤ Récupérer toutes les coordonnées enregistrées

Méthode : GET

URL : /api/coordinates

Réponse :

[
  {
    "id": 1,
    "name": "John Doe",
    "latitude": 48.8566,
    "longitude": 2.3522,
    "timestamp": "2024-08-06T14:30:00Z",
    "created_at": "2024-08-06T14:30:00Z",
    "updated_at": "2024-08-06T14:30:00Z"
  }
]

📌 Fonctionnalités

📍 Suivi des déplacements en temps réel

🛠️ API RESTful en Laravel

🚀 Microservice en Node.js (Express)

🔄 Simule des mouvements GPS toutes les 5 secondes



Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

📧 Contact : maeldev3@gmail.com