import { useEffect, useState } from "react";
import Editor from "../Editor";
import { useParams, Navigate } from "react-router-dom";

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title)
                    setSummary(postInfo.summary)
                    setContent(postInfo.content)
                    console.log("postInfo:", postInfo)
                });
            });
    }, []);

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        console.log('title: ', title)
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        console.log(data)


        const response = await fetch(`http://localhost:3000/post/${id}`, {
            method: 'PUT',
            credentials: 'include',
            body: data,
        });
        if (response.ok) {
            console.log('Post updated successfully', response);
            setRedirect(true)
        }

    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    return (
        <form onSubmit={updatePost}>
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
            <Editor
                value={content}
                onChange={setContent}
            />

            <button style={{ marginTop: '5px' }}>Update post</button>
        </form>
    );
}