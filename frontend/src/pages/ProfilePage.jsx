import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Post from "../componants/Posts";
import '../styles/profilepage.css'

export default function ProfilePage() {
    const [error, setError] = useState(null);
    const { id } = useParams();
    if (!id) {
        console.error('User ID is undefined');
        return; // Avbryt begäranden om id är undefined
    }
    const [profile, setProfile] = useState({});
    const [userPosts, setUserPosts] = useState([]);


    useEffect(() => {
        fetchUserProfile();
        fetchUserPosts();
        console.log("profile: ", profile)
    }, [id]);


    const fetchUserProfile = () => {
        axios.get(`https://my-blog-frontend-nepw.onrender.com/user/profilepage/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data);
                console.log("res from pp: ", response.data)
            })
            .catch(error => {
                console.error('Error fetching user Profile', error);
                if (error.response && error.response.status === 404) {
                    setError('User not found');
                } else {
                    setError('An error occurred while fetching the user profile');
                }
            });
    };

    const fetchUserPosts = () => {
        axios.get(`https://my-blog-frontend-nepw.onrender.com/user/posts/${id}`,)
            .then(response => {
                setUserPosts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching user posts', error);
            });
    };

    if (error) {
        return (
            <div className="error-container">
                <Link to={'/'}>
                    <button className="back-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>

                    </button>
                </Link>
                <p className="error">User no longer active</p>
            </div>
        )
    }

    return (

        <div className="profile-container">
            <Link to={'/'}>
                <button className="back-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>

                </button>
            </Link>
            <h1>{profile.username}'s Profile</h1>

            <div className="post-container">
                <div>
                    <h3>post from {profile.username}</h3>
                </div>

                <div className="posts">
                    {userPosts.map(post => (
                        <Post key={post._id} _id={post._id} post={post} />
                    ))}

                </div>

            </div>
        </div>
    )
}