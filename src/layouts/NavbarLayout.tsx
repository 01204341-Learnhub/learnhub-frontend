import { Outlet } from "react-router-dom"
import MainBar from "../components/MainBar"
function NavbarLayout() {
    return (
        <>
            <MainBar />
            <hr style={{ height: 2, color: "gray", backgroundColor: "gray" }} />
            <Outlet />
        </>
    )
}

export default NavbarLayout