import { Outlet } from "react-router-dom"
import MainBar from "../components/MainBar"
function NavbarLayout() {
    return (
        <>
            <MainBar />
            <Outlet />
        </>
    )
}

export default NavbarLayout