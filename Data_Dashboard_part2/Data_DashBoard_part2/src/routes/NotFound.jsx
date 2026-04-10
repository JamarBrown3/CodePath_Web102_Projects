import { Link } from "react-router";


const NotFound = () => {
  return (
    <main className="mained">
      <div className="dialog">
        <h1>Ah, nuts!</h1>
        <p>We were unable to find the page you were looking for, but we'll get cracking on the problem.</p>
      </div>
      
      {/* Note: You can replace this src with a local image or an online nut image */}
      <img 
        src="https://www.free404.com/ah_nuts/pistachios.jpg" 
        alt="pistachios" 
        className="image" 
        style={{ maxWidth: "400px", margin: "20px 0" }}
      />

      <br />
      
      <Link 
        to="/" 
        className="links"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;