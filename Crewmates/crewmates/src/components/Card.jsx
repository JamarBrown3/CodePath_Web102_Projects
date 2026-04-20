import '../App.css'
import { Link } from 'react-router-dom'

const Card = (props) => {


  return (
    <div className="card">
      <div className="container">

        {/* Character Image */}
        <img
          className="crewmate-img"
          src={props.image || 'https://via.placeholder.com/150'}
          alt="crewmate portrait"
        />

        <h2 className="name">{props.name}</h2>
        <h3 className="class">Class: {props.class}</h3>
        <h4 className="level">Level: {props.level}</h4>

        {/* Link to the full Summary/Details page */}
        <Link to={'/details/' + props.id} className="detailsLink">
          View Stats 🛡️
        </Link>

        <Link to={'/edit/' + props.id} className="editLink">
          Edit Crewmate ✏️
        </Link>
      </div>
    </div>
  );
};

export default Card;