"use client"; // Cette directive marque ce fichier comme un composant côté client

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { fetchCoordinates } from "../services/api";  // Import de l'API

/**
 * Définition du style du conteneur de la carte
 */
const containerStyle = {
  width: "100%",
  height: "600px",
};

/**
 * Coordonnées du centre de la carte (Paris par défaut)
 */
const center = { lat: 48.8566, lng: 2.3522 };

/**
 * Composant React affichant une carte Google Maps avec des marqueurs et une polyline.
 * 
 * - Récupère les coordonnées des points depuis l'API
 * - Affiche les marqueurs pour chaque point valide
 * - Trace une ligne entre les points pour visualiser le trajet
 * 
 * @component
 */
const MapComponent = () => {
  // État pour stocker les coordonnées récupérées
  const [coordinates, setCoordinates] = useState([]);
  
  // État pour gérer l'affichage du chargement
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Effet exécuté au montage du composant pour récupérer une seule fois les coordonnées
   */
  useEffect(() => {
    setIsLoading(true);
    
    fetchCoordinates()
      .then(data => {
        console.log("Coordonnées reçues :", data); // Log pour le débogage
        setCoordinates(data);
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, []); // Dépendances vides : exécute une seule fois au montage

  return (
    // AIzaSyDc2EYwF2-fYgEiKvK4etJL4EYnnP0AOkY
    //AIzaSyCXoLdAg0BR1MmE7cOd6z3euaJqYHaQz5c
    <LoadScript googleMapsApiKey="AIzaSyDc2EYwF2-fYgEiKvK4etJL4EYnnP0AOkY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {isLoading ? (
          <div>Chargement...</div>
        ) : (
          <>
            {/* Affichage des marqueurs uniquement pour les coordonnées valides */}
            {coordinates
              .filter(point => 
                typeof point.latitude === "number" &&
                typeof point.longitude === "number" &&
                !isNaN(point.latitude) &&
                !isNaN(point.longitude)
              )
              .map((point, index) => (
                <Marker key={index} position={{ lat: point.latitude, lng: point.longitude }} />
            ))}

            {/* Tracé de la polyline reliant les points valides */}
            <Polyline
              path={coordinates
                .filter(point => 
                  typeof point.latitude === "number" &&
                  typeof point.longitude === "number" &&
                  !isNaN(point.latitude) &&
                  !isNaN(point.longitude)
                )
                .map(point => ({ lat: point.latitude, lng: point.longitude }))}
              options={{ strokeColor: "red", strokeWeight: 2 }}
            />
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;




// "use client"; // Indique que ce fichier est exécuté côté client

// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { fetchCoordinates } from "../services/api"; // Import de l'API

// // Icône personnalisée pour Leaflet (car l'icône par défaut peut ne pas s'afficher correctement)
// const customIcon = new L.Icon({
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   iconSize: [25, 41], // Taille de l'icône
//   iconAnchor: [12, 41], // Point d'ancrage de l'icône
//   popupAnchor: [1, -34],
// });

// /**
//  * Composant React affichant une carte Leaflet avec des marqueurs et une polyline.
//  */
// const MapComponent = () => {
//   const [coordinates, setCoordinates] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Centre de la carte (Paris par défaut)
//   const center = [48.8566, 2.3522];

//   useEffect(() => {
//     setIsLoading(true);

//     fetchCoordinates()
//       .then((data) => {
//         console.log("Coordonnées reçues :", data);
//         setCoordinates(data);
//       })
//       .catch((error) => console.error(error))
//       .finally(() => setIsLoading(false));
//   }, []);

//   return (
//     <MapContainer center={center} zoom={14} style={{ width: "100%", height: "600px" }}>
//       {/* Fond de carte (tiles OpenStreetMap) */}
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       {!isLoading &&
//         coordinates
//           .filter(
//             (point) =>
//               typeof point.latitude === "number" &&
//               typeof point.longitude === "number" &&
//               !isNaN(point.latitude) &&
//               !isNaN(point.longitude)
//           )
//           .map((point, index) => (
//             <Marker key={index} position={[point.latitude, point.longitude]} icon={customIcon} />
//           ))}

//       {/* Tracé de la polyline */}
//       {!isLoading && (
//         <Polyline
//           positions={coordinates
//             .filter(
//               (point) =>
//                 typeof point.latitude === "number" &&
//                 typeof point.longitude === "number" &&
//                 !isNaN(point.latitude) &&
//                 !isNaN(point.longitude)
//             )
//             .map((point) => [point.latitude, point.longitude])}
//           color="red"
//         />
//       )}
//     </MapContainer>
//   );
// };

// export default MapComponent;

