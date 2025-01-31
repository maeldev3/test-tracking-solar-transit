const express = require("express");
const axios = require("axios");

const app = express();
// const PORT = 3000;
const PORT = 3001; // Nouveau port
let people = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    lat: 48.8566,  
    lng: 2.3522,
    direction: Math.random() * 360
}));

function generateRandomCoordinate(person) {
    let angle = person.direction + (Math.random() * 10 - 5);
    let distance = Math.random() * 0.0005; // 50 mètres
    
    person.lat += distance * Math.cos(angle);
    person.lng += distance * Math.sin(angle);
    person.direction = angle;
}

setInterval(() => {
    people.forEach(person => {
        generateRandomCoordinate(person);
      axios.post("http://localhost:8000/api/coordinates", {
            id: person.id,
            name: person.name,
            latitude: person.lat,
            longitude: person.lng,
            timestamp: new Date().toISOString()
        })
        .then(response => {
            console.log("Coordonnée envoyée avec succès :", response.data);
        })
        .catch(err => {
            console.error("Erreur d'envoi :", err.response ? err.response.data : err.message);
        });


    });
}, 5000); // Envoi toutes les 5 secondes

app.listen(PORT, () => console.log(`Microservice en cours sur le port ${PORT}`));
