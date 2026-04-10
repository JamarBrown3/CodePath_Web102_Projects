import { Outlet, Link } from "react-router";
import '../App.css'
const Layout = () => {
    return (
        <div className="app" id="topWeb">
            <div className="sideDiv">
                <div className="Header">
                    <h1>Breweries Data Table 🍺</h1>
                </div>
                <div className="Menu">
                    <h1>NavBar</h1>
                    <nav>
                        {/* Note: The onClick handler is added to ensure the search bar gets focused after navigating back to home */}
                        {/* The setTimeout is used to ensure the DOM has updated before trying to focus the search input */}
                        {/* this is ai boilerplate code to ensure the search bar is focused when navigating back to home */}
                        <ul>
                            <li><Link to="/" onClick={() => {
                                setTimeout(() => {
                                    const el = document.getElementById("search");
                                    if (el) el.focus();
                                }, 50);
                            }}>
                                Search Bar 🔍
                            </Link></li>
                            <li><Link to="/">Top of bar 🏠</Link></li>
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