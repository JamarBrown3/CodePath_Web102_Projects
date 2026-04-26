import { Outlet, Link } from "react-router-dom";
import "../css/App.css";

function Layout() { // Capitalized 'L' is standard for React components
    return (
        <div id="main">
            <header id="header">
                <div id="logo">
                    {/* Use Link instead of <a href> to prevent page refreshes */}
                    <h2><Link to="/">CHAIRVANA</Link></h2>
                </div>
                <nav id="buttons">
                    {/* Swapping buttons for Links so they actually navigate */}
                    <Link to="/"><button className="but">Feed</button></Link>
                    <Link to="/create"><button className="but">Create Post</button></Link>

                    {/* Note: Update/Delete usually happen on the Details page, 
                        but we'll keep these here if you want general links */}
                    <Link to="/edit"><button className="but">Update Post</button></Link>
                    <Link to="/delete"><button className="but">Delete Post</button></Link>
                </nav>
            </header>

            {/* This is where your Feed, Create, and Details pages will swap in */}
            <main className="content-area">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;