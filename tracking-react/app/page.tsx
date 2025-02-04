// import React from "react";
// import MapComponent from "../app/src/components/Map";

// function App() {
//   return (
//     <div className="app">
//       <h1>Suivi en Temps Réel</h1>
//       <MapComponent />
//     </div>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from '../app/src/services/AuthContext';
// import PrivateRoute from '../app/src/services/PrivateRoute';
// import Login from '../app/src/services/Login';
// import Dashboard from '../app/src/services/Dashboard';

// function App() {
//     return (
//         <AuthProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//                 </Routes>
//             </Router>
//         </AuthProvider>
//     );
// }

// export default App;


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from '../app/src/services/AuthContext';
// import PrivateRoute from '../app/src/services/PrivateRoute';
// import Login from '../app/src/services/Login';
// import Dashboard from '../app/src/services/Dashboard';

// function App() {
//     return (
//         <AuthProvider>
//             <Router>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//                 </Routes>
//             </Router>
//         </AuthProvider>
//     );
// }

// export default App;


// "use client"; // Assure que c'est un Client Component
// import { AuthProvider } from '../app/src/services/AuthContext';
// import PrivateRoute from '../app/src/services/PrivateRoute';
// import Login from '../app/src/services/Login';
// import Dashboard from '../app/src/services/Dashboard';
// import { usePathname } from "next/navigation"; // Next.js gère les routes différemment


// function App() {
//     const pathname = usePathname(); // Récupère l'URL actuelle

//     return (
//         <AuthProvider>
//             {pathname === "/login" && <Login />}
//             {pathname === "/dashboard" && <PrivateRoute><Dashboard /></PrivateRoute>}
//         </AuthProvider>
//     );
// }

// export default App;

// "use client";
// // import { AuthProvider } from "../app/src/services/AuthContext";
// import PrivateRoute from "../app/src/services/PrivateRoute";
// import Login from "../app/src/services/Login";
// import Dashboard from "../app/src/services/Dashboard";
// import { useRouter } from "next/navigation";
// import { useContext, useEffect } from "react";
// // import AuthContext from "../app/src/services/AuthContext";
// // import { AuthContext } from "../app/src/services/AuthContext"; // ✅ Corrigé
// import { AuthProvider, AuthContext } from "../app/src/services/AuthContext";


// function App() {
//     const { user, loading } = useContext(AuthContext);
//     const router = useRouter();

//     useEffect(() => {
//         if (!loading) {
//             if (!user) {
//                 router.push("/login");
//             } else {
//                 router.push("/dashboard");
//             }
//         }
//     }, [user, loading, router]);

//     return (
//         <AuthProvider>
//             <Login />
//             <PrivateRoute>
//                 <Dashboard />
//             </PrivateRoute>
//         </AuthProvider>
//     );
// }

// export default App;


"use client";
import { AuthProvider } from "../app/src/services/AuthContext"; 
import PrivateRoute from "../app/src/services/PrivateRoute";
import Login from "../app/src/services/Login";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "../app/src/services/AuthContext";
import { useRouter } from "next/navigation";

function MainContent() {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    if (loading) return <p>Chargement...</p>;

    return user ? (
        <PrivateRoute>
            <Dashboard />
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
