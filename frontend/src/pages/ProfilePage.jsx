import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Post from "../componants/Posts";
import '../styles/profilepage.css'

export default function ProfilePage() {
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
    }, [id]);

    const fetchUserProfile = () => {
        axios.get(`http://localhost:3000/user/profilepage/${id}`)
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching user Profile', error);
            });

    };

    const fetchUserPosts = () => {
        axios.get(`http://localhost:3000/user/posts/${id}`)
            .then(response => {
                setUserPosts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching user posts', error);
            });
    };

    return (
        <div className="profile-container">
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