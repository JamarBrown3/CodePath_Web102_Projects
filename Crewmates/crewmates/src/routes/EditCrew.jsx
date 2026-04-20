import { supabase } from "../Client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import '../App.css'

const EditCrew = () => {

    const { id } = useParams();
    const [memberData, setMemberData] = useState({
        name: '',
        class: '',
        level: '',
        image: ''
    });

    // This is where you would fetch the existing data for the crew member using the ID from the URL
    // For example:
    // const { data } = await supabase.from('CrewMates').select('*').eq('id', id).single();
    // setMemberData(data);

    useEffect(() => {
        const fetchCrewMember = async () => {
            const { data } = await supabase.from('CrewMates').select('*').eq('id', id).single();
            if (data) setMemberData(data);
        };
        fetchCrewMember();

    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMemberData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleUpdate = async (event) => {
        event.preventDefault();

        const { error } = await supabase
            .from('CrewMates')
            .update({
                name: memberData.name,
                class: memberData.class,
                level: parseInt(memberData.level),
                image: memberData.image
            })
            .eq('id', id);

        if (error) {
            console.log("Error updating crew member: ", error);
        } else {
            console.log("Crew member updated successfully.");
        }

        window.location = "/gallery/"; // Redirect to the gallery page after update
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete this crew member?");
        if (confirmDelete) {
            const { error } = await supabase
                .from('CrewMates')
                .delete()
                .eq('id', id);

            if (error) {
                console.log("Error deleting crew member: ", error);
            } else {
                console.log("Crew member deleted successfully.");
            }

            window.location = "/gallery/"; // Redirect to the gallery page after deletion
        }
    }
    return (
        <div className="edit-page"> {/* Unique class for the page */}
            <h1>Update Crew Member</h1>
            <div className="edit-container">
                <form onSubmit={handleUpdate} className="actual-form">
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={memberData.name} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="class">Class:</label>
                        <select id="class" name="class" value={memberData.class} onChange={handleChange}>
                            <option value="">Select a class</option>
                            <option value="fighter">Fighter</option>
                            <option value="wizard">Wizard</option>
                            <option value="rogue">Rogue</option>
                            <option value="cleric">Cleric</option>
                            <option value="ranger">Ranger</option>
                            <option value="paladin">Paladin</option>
                            <option value="bard">Bard</option>
                            <option value="druid">Druid</option>
                            <option value="monk">Monk</option>
                            <option value="sorcerer">Sorcerer</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="level">Level:</label>
                        <input type="number" id="level" name="level" value={memberData.level} onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="image">Image URL:</label>
                        <input type="text" id="image" name="image" value={memberData.image} onChange={handleChange} />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="updateButton">Update Crew Member ✅</button>
                        <button type="button" onClick={handleDelete} className="deleteButton">Delete Crew Member 🗑️</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCrew;