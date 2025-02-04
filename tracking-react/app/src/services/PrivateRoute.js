import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    if (loading) return <p>Chargement...</p>;

    if (!user) {
        router.push("/login");
        return null;
    }

    return children;
};

export default PrivateRoute;
