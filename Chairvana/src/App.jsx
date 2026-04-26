import React, { useState, useEffect } from 'react';
import PostCard from './components/postCard';
import { supabase } from './supabaseClient';
import './css/App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('creationDate');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(sortBy, { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [sortBy]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-page-container">
      <img src='/old_man_in_chair.gif' className="bg-gif-fixed" alt="background" />

      <div id="content">
        <div className="wrapper-feed">
          <h1>Community Discussions</h1>

          <div className="sort-container">
            <input
              type="text"
              placeholder="🔍 Search by title..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="sort-label">Sort by:</span>
            <button
              className={`sort-btn ${sortBy === 'creationDate' ? 'sort-btn--active' : ''}`}
              onClick={() => setSortBy('creationDate')}
            >
              📅 Date
            </button>
            <button
              className={`sort-btn ${sortBy === 'upvotes' ? 'sort-btn--active' : ''}`}
              onClick={() => setSortBy('upvotes')}
            >
              👍 Upvotes
            </button>
            <button
              className={`sort-btn ${sortBy === 'downvotes' ? 'sort-btn--active' : ''}`}
              onClick={() => setSortBy('downvotes')}
            >
              👎 Downvotes
            </button>
          </div>

          <p className="results-count">
            {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
          </p>

          <div className="posts-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  image={post.image}
                  initialUpvotes={post.upvotes}
                  initialDownVotes={post.downvotes}
                  creationDate={post.creationDate}
                  showComments={false}
                />
              ))
            ) : (
              <p className="no-results">No posts match your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;