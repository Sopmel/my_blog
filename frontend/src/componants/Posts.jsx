import React from "react";
import { Link } from "react-router-dom";
import '../styles/Post.css'

export default function Post({ _id, post }) {
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
                    <a className="author">{author}</a>
                    <time>{formattedDate}</time>
                </p>
                <p className="summary">{post.summary}</p>
            </div>
        </div>
    );
}
