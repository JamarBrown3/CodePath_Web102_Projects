import Cards from '../components/Card'
import { supabase } from '../Client'
import { useEffect, useState } from 'react';
import '../App.css'

const CrewGallery = () => {
    const [crews, setCrews] = useState([]);

    useEffect(() => {
        const fetchCrews = async () => {
            const { data } = await supabase.from('CrewMates').select('*').order('created_at', { ascending: false }); // included order to make sure the most recent is shown at the top
            setCrews(data);
        };

        fetchCrews();
    }, []);

    return (
        <div className="gallery-main">
            <h1>Crew Gallery</h1>

            {/* This is where we will map the code for the cards... */}
            {/* This code also is to safely render the cards even if nothing is available  */}
            <div className="gallery">
                {crews && crews.length > 0 ? (
                    crews.map((member) => (
                        <Cards
                            key={member.id}
                            id={member.id}
                            name={member.name}
                           class={member.class}
                            level={member.level}
                            image={member.image}
                        />
                    ))
                ) : (
                    <h2>No crew members found. Create some to see them here!</h2>
                )}
            </div>

        </div>
    )
}

export default CrewGallery;