/**
 * Fonction pour récupérer les coordonnées depuis l'API backend.
 * @returns {Promise<Array<{latitude: number, longitude: number}>>} 
 * Un tableau contenant les coordonnées valides sous forme d'objets `{ latitude, longitude }`
 */
export const fetchCoordinates = async () => {
  try {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"; // Utilisation de .env pour gérer les URLs

    const response = await fetch(`${API_URL}/api/coordinates`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`); // Gère les erreurs HTTP
    }

    const data = await response.json();

    // Vérifie si les données sont bien un tableau avant de les traiter
    if (!Array.isArray(data)) {
      throw new Error("Format de réponse invalide");
    }

    // Filtrage et conversion des valeurs en nombres
    return data
      .map(point => ({
        latitude: parseFloat(point.latitude),
        longitude: parseFloat(point.longitude),
      }))
      .filter(point => !isNaN(point.latitude) && !isNaN(point.longitude));

  } catch (error) {
    console.error("Erreur lors de la récupération des coordonnées:", error.message);
    return []; // Retourne un tableau vide en cas d'échec
  }
};
