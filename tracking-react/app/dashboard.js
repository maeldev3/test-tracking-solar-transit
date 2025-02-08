import React, { useContext } from "react";
import { AuthContext } from "./src/services/AuthContext";
 import MapComponent from "../app/src/components/Map";


const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <h1>Bienvenue, {user ? user.name : "Utilisateur"}</h1>
        <button onClick={logout} style={{ padding: "8px 12px", background: "red", color: "white", border: "none", cursor: "pointer" }}>
          Déconnexion
        </button>
        <MapComponent />
      </div>
    );
};

export default Dashboard;
