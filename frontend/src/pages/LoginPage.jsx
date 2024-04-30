import { useState, useContext } from "react";
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext";


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRederect] = useState(false);

    const { setUserInfo } = useContext(UserContext);


    async function login(ev) {
        ev.preventDefault();

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRederect(true);
            })
        } else {
            alert('login failed')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />

            <button>Login</button>
        </form>
    )
}

export default LoginPage;