import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import "../css/App.css";

function DeletePost() {
    const navigate = useNavigate();

    // 1. We only need ID and Secret Key for a deletion
    const [formData, setFormData] = useState({
        id: '',
        secret_key: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 2. The Delete Logic
    const handleDelete = async (e) => {
        e.preventDefault();

        // Safety check: Ask the user one last time
        const confirmDelete = window.confirm("Are you absolutely sure? This cannot be undone.");
        if (!confirmDelete) return;

        // The "Gatekeeper" again: must match BOTH ID and Key
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', formData.id)
            .eq('secret_key', formData.secret_key)
            .select(); // Select lets us see if a row was actually deleted

        if (error) {
            alert("Error: " + error.message);
        } else if (data.length === 0) {
            // No row matched that ID + Key combo
            alert("Incorrect ID or Secret Key. Post not found.");
        } else {
            alert("Chair post deleted forever. 🗑️");
            navigate('/');
        }
    };

    return (
        <div className="create-page-wrapper">
            <img
                src='../../public/chair-bg.mp4.gif' // Just use the name, no 'public/' needed
                alt="background"
                className="bg-gif"
            />
            <section className="form-container">
                <h2 className="form-title">Delete Chair Post</h2>
                <p className="paragraph_style">
                    Enter the ID and Secret Key to remove a post.
                </p>

                <form className="placeholder-form" onSubmit={handleDelete}>
                    <label>Post ID:</label>
                    <input
                        type="number"
                        name="id"
                        className="custom-input"
                        placeholder="e.g. 15"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />

                    <label>Secret Key:</label>
                    <input
                        type="password"
                        name="secret_key"
                        className="custom-input"
                        placeholder="Your secret key"
                        value={formData.secret_key}
                        onChange={handleChange}
                        required
                    />

                    <button
                        className="submit-btn delete-btn"
                        type="submit"
                    >
                        Delete Permanently
                    </button>
                </form>
            </section>
        </div>
    );
}

export default DeletePost;