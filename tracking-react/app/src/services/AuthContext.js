"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null); // ✅ Création correcte du contexte

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch("/api/user", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.id) {
                        setUser(data);
                    } else {
                        setUser(null);
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setUser(null);
                    setLoading(false);
                });
        } else {
            setUser(null);
            setLoading(false);
        }
    }, []);

    
    const API_URL = "http://127.0.0.1:8000/api"; // Change selon l'URL de ton backend Laravel

const login = async (email, password) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        localStorage.setItem("token", data.token);
        setUser(data.user);
        //router.push("/dashboard");
        router.push("/");
    } catch (error) {
        console.error("Login Error:", error.message);
        setError("Impossible de se connecter. Vérifiez vos identifiants.");
    }
};

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        //router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
 // ✅ Export séparé du contexte et du provider
