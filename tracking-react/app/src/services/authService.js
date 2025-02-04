import api from './api';

// export const login = async (email, password) => {
//     const response = await api.post('/login', { email, password });
//     localStorage.setItem('token', response.data.token);
//     return response.data;
// };


export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Erreur de réponse de l'API (par exemple, 400, 401, etc.)
            console.error("API Error:", error.response.data.message || "Erreur inconnue");
        } else if (error.request) {
            // L'API n'a pas répondu
            console.error("Aucune réponse du serveur:", error.request);
        } else {
            // Autres erreurs
            console.error("Erreur de requête:", error.message);
        }
        throw error;
    }
};


export const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        await api.post('/logout', {}, { headers: { Authorization: `Bearer ${token}` } });
        localStorage.removeItem('token');
    }
};

export const getUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
        const response = await api.get('/user', { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
};
