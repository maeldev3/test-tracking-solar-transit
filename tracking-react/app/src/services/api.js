

import axios from "axios";

const API_URL = "https://player-dutp.vercel.app/api/api";

const api = axios.create({
    baseURL: API_URL,
    // withCredentials: true, // Utile pour les cookies JWT
    headers: { "Content-Type": "application/json" },
});

// Ajout automatique du token aux requêtes
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Gestion globale des erreurs pour éviter les crashs
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erreur API:", error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

export default api;
