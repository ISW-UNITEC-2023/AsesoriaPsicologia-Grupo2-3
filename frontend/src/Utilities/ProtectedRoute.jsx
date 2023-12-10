import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({cookies}) =>{
    if (!cookies || (Array.isArray(cookies) && cookies.length === 0) || Object.keys(cookies).length === 0) {
        return <Navigate to="/InicioSesion" replace />;
    }
 return <Outlet />;
}

export default ProtectedRoute;

