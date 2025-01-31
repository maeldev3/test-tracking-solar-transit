



// "use client"; // Cette directive marque ce fichier comme un composant côté client

// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
// import { fetchCoordinates } from "../services/api";  // Import de l'API

// const containerStyle = {
//   width: "100%",
//   height: "600px",
// };

// const center = { lat: 48.8566, lng: 2.3522 }; // Coordonnées par défaut (Paris)

// const MapComponent = () => {
//   const [coordinates, setCoordinates] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Effectuer la récupération des coordonnées
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsLoading(true);
//       fetchCoordinates()
//         .then(data => {
//           setCoordinates(data);
//         })
//         .catch(error => console.error(error))
//         .finally(() => setIsLoading(false));
//     }, 5000); // Mise à jour toutes les 5 secondes

//     return () => clearInterval(interval); // Nettoyage de l'intervalle
//   }, []);

//   return (
//     <LoadScript googleMapsApiKey="VOTRE_CLE_API">
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
//         {isLoading ? (
//           <div>Chargement...</div>
//         ) : (
//           <>
//             {coordinates.map((point, index) => (
//               <Marker key={index} position={{ lat: point.latitude, lng: point.longitude }} />
//             ))}

//             <Polyline
//               path={coordinates.map(point => ({ lat: point.latitude, lng: point.longitude }))}
//               options={{ strokeColor: "red", strokeWeight: 2 }}
//             />
//           </>
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;




//partie left left

// "use client"; // Cette directive marque ce fichier comme un composant côté client

// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet"; // Importation de Leaflet
// import { fetchCoordinates } from "../services/api";  // Import de l'API
// import L from "leaflet"; // Importation de Leaflet pour personnaliser les marqueurs

// const containerStyle = {
//   width: "100%",
//   height: "600px",
// };

// const center = { lat: 48.8566, lng: 2.3522 }; // Coordonnées par défaut (Paris)

// const MapComponent = () => {
//   const [coordinates, setCoordinates] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Effectuer la récupération des coordonnées
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsLoading(true);
//       fetchCoordinates()
//         .then(data => {
//           setCoordinates(data);
//         })
//         .catch(error => console.error(error))
//         .finally(() => setIsLoading(false));
//     }, 5000); // Mise à jour toutes les 5 secondes

//     return () => clearInterval(interval); // Nettoyage de l'intervalle
//   }, []);

//   return (
//     <MapContainer center={center} zoom={14} style={containerStyle}>
//       {/* Utilisation d'OpenStreetMap comme couche de fond */}
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />

//       {isLoading ? (
//         <div>Chargement...</div>
//       ) : (
//         <>
//           {coordinates.map((point, index) => (
//             <Marker
//               key={index}
//               position={{ lat: point.latitude, lng: point.longitude }}
//               icon={new L.Icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png" })}
//             />
//           ))}

//           <Polyline
//             positions={coordinates.map(point => ({ lat: point.latitude, lng: point.longitude }))}
//             color="red"
//             weight={2}
//           />
//         </>
//       )}
//     </MapContainer>
//   );
// };

// export default MapComponent;


"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import { fetchCoordinates } from "../services/api";
import L from "leaflet";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = { lat: 48.8566, lng: 2.3522 }; // Paris

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapUpdater = ({ coordinates }) => {
  const map = useMap();
  useEffect(() => {
    if (coordinates.length > 0) {
      const bounds = L.latLngBounds(coordinates.map((point) => [point.latitude, point.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coordinates, map]);
  return null;
};

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCoordinates();
        setCoordinates(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des coordonnées :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Mise à jour toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={defaultCenter} zoom={14} style={containerStyle} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {coordinates.length > 0 && <MapUpdater coordinates={coordinates} />}

      {coordinates.map((point, index) => (
        <Marker key={index} position={[point.latitude, point.longitude]} icon={customIcon} />
      ))}

      {coordinates.length > 1 && (
        <Polyline
          positions={coordinates.map((point) => [point.latitude, point.longitude])}
          color="red"
          weight={3}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;