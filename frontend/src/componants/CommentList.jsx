import React from 'react';

export default function CommentList({ comments }) {
    return (
        <div className="comment-list">
            <h3>Comments</h3>
            {comments.map((comment) => (
                <div key={comment._id} className="comment">
                    <p>{comment.content}</p>
                    <p>By: {comment.author.username}</p>
                </div>
            ))}
        </div>
    );
}