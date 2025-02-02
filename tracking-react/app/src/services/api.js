/**
 * Fonction pour récupérer les coordonnées depuis l'API backend.
 * @returns {Promise<Array<{latitude: number, longitude: number}>>} 
 * Un tableau contenant les coordonnées valides sous forme d'objets `{ latitude, longitude }`
 */
export const fetchCoordinates = async () => {
  try {
    // Effectue une requête HTTP GET vers l'API pour récupérer les coordonnées
    // const response = await fetch("http://localhost:8000/api/coordinates");
    //https://player-dutp.vercel.app/api/api/coordinates
    const response = await fetch("https://player-dutp.vercel.app/api/api/coordinates");
    
    // Convertit la réponse en JSON
    const data = await response.json();

    // Convertit les valeurs de latitude et longitude en nombres et filtre les valeurs invalides
    return data.map(point => ({
      latitude: parseFloat(point.latitude), // Convertit en nombre flottant
      longitude: parseFloat(point.longitude), // Convertit en nombre flottant
    })).filter(point => !isNaN(point.latitude) && !isNaN(point.longitude)); // Supprime les points avec des valeurs non valides

  } catch (error) {
    // Capture et affiche toute erreur survenue lors de la requête
    console.error("Erreur lors de la récupération des coordonnées:", error);

    // Retourne un tableau vide en cas d'échec pour éviter les erreurs côté frontend
    return [];
  }
};
