"use client"; // Cette directive marque ce fichier comme un composant côté client

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet"; // Importation de Leaflet
import { fetchCoordinates } from "../services/api";  // Import de l'API
import L from "leaflet"; // Importation de Leaflet pour personnaliser les marqueurs

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = { lat: 48.8566, lng: 2.3522 }; // Coordonnées par défaut (Paris)

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effectuer la récupération des coordonnées
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      fetchCoordinates()
        .then(data => {
          setCoordinates(data);
        })
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false));
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  return (
    <MapContainer center={center} zoom={14} style={containerStyle}>
      {/* Utilisation d'OpenStreetMap comme couche de fond */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {isLoading ? (
        <div>Chargement...</div>
      ) : (
        <>
          {coordinates.map((point, index) => (
            <Marker
              key={index}
              position={{ lat: point.latitude, lng: point.longitude }}
              icon={new L.Icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" })}
            />
          ))}

          <Polyline
            positions={coordinates.map(point => ({ lat: point.latitude, lng: point.longitude }))}
            color="red"
            weight={2}
          />
        </>
      )}
    </MapContainer>
  );
};

export default MapComponent;
