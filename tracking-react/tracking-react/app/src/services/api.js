


import axios from "axios";

// Remplace l'URL par ton endpoint d'API OpenStreetMap si nécessaire
// const API_URL = "http://localhost:8000/api/coordinates"; 

// Fonction pour récupérer les coordonnées
// export const fetchCoordinates = async () => {
//   try {
//       const response = await axios.get(API_URL);
//       console.log('response.data', response.data);
//     return response.data;  // Assurez-vous que la réponse a le bon format pour correspondre à votre structure
//   } catch (error) {
//     console.error("Erreur lors de la récupération des coordonnées", error);
//     throw error;
//   }
// };

export const fetchCoordinates = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/coordinates"); // Modifier l'URL pour correspondre à votre backend
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur de fetch :", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};

