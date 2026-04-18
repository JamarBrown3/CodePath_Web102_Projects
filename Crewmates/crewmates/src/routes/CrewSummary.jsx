/* This is for me to complete the crew summary*/

import { useParams } from 'react-router-dom';
import { supabase } from '../Client';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const CrewSummary = () => {
    const { id } = useParams();
    const [crewMember, setCrewMember] = useState(null);

    useEffect(() => {
        const fetchCrewMember = async () => {
            const { data } = await supabase.from('CrewMates').select('*').eq('id', id).single();
            setCrewMember(data);
        };

        fetchCrewMember();
    }, [id]);

    if (!crewMember) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="crew-summary">
            <h1>{crewMember.name}</h1>
            <img
                className="crewmate-img"
                src={crewMember.image || 'https://api.dicebear.com/7.x/adventurer/svg?seed=Knight'}
                alt="crewmate portrait"
            />
            <h3>Class: {crewMember.class}</h3>
            <h4>Level: {crewMember.level}</h4>

            <Link to={'/edit/' + crewMember.id} className="editLink">
                Edit Crewmate ✏️
            </Link>
            <Link to="/gallery" className="detailsLink">
                Back to Gallery
            </Link>
        </div>
    );
}

export default CrewSummary;