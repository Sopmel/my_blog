import React, { useState } from 'react';

export default function CommentForm({ postId, onCommentAdd }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }

            const newComment = await response.json();
            onCommentAdd(newComment); // Add new comment to state
            setContent(''); // Clear textarea
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                rows="4"
                cols="50"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your comment here..."
            ></textarea>
            <button type="submit">Submit</button>
        </form>
    );
}
