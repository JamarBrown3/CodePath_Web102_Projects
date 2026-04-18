
import '../App.css'
import { useState } from 'react';
import { supabase } from '../Client';


const CreateCrewMates = () => {

    const [memberData, setMemberData] = useState({
        name: "",
        class: "",
        level: "",
        image: null
    })

    // const for handling useState changes

    const handleChange = (event) => {
        // 1. Grab the name of the input and the value typed in
        const { name, value } = event.target;

        // 2. Update the state using the 'prev' version of the object
        setMemberData((prev) => ({
            ...prev,          // Copy everything currently in state
            [name]: value     // Overwrite ONLY the part that changed
        }));
    };


    const handleSubmit = async (event) => {

        // make sure the page doesn't refresh
        event.preventDefault();

        // Use the supabase client to 'insert' the object into your 'crewmates' table
        const { error } = await supabase
            .from('CrewMates')
            .insert({
                name: memberData.name,
                class: memberData.class,
                level: parseInt(memberData.level), // Keep your int4 happy!
                image: memberData.image
            })
            .select();

        if (error) {
            console.log("Error inserting crewmate: ", error);
        } else {
            console.log("Success! Crewmate added to the party.");
            // Optional: Reset the form so it's fresh for the next one
            setMemberData({ name: "", class: "", level: "", image: "" });
            alert("Crewmate created successfully! Returning to home page.");
            // This takes you back to the home/gallery page after success
            window.location = "/";
        }

    }
    return (
        /* This for people to be able to save crewmates to a database, but for now the form won't do anything */
        <div className="create-form">
            <h1>Create a Crew Member</h1>
            <form className="crew-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name"
                    value={memberData.name}
                    onChange={handleChange}
                    required />

                <label htmlFor="class">Class:</label>
                <select id="class"
                    name="class"
                    value={memberData.class}
                    onChange={handleChange}
                    required>
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

                <label htmlFor="level">Level:</label>
                <input type="number" id="level" name="level"
                    value={memberData.level}
                    onChange={handleChange}
                    required />

                <label htmlFor="image">Image:</label>
                <input type="text" id="image" name="image"
                    onChange={handleChange} accept="image/*" />
                <br ></br>
                <button className="create-button" type="submit">Create Crew Member</button>

            </form>
        </div>
    )
}

export default CreateCrewMates;
