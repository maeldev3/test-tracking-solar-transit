"use client";

import React, { useEffect, useState, useContext } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { fetchCoordinates } from "../services/fetchCoordinates";
import { AuthContext } from "../services/AuthContext"; // Importer le contexte d'authentification

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = { lat: 48.8566, lng: 2.3522 };

const MapComponent = () => {
  const { user } = useContext(AuthContext); // Récupérer l'utilisateur connecté
  const [coordinates, setCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    fetchCoordinates()
      .then(data => {
        console.log("Coordonnées reçues :", data);
        setCoordinates(data);
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  // 🔹 Filtrer les données en fonction du rôle
  const filteredCoordinates = user?.role === "admin"
    ? coordinates // L'admin voit tout
    : coordinates.filter(point => point.user_id === user?.id); // Un utilisateur voit seulement ses propres positions

  return (
    <LoadScript googleMapsApiKey="AIzaSyDc2EYwF2-fYgEiKvK4etJL4EYnnP0AOkY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {isLoading ? (
          <div>Chargement...</div>
        ) : (
          <>
            {filteredCoordinates.map((point, index) => (
              <Marker key={index} position={{ lat: point.latitude, lng: point.longitude }} />
            ))}

            <Polyline
              path={filteredCoordinates.map(point => ({ lat: point.latitude, lng: point.longitude }))}
              options={{ strokeColor: "red", strokeWeight: 2 }}
            />
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
