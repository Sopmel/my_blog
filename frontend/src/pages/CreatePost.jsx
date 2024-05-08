import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { axiosRequest } from '../../config';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleCreatePost(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        try {
            const response = await axiosRequest.post('/post', data, {
                withCredentials: true
            });

            if (response.status === 201) {
                setRedirect(true);
            } else if (response.status === 400) {
                alert('Missing fields');
            } else {
                console.error('Server error:', response.status);
            }
        } catch (error) {
            console.error('Axios request error:', error);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={handleCreatePost}>
            <input type="title"
                placeholder={'Title'}
                value={title}
                onChange={ev => setTitle(ev.target.value)} />

            <input type="summary"
                placeholder={'Summary'}
                value={summary}
                onChange={ev => setSummary(ev.target.value)} />

            <input type="file"
                onChange={ev => setFiles(ev.target.files)} />
            <Editor value={content} onChange={setContent} />

            <button style={{ marginTop: '5px' }}>Create post</button>
        </form>
    );
}

export default CreatePost;
