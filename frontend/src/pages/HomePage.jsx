import { useEffect, useState, useContext } from "react";
import Post from "../componants/Posts";
import { UserContext } from "../UserContext";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        console.log('Fetching posts...');
        fetch('https://my-blog-frontend-nepw.onrender.com/post', {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`,
            },
            credentials: 'include',
        }).then(response => {
            console.log('Received response:', response);
            response.json().then(posts => {
                console.log('Received posts:', posts);
                setPosts(posts);
            }).catch(error => {
                console.error('Error parsing JSON:', error);
            });
        }).catch(error => {
            console.error('Error fetching posts:', error);
        });
        console.log('Fetch request sent.');
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