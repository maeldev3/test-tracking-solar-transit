/**
 * Fonction pour récupérer les coordonnées depuis l'API backend.
 * @returns {Promise<Array<{user_id: number, latitude: number, longitude: number}>>} 
 * Un tableau contenant les coordonnées valides sous forme d'objets `{ user_id, latitude, longitude }`
 */
export const fetchCoordinates = async () => {
  try {
    // Définition de l'URL de l'API à partir des variables d'environnement ou d'une valeur par défaut
    const API_URL = process.env.REACT_APP_API_URL || "https://player-dutp.vercel.app/api";

    // Envoi d'une requête GET à l'API pour récupérer les coordonnées
    const response = await fetch(`${API_URL}/api/coordinates`);
    
    // Vérification de la réponse HTTP (si le statut est autre que 200, on lève une erreur)
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Conversion de la réponse en JSON
    const data = await response.json();

    // Vérifie si les données reçues sont bien sous forme de tableau
    if (!Array.isArray(data)) {
      throw new Error("Format de réponse invalide");
    }

    // Transformation et filtrage des données
    return data
      .map(point => ({
        user_id: point.user_id, // Ajout de l'ID utilisateur pour le filtrage
        latitude: parseFloat(point.latitude), // Conversion en nombre flottant
        longitude: parseFloat(point.longitude), // Conversion en nombre flottant
      }))
      .filter(point => !isNaN(point.latitude) && !isNaN(point.longitude)); // Suppression des valeurs invalides

  } catch (error) {
    // Gestion des erreurs et affichage dans la console
    console.error("Erreur lors de la récupération des coordonnées:", error.message);
    return []; // Retourne un tableau vide en cas d'échec
  }
};
