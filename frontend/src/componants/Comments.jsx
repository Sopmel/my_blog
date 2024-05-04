import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Comments.css';
import { UserContext } from '../UserContext';

export default function Comment({ postId }) {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const { userInfo } = useContext(UserContext);

    const toggleCommentForm = () => {
        setShowCommentForm(!showCommentForm);
    };

    const toggleComments = () => {
        setShowComments(!showComments);
        fetchComments();
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/comments/posts/${postId}`, { withCredentials: true });
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const createComment = async (ev) => {
        ev.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:3000/comments/posts/${postId}`,
                { content },
                { withCredentials: true }
            );

            if (response.status === 201) {
                setComments(prevComments => [...prevComments, response.data]);
                setContent('');
                setShowCommentForm(false);
                setShowComments(true);
                alert('Successfully added your comment');
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert('Missing fields');
            } else {
                console.error('Server error:', error);
            }
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const res = await fetch(`http://localhost:3000/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (res.ok) {
                setComments(comments.filter(comment => comment._id !== commentId));
                alert('Comment deleted');
            } else {
                throw new Error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <>
            <div className="comment-btns">
                <button className="posts-btn" onClick={toggleCommentForm}> Comment </button>
                <button className='Like'>Like</button>
                <button className="show-comments" onClick={toggleComments}>
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
            </div>


            {
                showCommentForm && (
                    <form className="form" onSubmit={createComment}>
                        <textarea
                            type="content"
                            value={content}
                            onChange={ev => setContent(ev.target.value)}
                            placeholder="Write your comment..."
                            rows={4}
                            cols={50}
                        ></textarea>
                        <br />
                        <button className="posts-btn">Submit</button>
                    </form>
                )
            }

            {
                showComments && comments.map((comment, index) => (
                    <div className="comment" key={index}>
                        <Link to={`/profilepage/${comment.author._id}`}>{comment.author.username}</Link>
                        <p>{comment.content}</p>

                        {userInfo && (userInfo.id === comment.author.username || userInfo.isAdmin) && (
                            <button className="del" onClick={() => deleteComment(comment._id)}>
                                Delete
                            </button>
                        )}
                    </div>
                ))
            }
        </ >
    );
}
