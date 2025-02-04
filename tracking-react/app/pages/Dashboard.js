import React, { useContext } from "react";
// import { AuthContext } from "./AuthContext";
import { AuthContext } from "../src/services/AuthContext";


const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div>
            <h1>Bienvenue, {user ? user.name : "Utilisateur"}</h1>
            <button onClick={logout}>Déconnexion</button>
        </div>
    );
};

export default Dashboard;
