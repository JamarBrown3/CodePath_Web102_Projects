import { useState, useEffect } from 'react';

const Api = `https://api.openbrewerydb.org/v1/breweries`;

const Fetched_Api = () => {
    const [breweries, setBreweries] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [allBreweries, setAllBreweries] = useState([]);
    const [filteredTable, setFilteredTable] = useState("");

    useEffect(() => {
        const getBreweries = async () => {
            const response = await fetch(Api);
            const json = await response.json();
            setBreweries(json);
            setAllBreweries(json);
        };

        getBreweries().catch(console.error);
    }, []);

    const applyFilters = () => {
        let filtered = [...allBreweries];

        // 1. Apply search filter (if any)
        if (searchInput !== "") {
            filtered = filtered.filter((item) =>
                Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
            );
        }

        // 2. Apply column filter: show ONLY unique values from the selected column
        if (filteredTable === "state") {
            const uniqueStates = [...new Set(filtered.map(brewery => brewery.state_province).filter(Boolean))];
            filtered = uniqueStates.map((state, index) => ({
                id: `state-${index}`,
                name: "",  // Changed: blank instead of state
                state_province: state,
                city: "",
                longitude: ""
            }));
        } else if (filteredTable === "city") {
            const uniqueCities = [...new Set(filtered.map(brewery => brewery.city).filter(Boolean))];
            filtered = uniqueCities.map((city, index) => ({
                id: `city-${index}`,
                name: "",  // Changed: blank instead of city
                state_province: "",
                city: city,
                longitude: ""
            }));
        } else if (filteredTable === "longitude") {
            const uniqueLongitudes = [...new Set(filtered.map(brewery => brewery.longitude).filter(Boolean))];
            filtered = uniqueLongitudes.map((longitude, index) => ({
                id: `long-${index}`,
                name: "",  // Changed: blank instead of longitude
                state_province: "",
                city: "",
                longitude: longitude
            }));
        }

        setBreweries(filtered);
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilteredTable(e.target.value);
    };

    // Re-run filters whenever search input, column filter, or original data changes
    useEffect(() => {
        applyFilters();
    }, [searchInput, filteredTable, allBreweries]);

    // Statistics based on currently displayed data (breweries state)
    const uniqueCitiesList = [...new Set(breweries.map(brewery => brewery.city).filter(Boolean))];
    const totalCities = uniqueCitiesList.length;

    let totalLongitude = 0;
    let counterLongitude = 0;
    for (let i = 0; i < breweries.length; i++) {
        if (breweries[i].longitude == null) {
            continue;
        }
        totalLongitude += parseFloat(breweries[i].longitude);
        counterLongitude++;
    }
    const averageLongitude = counterLongitude > 0 ? totalLongitude / counterLongitude : 0;

    const numberOfBreweries = breweries.reduce((acc, brewery) => {
        return brewery ? acc + 1 : acc;
    }, 0);

    return (
        <div className="center-div">
            <div className="app-row">
                <div className="Card">
                    <p>Total Number of cities That Has Brewery: {totalCities}</p>
                </div>
                <div className="Card">
                    <p>Average longitude: {averageLongitude.toFixed(2)} </p>
                </div>
                <div className="Card">
                    <p>Total Number Of Breweries: {numberOfBreweries} </p>
                </div>
            </div>

            <div>
                <select onChange={handleFilterChange} value={filteredTable}>
                    <option value="">All Types</option>
                    <option value="state">Filter by State</option>
                    <option value="city">Filter by City</option>
                    <option value="longitude">Filter by Longitude</option>
                </select>
                <input
                    id="search"
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="app-row">
                <div className="List">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {breweries.map((brewery) => (
                                <tr key={brewery.id}>
                                    <td>{brewery.name}</td>
                                    <td>{brewery.state_province}</td>
                                    <td>{brewery.city}</td>
                                    <td>{brewery.longitude}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Fetched_Api;
