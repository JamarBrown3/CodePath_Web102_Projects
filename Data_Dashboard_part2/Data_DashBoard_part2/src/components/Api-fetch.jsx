import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API = `https://api.openbrewerydb.org/v1/breweries`;

const Api_fetch = () => {
    const [allBreweries, setAllBreweries] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredTable, setFilteredTable] = useState("");

    // FETCH ONCE (single state update only)
    useEffect(() => {
        const getBreweries = async () => {
            const response = await fetch(API);
            const json = await response.json();
            setAllBreweries(json);
        };

        getBreweries().catch(console.error);
    }, []);

    // DERIVED DATA (no setState needed)
    const breweries = useMemo(() => {
        let filtered = [...allBreweries];

        // search filter
        if (searchInput.trim() !== "") {
            filtered = filtered.filter((item) =>
                Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
            );
        }

        // column filter
        if (filteredTable === "state") {
            const uniqueStates = [...new Set(filtered.map(b => b.state_province).filter(Boolean))];

            return uniqueStates.map((state, index) => ({
                id: `state-${index}`,
                name: "",
                state_province: state,
                city: "",
                longitude: ""
            }));
        }

        if (filteredTable === "city") {
            const uniqueCities = [...new Set(filtered.map(b => b.city).filter(Boolean))];

            return uniqueCities.map((city, index) => ({
                id: `city-${index}`,
                name: "",
                state_province: "",
                city: city,
                longitude: ""
            }));
        }

        if (filteredTable === "longitude") {
            const uniqueLongitudes = [...new Set(filtered.map(b => b.longitude).filter(Boolean))];

            return uniqueLongitudes.map((lon, index) => ({
                id: `long-${index}`,
                name: "",
                state_province: "",
                city: "",
                longitude: lon
            }));
        }

        return filtered;
    }, [allBreweries, searchInput, filteredTable]);

    // derived stats (no state needed)
    const totalCities = useMemo(() => {
        return new Set(breweries.map(b => b.city).filter(Boolean)).size;
    }, [breweries]);

    const averageLongitude = useMemo(() => {
        let sum = 0;
        let count = 0;

        breweries.forEach(b => {
            if (b.longitude) {
                sum += parseFloat(b.longitude);
                count++;
            }
        });

        return count ? sum / count : 0;
    }, [breweries]);

    const numberOfBreweries = breweries.length;

    // refactored Ai boilerplate code for charts
    // render chart datasets (2)
    const chartData = useMemo(() => {
        // 1. Count breweries per city
        const cityCounts = allBreweries.reduce((acc, b) => {
            if (b.city) {
                acc[b.city] = (acc[b.city] || 0) + 1;
            }
            return acc;
        }, {});

        // 2. Turn into array and sort to get the top 5
        return Object.keys(cityCounts)
            .map(city => ({ name: city, count: cityCounts[city] }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6); // Just the top 6 cities so it's not crowded
    }, [allBreweries]);

    // NEW: Count brewery types for the Bar Chart
    const typeData = useMemo(() => {
        const counts = allBreweries.reduce((acc, b) => {
            const type = b.brewery_type || "other";
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
    }, [allBreweries]);

    return (
        <div className="center-div">

            {/* Stats Cards */}
            <div className="app-row">
                <div className="Card"><p>Total Cities: {totalCities}</p></div>
                <div className="Card"><p>Average Longitude: {averageLongitude.toFixed(2)}</p></div>
                <div className="Card"><p>Total Breweries: {numberOfBreweries}</p></div>
            </div>

            {/* Search & Filter */}
            <div style={{ marginBottom: '20px' }}>
                <select onChange={(e) => setFilteredTable(e.target.value)} value={filteredTable}>
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
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>

            {/* Dashboard Body */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'flex-start' }}>

                {/* Table */}
                <div className="List" style={{ flex: '2', margin: '0' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Longitude</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {breweries.map((brewery) => (
                                <tr key={brewery.id}>
                                    <td>{brewery.name}</td>
                                    <td>{brewery.state_province}</td>
                                    <td>{brewery.city}</td>
                                    <td>{brewery.longitude}</td>
                                    <td>
                                        <Link className="Links" to={`/breweryDetails/${brewery.id}`}>
                                            🖇️
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Charts */}
                <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '20px', minWidth: '350px' }}>

                    <div className="List" style={{ padding: '15px', minWidth: 0 }}>
                        <h3 style={{ color: '#ffcc00', fontSize: '1rem', marginBottom: '10px' }}>Cities (Top 6)</h3>
                        <ResponsiveContainer width="100%" height={240}>
                            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" hide />
                                <YAxis stroke="#fff" fontSize={10} width={40} />
                                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }} />
                                <Line type="monotone" dataKey="count" stroke="#ffcc00" strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="List" style={{ padding: '15px', minWidth: 0 }}>
                        <h3 style={{ color: '#ffcc00', fontSize: '1rem', marginBottom: '10px' }}>Brewery Types</h3>
                        <ResponsiveContainer width="100%" height={240}>
                            <BarChart data={typeData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#fff"
                                    fontSize={10}
                                    angle={-35}
                                    textAnchor="end"
                                    interval={0}
                                    tick={{ fill: '#fff', fontSize: 10 }} />
                                <YAxis stroke="#fff" fontSize={10} width={40} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#ffcc00" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Api_fetch;