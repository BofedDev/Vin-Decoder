import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom"

const Layout = () => {

    return (
        <>
            <header>
                <Link to="/">Decoder</Link>
                <Link to="/variables">Variables</Link>
            </header>
            <main>
                <Outlet />
            </main>
        </>

    )
}



export default Layout