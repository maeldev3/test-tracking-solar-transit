// Importation des modules nécessaires
const express = require("express");  // Framework web pour Node.js
const axios = require("axios");      // Client HTTP pour effectuer des requêtes API

const app = express();               // Création de l'application Express
const PORT = 3001;                   // Définition du port d'écoute du serveur

const EARTH_RADIUS = 6371000; // Rayon moyen de la Terre en mètres

// Initialisation de 20 personnes avec des coordonnées de départ (Paris) et une direction aléatoire
let people = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,                       // Identifiant unique
    name: `Person ${i + 1}`,         // Nom générique
    lat: 48.8566,                    // Latitude initiale (Paris)
    lng: 2.3522,                     // Longitude initiale (Paris)
    direction: Math.random() * 360   // Direction de déplacement initiale en degrés
}));

/**
 * Génère une nouvelle position pour une personne en simulant un déplacement de 50 mètres.
 * @param {Object} person - Objet représentant une personne avec ses coordonnées et direction.
 */
function movePerson(person) {
    const distance = 50; // Distance en mètres
    const directionRad = (person.direction * Math.PI) / 180; // Convertir la direction en radians

    // Calcul du déplacement en latitude et longitude
    const deltaLat = (distance / EARTH_RADIUS) * Math.cos(directionRad);
    const deltaLng = (distance / EARTH_RADIUS) * Math.sin(directionRad) / Math.cos(person.lat * Math.PI / 180);

    // Mise à jour des coordonnées
    person.lat += deltaLat * (180 / Math.PI);
    person.lng += deltaLng * (180 / Math.PI);

    // Variation légère de la direction pour simuler un mouvement plus réaliste
    person.direction += (Math.random() * 20 - 10); // Variation entre -10° et +10°
}

/**
 * Fonction de mise à jour des positions et d'envoi des coordonnées vers l'API Laravel.
 * Cette fonction est exécutée toutes les 5 secondes pour simuler des déplacements en temps réel.
 */
setInterval(() => {
    people.forEach(person => {
        movePerson(person); // Met à jour la position de la personne

        // Envoi des nouvelles coordonnées à l'API Laravel
        axios.post("http://localhost:8000/api/coordinates", {
            id: person.id,
            name: person.name,
            latitude: person.lat,
            longitude: person.lng,
            timestamp: new Date().toISOString() // Timestamp ISO 8601
        })
        .then(response => {
            console.log(`Coordonnée envoyée avec succès pour ${person.name}:`, response.data);
        })
        .catch(err => {
            console.error(`Erreur d'envoi pour ${person.name}:`, err.response ? err.response.data : err.message);
        });
    });
}, 5000); // Intervalle de 5 secondes

// Démarrage du serveur Express
app.listen(PORT, () => console.log(`Microservice en cours d'exécution sur le port ${PORT}`));
