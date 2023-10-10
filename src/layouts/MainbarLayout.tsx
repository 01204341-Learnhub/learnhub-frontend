import { Outlet } from "react-router-dom"
import MainBar from "../components/MainBar"
function MainbarLayout() {
    return (
        <>
            <MainBar />
            <hr className="h-[100px]"/>
            <Outlet />
        </>
    )
}

export default MainbarLayout