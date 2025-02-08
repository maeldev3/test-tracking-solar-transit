const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3001;
const EARTH_RADIUS = 6371000; // Rayon moyen de la Terre en mètres

// Liste des utilisateurs pré-existants
let people = [
    { id: 1, name: "Admin User", lat: 48.8566, lng: 2.3522, direction: Math.random() * 360 },
    { id: 2, name: "John Doe", lat: 48.8566, lng: 2.3522, direction: Math.random() * 360 },
    { id: 3, name: "Alice Smith", lat: 48.8566, lng: 2.3522, direction: Math.random() * 360 },
    { id: 4, name: "Bob Johnson", lat: 48.8566, lng: 2.3522, direction: Math.random() * 360 }
];

/**
 * Génère une nouvelle position en simulant un déplacement aléatoire dans un rayon de 50m
 * @param {Object} person - Objet représentant une personne
 */
function movePerson(person) {
    const maxDistance = 50; // Déplacement max de 50m
    const randomDistance = Math.random() * maxDistance; // Génère une distance aléatoire entre 0 et 50m
    const directionRad = (person.direction * Math.PI) / 180; // Convertir la direction en radians

    const deltaLat = (randomDistance / EARTH_RADIUS) * Math.cos(directionRad);
    const deltaLng = (randomDistance / EARTH_RADIUS) * Math.sin(directionRad) / Math.cos(person.lat * Math.PI / 180);

    person.lat += deltaLat * (180 / Math.PI);
    person.lng += deltaLng * (180 / Math.PI);

    // Variation aléatoire de la direction entre -10° et +10°
    person.direction += Math.random() * 20 - 10;

    console.log(`ID: ${person.id}, Lat: ${person.lat.toFixed(6)}, Lng: ${person.lng.toFixed(6)}, Direction: ${person.direction.toFixed(2)}`);
}

/**
 * Vérifie si l'utilisateur existe et envoie ses coordonnées à l'API Laravel
 * @param {Object} person - Objet représentant une personne
 */
async function sendCoordinates(person) {
    try {
        const checkResponse = await axios.post("http://localhost:8000/api/check-user", {
            name: person.name
        });

        if (checkResponse.data.exists) {
            const user = checkResponse.data.user;
            console.log(`✅ Utilisateur trouvé: ${user.name}, ID: ${user.id}, Rôle: ${user.role}`);

            await axios.post("http://localhost:8000/api/coordinates", {
                user_id: user.id,
                name: user.name,
                role: user.role,
                latitude: Number(person.lat.toFixed(6)),
                longitude: Number(person.lng.toFixed(6)),
                timestamp: new Date().toISOString()
            });

            console.log(`📍 Coordonnées envoyées pour ${person.name}`);
        } else {
            console.log(`⚠️ Utilisateur ${person.name} non trouvé, données non envoyées.`);
        }
    } catch (err) {
        console.error(`❌ Erreur pour ${person.name}:`, err.response ? err.response.data : err.message);
    }
}

// Mise à jour des positions et envoi des données toutes les 5 secondes
setInterval(() => {
    people.forEach(person => {
        movePerson(person);
        sendCoordinates(person);
    });
}, 5000);

app.listen(PORT, () => console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`));

