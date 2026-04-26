import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import "../css/App.css";

function UpdatePost() {
    const navigate = useNavigate();

    // 1. State to track the form inputs
    const [formData, setFormData] = useState({
        id: '',
        secret_key: '',
        image: '',
        title: '',
        description: '',
        resetVotes: false
    });

    // 2. Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // 3. The Update Logic
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to update
        let updateData = {
            title: formData.title,
            image: formData.image,
            description: formData.description
        };

        // If checkbox is checked, add 0s to the update object
        if (formData.resetVotes) {
            updateData.upvotes = 0;
            updateData.downvotes = 0;
        }

        // The "Gatekeeper": We only update where BOTH the ID and Secret Key match
        const { data, error } = await supabase
            .from('posts')
            .update(updateData)
            .eq('id', formData.id)
            .eq('secret_key', formData.secret_key)
            .select(); // This helps check if anything actually changed

        if (error) {
            alert("Error: " + error.message);
        } else if (data.length === 0) {
            // If no error, but no data returned, the ID or Key was wrong
            alert("Incorrect ID or Secret Key. No changes made.");
        } else {
            alert("Post updated successfully! 🪑");
            navigate('/');
        }
    };

    return (
        <div className="create-page-wrapper"> {/* Use the consistent wrapper */}
            <img
                src='../../public/chair-bg.mp4.gif' // Just use the name, no 'public/' needed
                alt="background"
                className="bg-gif"
            />
            <section className="form-container"> {/* This centers the form and adds the white background */}
                <h1 className="form-title">Update Your Chair</h1>

                <form className="placeholder-form" onSubmit={handleSubmit}>
                    <label>Post ID:</label>
                    <input
                        type="number"
                        name="id"
                        className="custom-input"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />

                    <label>Secret Key:</label>
                    <input
                        type="password"
                        name="secret_key"
                        className="custom-input"
                        value={formData.secret_key}
                        onChange={handleChange}
                        required
                    />

                    <label>New Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        className="custom-input"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />

                    <label>New Title:</label>
                    <input
                        type="text"
                        name="title"
                        className="custom-input"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label>New Description:</label>
                    <textarea
                        name="description"
                        className="custom-input textarea"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <div className="checkbox-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                        <label>Reset Votes to 0?</label>
                        <input
                            type="checkbox"
                            name="resetVotes"
                            checked={formData.resetVotes}
                            onChange={handleChange}
                        />
                    </div>

                    <button className="submit-btn" type="submit">
                        Update Post
                    </button>
                </form>
            </section>
        </div>
    );
}

export default UpdatePost;