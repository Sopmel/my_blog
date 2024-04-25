import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function PostPage() {
    const [postInfo, setPostInfo] = useState({})
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                })
            })
    }, []);

    if (!postInfo) return <div>Loading...</div>;
    return (
        <div className="post-page">

            <div className="image">
                <img src={postInfo.cover} />
            </div>

            <h1>{postInfo.title}</h1>
            <p>{postInfo.content} </p>
        </div>
    )
}