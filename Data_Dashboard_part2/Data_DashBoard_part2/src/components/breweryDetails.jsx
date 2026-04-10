import { useEffect, useState } from "react"


const BreweryDetails = ({ breweryId }) => {

    

    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
    const getBreweryDetail = async () => {
        const details = await fetch(
            `https://api.openbrewerydb.org/v1/breweries/${breweryId}`
        )
        

        const detailsJson = await details.json()
       

        setFullDetails(detailsJson)
    };

    if(breweryId) {
        getBreweryDetail().catch(console.error)
    }
}, [breweryId])


return (
    <>
    {!fullDetails ? (
        <div>Loading...</div>
    ) : (
        <div className="List">
            <ul>
                <li>Id: {fullDetails.id}</li>
                <br></br>
                <li>Name: {fullDetails.name}</li>
                <br></br>
                <li>Address 3: {fullDetails.address_3}</li>
                <br></br>
                <li>Address 1: {fullDetails.address_1}</li>
                <br></br>
                <li>Address 2: {fullDetails.address_2}</li>
                <br></br>
                <li>Adress 3: {fullDetails.address_3}</li>
                <br></br>
                <li>City: {fullDetails.city}</li>
                <br></br>
                <li>State Province: {fullDetails.state_province}</li>
                <br></br>
                <li>Postal Code: {fullDetails.postal_code}</li>
                <br></br>
                <li>Country: {fullDetails.country}</li>
                <br></br>
                <li>Longitude: {fullDetails.longitude}</li>
                <br></br>
                <li>Latitude: {fullDetails.latitude}</li> 
                <br></br>
                <li>Phone: {fullDetails.phone}</li>
                <br></br>
                <li>Website: {fullDetails.website_url}</li>
                <br></br>
                <li>State: {fullDetails.state}</li>
                <br></br>
                <li>Street: {fullDetails.street}</li>
            </ul>
        </div>
    )}
    </>
)

}


export default BreweryDetails;