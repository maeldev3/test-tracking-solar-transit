"use client";
import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Vérifie que le chemin est correct

// Composant pour le bouton avec états
const Button = ({ loading, children, disabled }) => (
    <button type="submit" disabled={disabled} style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: disabled ? 'not-allowed' : 'pointer' }}>
        {loading ? (
            <span>Loading...</span> // Remplacer par un spinner si nécessaire
        ) : (
            children
        )}
    </button>
);

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Pour afficher les erreurs
    const [loading, setLoading] = useState(false); // Pour afficher un indicateur de chargement

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Active le chargement
        setError(""); // Réinitialise l'erreur

        try {
            await login(email, password); // Attends la connexion
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Les identifiants sont incorrects. Veuillez réessayer.");
        } finally {
            setLoading(false); // Désactive le chargement
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Entrez votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                
                {error && <p style={{ color: "red", fontSize: '14px', marginBottom: '10px' }}>{error}</p>} {/* Affichage de l'erreur */}

                <Button loading={loading} disabled={loading}>
                    Se connecter
                </Button>
            </form>
        </div>
    );
};

export default Login;
