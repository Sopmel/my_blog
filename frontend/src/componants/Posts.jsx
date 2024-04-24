import React from "react";

export default function Post({ post }) {
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
                <img src={post.cover} alt="Cover" />
            </div>
            <div className="texts">
                <h2>{post.title}</h2>
                <p className="info">
                    <a className="author">{author}</a>
                    <time>{formattedDate}</time>
                </p>
                <p className="summary">{post.summary}</p>
            </div>
        </div>
    );
}
