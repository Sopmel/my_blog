import { useState } from "react";

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(ev) {
        ev.preventDefault();

        const response = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 201) {
            alert('Registration Successfull')
            setUsername('');
            setPassword('');
        } else {
            alert('Registration Failed')
            setUsername('');
            setPassword('');
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)} />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <button type="submit">Register</button>

        </form>
    );
}

export default RegisterPage;
