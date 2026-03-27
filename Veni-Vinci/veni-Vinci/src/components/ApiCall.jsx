import { useState } from 'react';

const ApiCall = ({ accessKey, banList, setBanList, onSeen }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [rating, setRating] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);

    const CallAPI = async (query) => {
        try {
            const response = await fetch(query);
            const json = await response.json();

            if (!json.results) return;

            const getFilteredResults = (results) => {
                return results.filter(result => {
                    // Logic checks to see if the game attributes are in the banList array
                    const isNameBanned = banList.some(item => item.type === "Name" && item.value === result.name);
                    const isReleaseBanned = banList.some(item => item.type === "Release" && item.value === result.released);
                    const isRatingBanned = banList.some(item => item.type === "Rating" && item.value === result.rating);

                    return !isNameBanned && !isReleaseBanned && !isRatingBanned;
                });
            };

            const filteredResults = getFilteredResults(json.results);

            if (filteredResults.length === 0) {
                alert("All results on this page are banned! Try again or reset the list.");
                return;
            }

            const randomResult = filteredResults[Math.floor(Math.random() * filteredResults.length)];

            setImage(randomResult.background_image);
            setName(randomResult.name);
            setRating(randomResult.rating);
            setReleaseDate(randomResult.released);

            if (onSeen) {
                onSeen({ name: randomResult.name, image: randomResult.background_image });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const HandleBan = (type, value) => {
        if (!value) return;

        const alreadyBanned = banList.some(item => item.type === type && item.value === value);
        if (!alreadyBanned) {
            setBanList(prev => [...prev, { type, value }]);
        }
    };

    return (
        <div className="api-container">
            <button
                className="discover-btn"
                onClick={() => CallAPI(`https://api.rawg.io/api/games?key=${accessKey}&page_size=40`)}
            >
                Discover! 🔀
            </button>

            <br />

            <div className="game-details">
                <label>Name Of The Game:</label>
                <button className="ban-button" onClick={() => HandleBan("Name", name)}>
                    {name || "No name yet"}
                </button>

                <label>Rating Of The Game:</label>
                <button  className="ban-button" onClick={() => HandleBan("Rating", rating)}>
                    {rating || "No rating yet"}
                </button>

                <label>Release Date Of The Game:</label>
                <button className="ban-button" onClick={() => HandleBan("Release", releaseDate)}>
                    {releaseDate || "No release date yet"}
                </button>
            </div>

            <div className="image-container">
                {image ? (
                    <img src={image} alt={name} />
                ) : (
                    <p>No image</p>
                )}
            </div>
        </div>
    );
};

export default ApiCall;