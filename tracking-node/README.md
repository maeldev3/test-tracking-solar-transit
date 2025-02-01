#Version node 20

Microservice de Simulation de Déplacements avec Node.js & Express 🚀

Ce projet est un microservice Node.js utilisant Express et Axios pour simuler les déplacements aléatoires de 20 personnes et envoyer leurs coordonnées GPS à une API Laravel toutes les 5 secondes.

📌 Fonctionnalités

Génération de 20 utilisateurs avec des coordonnées initiales basées à Paris.

Simulation de déplacements aléatoires.

Envoi automatique des nouvelles coordonnées vers une API Laravel toutes les 5 secondes.

Journalisation des requêtes et des erreurs.

🛠️ Prérequis

Avant d'exécuter ce projet, assurez-vous d'avoir installé :

Node.js (version 16 ou supérieure recommandée)

NPM ou Yarn

Un serveur Laravel avec une route API disponible à http://localhost:8000/api/coordinates

🚀 Installation

Cloner le dépôt :

git clone https://github.com/maeldev3/test-tracking-solar-transit/tree/master/tracking-node
cd microservice-coordinates

Installer les dépendances :

npm install

📜 Configuration

Aucune configuration supplémentaire n'est requise. Assurez-vous que votre API Laravel écoute bien sur http://localhost:8000/api/coordinates.

▶️ Exécution du Microservice

Démarrez le serveur avec la commande :

node index.js

Si vous utilisez nodemon, vous pouvez lancer :

nodemon index.js

Une fois lancé, le microservice générera et enverra les coordonnées mises à jour toutes les 5 secondes.

🛠️ Personnalisation

Vous pouvez modifier le port utilisé en changeant la variable PORT dans index.js.

Pour augmenter ou diminuer le nombre d'utilisateurs simulés, ajustez Array.from({ length: 20 }, ...).

Pour modifier la fréquence d'envoi des coordonnées, changez la valeur de setInterval(..., 5000) (5000ms = 5s).

🐛 Débogage & Journalisation

En cas d'erreur d'envoi vers l'API Laravel, un message détaillé s'affichera dans la console.

Vérifiez que votre API Laravel est bien démarrée et accessible à l'URL correcte.

📜 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

📬 Contact

Si vous avez des questions ou des suggestions, n'hésitez pas à me contacter via maeldev3@gmail.comcom ou à créer une issue sur GitHub.

