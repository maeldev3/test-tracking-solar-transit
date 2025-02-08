"use client";
import { AuthProvider } from "../app/src/services/AuthContext";
import PrivateRoute from "../app/src/services/PrivateRoute";
import Login from "../app/src/services/Login";
import Dashboard from "./dashboard";
import { useContext } from "react";
import { AuthContext } from "../app/src/services/AuthContext";
import { useRouter } from "next/navigation";
import MapComponent from "../app/src/components/Map";

function MainContent() {
    const { user, loading, logout } = useContext(AuthContext);
    const router = useRouter();

    if (loading) return <p>Chargement...</p>;

    return user ? (
        <PrivateRoute>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h1>Bienvenue, {user ? user.name : "Utilisateur"}</h1>
                <button 
                    onClick={() => {
                        logout();
                        window.location.reload(); // Rafraîchir la page après la déconnexion

                        //router.push("/login"); // Rediriger vers la page de connexion après déconnexion
                    }}
                    style={{ padding: "8px 12px", background: "red", color: "white", border: "none", cursor: "pointer" }}
                >
                    Déconnexion
                </button>
            </div>
            <MapComponent />
            {/* <Dashboard /> */}
        </PrivateRoute>
    ) : (
        <Login />
    );
}

export default function App() {
    return (
        <AuthProvider>
            <MainContent />
        </AuthProvider>
    );
}
