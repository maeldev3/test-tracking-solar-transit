// import { useContext } from "react";
// import { AuthContext } from "./AuthContext";
// import { useRouter } from "next/navigation";

// const PrivateRoute = ({ children }) => {
//     const { user, loading } = useContext(AuthContext);
//     const router = useRouter();

//     if (loading) return <p>Chargement...</p>;

//     if (!user) {
//         router.push("/login");
//         return null;
//     }

//     return children;
// };

// export default PrivateRoute;


"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (!loading && !user) {
            router.replace("/login"); // Utilise replace au lieu de push
        }
    }, [user, loading, router]);

    if (!isClient || loading) return <p>Chargement...</p>;

    if (!user) return null; // Évite de rendre le contenu avant la redirection

    return children;
};

export default PrivateRoute;
