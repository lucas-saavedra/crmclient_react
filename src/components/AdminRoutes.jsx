import { Navigate, Outlet } from "react-router-dom"


const AdminRoutes = ({ user, redirectTo = "/", isAllowed }) => {

    if (!user || !isAllowed) {
        return <Navigate to={redirectTo} />
    }
    return <Outlet />
}

export default AdminRoutes