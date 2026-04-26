import { useParams } from "react-router";
import BreweryDetails from "../components/breweryDetails";
import '../App.css'

const DetailRow = () => {
    
    const { id } = useParams()

    return (
        <div>
            <h1>Details for Brewery ID: </h1>
            <BreweryDetails breweryId={id} />

        </div>
    )
}

export default DetailRow;