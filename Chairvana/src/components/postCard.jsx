import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import '../css/App.css';

const PostCard = ({ title, description, image, initialUpvotes, id, creationDate, initialDownVotes, comments = [], showComments }) => {
  const [likes, setLikes] = useState(initialUpvotes);
  const [dislikes, setDislikes] = useState(initialDownVotes);
  const [newComment, setNewComment] = useState(""); 
  const [allComments, setAllComments] = useState(comments || []); 
  const imgRef = useRef(null);

  const handleLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    const { error } = await supabase
      .from('posts')
      .update({ upvotes: newLikes })
      .eq('id', id);
    if (error) console.error("Error updating likes:", error.message);
  };

  const handleDislike = async () => {
    const newDislikes = dislikes + 1;
    setDislikes(newDislikes);
    const { error } = await supabase
      .from('posts')
      .update({ downvotes: newDislikes})
      .eq('id', id);
    if (error) console.error("Error updating dislikes:", error.message);
  };

  // REFACTORED: Logic for submitting comments
  const submitComment = async () => {
    if (newComment.trim() === "") return;

    // Fixed the ESLint error by only destructuring { error }
    const { error } = await supabase
      .from('comments')
      .insert([{ post_id: id, description: newComment }])
      .select();

    if (error) {
      console.error("Error adding comment:", error.message);
    } else {
      // Create a local object that matches your comment structure
      const commentObject = { description: newComment, post_id: id };
      setAllComments([...allComments, commentObject]); 
      setNewComment(""); 
      alert("Your comment has succesfully been added press view comments to see your comment");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitComment();
    }
  };

  useEffect(() => {
    const img = imgRef.current;
    const trigger = () => {
      if (!img) return;
      img.classList.remove('animating');
      void img.offsetWidth;
      img.classList.add('animating');
      setTimeout(() => {
        img.classList.remove('animating');
        img.style.transform = 'rotate(0deg) scale(0.7)';
      }, 12000);
    };

    const staggerDelay = ((id - 1) % 6) * 5000;
    const initialDelay = setTimeout(() => {
      trigger();
      const interval = setInterval(trigger, 30000);
      img._interval = interval;
    }, staggerDelay);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(img?._interval);
    };
  }, [id]);

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="title-area">
          <h2>{title}</h2>
          <span className="creation-date">{new Date(creationDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="post-image-container">
        <img ref={imgRef} src={image} alt={title} className="post-image" />
      </div>

      <p className="post-id-tag">Post ID: {id}</p>
      <p className="post-description">{description}</p>

      {/* REFACTORED: Input + Submit Button wrapper */}
      <div className="feed-comment-section">
        <div className="comment-input-wrapper" className="user-comment-input">
          <input 
            type="text" 
            className="feed-comment-input"
            placeholder="Add a comment..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="comment-submit-btn" onClick={submitComment}>Post</button>
        </div>
      </div>
      <br />

      <div className="vote-controls">
        <button className="vote-btn like" onClick={handleLike}>👍 {likes}</button>
        <button className="vote-btn dislike" onClick={handleDislike}>👎 {dislikes}</button>
      </div>

      {showComments && (
        <div className="comments-section">
          <hr />
          <h3>Comments ({allComments.length})</h3>
          {allComments.length > 0
            ? allComments.map((c, i) => <p key={i} className="comment">{c.description || c}</p>)
            : <p>No comments yet.</p>
          }
        </div>
      )}

      {!showComments && (
        <div className="post-footer">
          <Link to={`/details/${id}`} className="view-comments-btn">
            View Details & Comments →
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostCard;