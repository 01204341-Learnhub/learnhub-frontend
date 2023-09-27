import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { RootState } from "../store"

function ProtectedRoute() {
    const { user } = useSelector((state: RootState) => state.user)
    if (user) {
        return <Outlet />
    }
    return (
        <Navigate to="/login" />
    )
}

export default ProtectedRoute