import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import Comment from '../componants/Comments';
import '../styles/Post.css';

export default function Post({ _id, post }) {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes.length);

    useEffect(() => {
        if (userInfo) {
            // Uppdatera liked-tillståndet baserat på användarinformationen
            setLiked(userInfo.likedPosts.includes(_id));
        }
    }, [userInfo, _id]);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUserInfo = localStorage.getItem('userInfo');
            if (storedUserInfo) {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                setUserInfo(parsedUserInfo);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    },

        [setUserInfo]);


    const handleLike = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/post/${_id}/${liked ? 'unlike' : 'like'}`, {}, { withCredentials: true });
            setLikeCount(response.data.likeCount);
            setLiked(!liked);

            // Uppdatera användarens likedPosts-array beroende på om användaren gillar eller ogillar inlägget
            const updatedUserInfo = { ...userInfo };
            if (!liked) {
                updatedUserInfo.likedPosts.push(_id);
            } else {
                updatedUserInfo.likedPosts = updatedUserInfo.likedPosts.filter(postId => postId !== _id);
            }
            setUserInfo(updatedUserInfo);
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    };

    const createdAtDate = new Date(post.createdAt);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Europe/Stockholm'
    };
    const formattedDate = createdAtDate.toLocaleDateString('sv-SE', options);

    const author = post.author ? post.author.username : 'Unknown Author';

    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <img src={post.cover} alt="Cover" />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <h2>{post.title}</h2>
                </Link>
                <p className="info">
                    <a className="author">{author} </a>
                    <time>{formattedDate}</time>
                </p>
                <p className="summary">{post.summary}</p>


                <div className='like-container'>
                    <button className='like' onClick={handleLike}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${liked ? 'liked' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </button>
                    <p>{likeCount}</p>
                </div>

                <div className='comment-container'>
                    <Comment postId={_id} />
                </div>


            </div>
        </div>
    );
}
