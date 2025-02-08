"use client";
import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

// Composant bouton amélioré avec effet au survol
const Button = ({ loading, children, disabled }) => (
    <button 
        type="submit" 
        disabled={disabled} 
        style={{ 
            width: '100%',
            padding: '12px',
            backgroundColor: disabled ? '#ccc' : '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: '0.3s'
        }}
    >
        {loading ? "Connexion en cours..." : children}
    </button>
);

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(email, password);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("⚠️ Identifiants incorrects. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            maxWidth: '400px', 
            margin: 'auto', 
            padding: '25px', 
            borderRadius: '8px', 
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
            backgroundColor: '#fff',
            textAlign: 'center'
        }}>
            <h2 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: 'bold' }}>
                🔐 Accès sécurisé à votre compte
            </h2>

            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', fontWeight: 'bold' }}>Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Entrez votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '4px', 
                            border: '1px solid #ddd',
                            fontSize: '14px'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', fontWeight: 'bold' }}>Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            borderRadius: '4px', 
                            border: '1px solid #ddd',
                            fontSize: '14px'
                        }}
                    />
                </div>

                {error && (
                    <p style={{
                        backgroundColor: '#ffe5e5', 
                        color: '#d9534f', 
                        padding: '10px', 
                        borderRadius: '4px', 
                        fontSize: '14px',
                        textAlign: 'center'
                    }}>
                        {error}
                    </p>
                )}

                <Button loading={loading} disabled={loading}>
                    Se connecter
                </Button>

                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    <a href="/forgot-password" style={{ color: '#007BFF', textDecoration: 'none' }}>
                        Mot de passe oublié ?
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
