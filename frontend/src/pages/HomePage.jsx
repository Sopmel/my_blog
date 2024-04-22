import { useEffect, useState } from "react";
import Post from "../componants/Posts";
import Header from "../componants/Header";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
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
                <Post key={post._id} post={post} />
            ))}
        </>

    )

}

export default HomePage;