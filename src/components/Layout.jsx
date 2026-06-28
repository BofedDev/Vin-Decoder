import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <>
            <header>
                <nav>
                    <span className="nav-logo">VIN Decoder</span>
                    <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
                        Decode
                    </NavLink>
                    <NavLink to="/variables" className={({ isActive }) => isActive ? "active" : ""}>
                        Variables
                    </NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout