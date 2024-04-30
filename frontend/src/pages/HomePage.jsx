import { useEffect, useState, useContext } from "react";
import Post from "../componants/Posts";
import Header from "../componants/Header";
import { UserContext } from "../UserContext";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const { userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:3000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        });
    }, []);

    return (

        <>
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} _id={post._id} post={post} userInfo={userInfo} />
            ))}
        </>

    )

}

export default HomePage;