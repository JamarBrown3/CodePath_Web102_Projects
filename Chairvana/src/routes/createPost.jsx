import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import '../css/App.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
   const navigate = useNavigate(); /*vusing the navigate function from react-router-dom
    to redirect after post creation */
   const [post, setPost] = useState({
      title: '',
      image: '',
      description: '',
      secret_key: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setPost(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const { error } = await supabase
         .from('posts')
         .insert([
            {
               title: post.title,
               image: post.image,
               description: post.description,
               secret_key: post.secret_key
            }
         ]);
      if (error) {
         console.error('Error creating chair post:', error.message);
         alert('Failed to create post. Please try again.: ' + error.message);
      } else {
         alert('Post created successfully!');
         navigate('/main'); /* Redirect to main feed after successful post creation */
      }
   };
   return (
      <div className="create-page-wrapper">
         <img
            src='/chair-bg.mp4.gif' // Just use the name, no 'public/' needed
            alt="background"
            className="bg-gif"
         />
         <section className="form-container">
            <h2 className="form-title">Create a New Chair Post</h2>

            <form className="placeholder-form" onSubmit={handleSubmit}>
               <label htmlFor="image">Image URL:</label>
               <input
                  id="image" // Add this
                  name="image"
                  type="text"
                  placeholder="Image URL"
                  className="custom-input"
                  value={post.image}
                  onChange={handleChange}
                  required
               />

               <label htmlFor="title">Title:</label>
               <input
                  id="title" // Add this
                  name="title"
                  type="text"
                  placeholder="Post Title"
                  className="custom-input"
                  value={post.title}
                  onChange={handleChange}
                  required
               />

               <label htmlFor="description">Description:</label>
               <textarea
                  id="description" // Add this
                  name="description"
                  placeholder="Description"
                  className="custom-input textarea"
                  value={post.description}
                  onChange={handleChange}
                  required
               ></textarea>

               <label htmlFor="secret_key">Secret Key (Save this to edit/delete later!):</label>
               <input
                  id="secret_key" // Add this
                  name="secret_key"
                  type="password"
                  placeholder="e.g. MySecretChair123"
                  className="custom-input"
                  value={post.secret_key}
                  onChange={handleChange}
                  required
               />

               <button type="submit" className="submit-btn">
                  Post to Chairvana
               </button>
            </form>
         </section>
      </div>
   )
}
export default CreatePost;
