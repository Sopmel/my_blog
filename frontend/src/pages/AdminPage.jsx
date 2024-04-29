import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/adminpage.css'

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/user');
            setUsers(response.data);
            console.log("res-data:", response.data);
            setShowUsers(false);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const toggleUsersVisibility = () => {
        setShowUsers(!showUsers);
        console.log(showUsers)
    };

    return (
        <div className='admin-container'>
            <div>AdminPage</div>

            <button
                className="admin-btn"
                onClick={toggleUsersVisibility}
            >
                {showUsers ? 'Hide list of users' : 'Show list of users'}
            </button>

            {showUsers && (
                <div>
                    {/* Loopa igenom varje användare och rendera en länk för varje användare */}
                    {users.map(user => (
                        <div key={user._id}>
                            {/* Använd Link för att länka till användarens profil */}
                            <Link to={`/profilepage/${user._id}`}>{user.username}</Link>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );

}