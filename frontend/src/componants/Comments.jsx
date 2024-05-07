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
                setShowComments(true);
                setShowCommentForm(false);
                setShowComments(false);
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

    const handleLike = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/post/${postId}/like`, {}, { withCredentials: true });
            setLikeCount(response.data.likeCount);
            setUnLiked(!unLiked);
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    };

    return (
        <div className='main-comment'>

            <div className="comment-btns">
                <button className="posts-btn" onClick={toggleCommentForm}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                </button>

                <button className="show-comments" onClick={toggleComments}>
                    {showComments ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>

                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    }
                </button>
            </div>

            <div>
                {
                    userInfo.isLoggedIn && showCommentForm && (
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
                            <Link to={`/profilepage/${comment.author?._id}`}>
                                {comment.author ? comment.author.username : 'Deleted User'}
                            </Link>
                            <div className='comment-content'>
                                <p>{comment.content}</p>

                                {userInfo && (userInfo.username === (comment.author?.username || '') || userInfo.isAdmin) && (
                                    <button className="del" onClick={() => deleteComment(comment._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                }

            </div>
        </ div>
    );
}
