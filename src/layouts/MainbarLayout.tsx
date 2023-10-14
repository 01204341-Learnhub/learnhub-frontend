import { Outlet, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import MainBar from "../components/MainBar"
import { useUser } from "../hooks/useUser"
function MainbarLayout() {
    const { user } = useUser()
    const navigate = useNavigate()
    if (!user) {
        Swal.fire({
            title: 'คุณยังไม่ได้เข้าสู่ระบบ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'เข้าสู่ระบบ',
            cancelButtonText: 'สมัครบัญชี',
            showCloseButton: true,
        }).then((reslt) => {
            if (reslt.isDismissed) {
                navigate('/', { replace: true })
            }
            if (reslt.isConfirmed) {
                navigate('/login', { replace: true })
            } else if (reslt.dismiss === Swal.DismissReason.cancel) {
                navigate('/register', { replace: true })
            }
        })
    }
    return (
        <>
            <MainBar />
            <hr className="h-[100px]" />
            <Outlet />
        </>
    )
}

export default MainbarLayout