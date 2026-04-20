import { Outlet, Link } from "react-router";
import '../App.css'
const Layout = () => {
    return (
        <div className="app">
            <div className="sideNav">
                <h1 className="Header">Dungeons And Dragons Crew</h1>

                <div className="Menu">
                    <h1>NavBar</h1>
                    <nav>
                        <ul className="nav-links">
                            <li className="nav-item"><Link to="/"> Home Page 🏠</Link></li>
                            <li className="nav-item"><Link to="/create"> Create a CrewMember 👫</Link></li>
                            <li className="nav-item"><Link to="/gallery">Crew Gallery🖼️</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;