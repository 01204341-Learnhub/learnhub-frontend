import { Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Login from "../pages/Login";

function ProtectedRoute() {
    const { user } = useUser()
    if (user) return <Outlet />
    return <Login />
}

export default ProtectedRoute