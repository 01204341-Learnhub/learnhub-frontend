import { Outlet } from "react-router-dom"
import MainBar from "../components/MainBar"
function MainbarLayout() {
    return (
        <>
            <MainBar />
            <hr style={{ height: 2, color: "gray", backgroundColor: "gray" }} />
            <Outlet />
        </>
    )
}

export default MainbarLayout