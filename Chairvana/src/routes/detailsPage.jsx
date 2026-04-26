/* This page will show the details of a post which will include the title
upvotes, downvotes, comments, the image, the description and the date it was created 
and new addtional information which is the comments section and the date it was created. */
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useState, useEffect } from 'react';
import PostCard from '../components/postCard';
import "../css/App.css"

function DetailsPage() {

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchFullDetails = async () => {
            // 1. Get the specific Chair
            const postResponse = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single()

            // 2. Get all comments where post_id matches this chair's id
            const commentResponse = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', id)

            if (postResponse.data) setPost(postResponse.data)
            if (commentResponse.data) setComments(commentResponse.data)
        }
        fetchFullDetails()
    }, [id])

    if (!post) return <div className="loading">Loading Chair specs...</div>
    // Find the One post that matches the id from the URL

    return (
        <div className="details-page-wrapper">
            <PostCard
                id={post.id}
                title={post.title}
                description={post.description}
                image={post.image}
                initialUpvotes={post.upvotes}
                initialDownVotes={post.downvotes}
                creationDate={post.creationDate}
                comments={comments}
                showComments={true} // 👈 Unlocked only here
            />
        </div>
    );
}
export default DetailsPage;