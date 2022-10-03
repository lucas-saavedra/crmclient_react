import { Navigate, Outlet } from "react-router-dom"


const RedirectToHome = ({ user, redirectTo = "/" }) => {

    if (user) {
        return <Navigate to={redirectTo} />
    }
    return <Outlet />
}

export default RedirectToHome