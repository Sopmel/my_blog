import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Post from "../componants/Posts";

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
        axios.get(`http://localhost:3000/profilepage/${id}`)
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('Error fetching user Profile', error);
            });

    };

    const fetchUserPosts = () => {
        axios.get(`http://localhost:3000/posts/user/${id}`)
            .then(response => {
                setUserPosts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching user posts', error);
            });
    };





    return (
        <div>
            <h1>Profile Page - {profile.username}</h1>
            <h2>User Info</h2>
            <p>Username: {profile.username}</p>
            {/* Visa annan användarinformation här */}

            <h2>User Posts</h2>
            {userPosts.map(post => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    )
}