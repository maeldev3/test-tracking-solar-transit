



"use client"; // Cette directive marque ce fichier comme un composant côté client

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { fetchCoordinates } from "../services/api";  // Import de l'API

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
    <LoadScript googleMapsApiKey="AIzaSyCXoLdAg0BR1MmE7cOd6z3euaJqYHaQz5c">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {isLoading ? (
          <div>Chargement...</div>
        ) : (
          <>
            {coordinates.map((point, index) => (
              <Marker key={index} position={{ lat: point.latitude, lng: point.longitude }} />
            ))}

            <Polyline
              path={coordinates.map(point => ({ lat: point.latitude, lng: point.longitude }))}
              options={{ strokeColor: "red", strokeWeight: 2 }}
            />
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;






