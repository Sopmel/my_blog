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
            const response = await axios.get('https://my-blog-frontend-nepw.onrender.com/user/userlist');
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


    const deleteUser = async (userId) => {
        try {
            await axios.delete(`https://my-blog-frontend-nepw.onrender.com/user/${userId}`);
            fetchUsers();
            alert('User deleted');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const upgradeUser = async (userId) => {
        try {
            console.log('Upgrading user with ID:', userId);
            await axios.put(`https://my-blog-frontend-nepw.onrender.com/user/upgrade/${userId}`, { isAdmin: true }, { withCredentials: true });
            fetchUsers();
            alert('User upgraded to admin');
        } catch (error) {
            console.error('Error upgrading user:', error);
        }

    };

    const downgradeUser = async (userId) => {
        try {
            console.log('Downgrading user with ID:', userId);
            await axios.put(`https://my-blog-frontend-nepw.onrender.com/user/downgrade/${userId}`, { isAdmin: false }, { withCredentials: true });
            fetchUsers();
            alert('User downgraded from admin');
        } catch (error) {
            console.error('Error downgrading user:', error);
        }
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
                        <div className="user" key={user._id}>
                            <div className='username'>
                                <Link to={`/profilepage/${user._id}`}>{user.username}</Link>
                            </div>
                            <div className='user-btns'>
                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                                <button onClick={() => user.isAdmin ? downgradeUser(user._id) : upgradeUser(user._id)}>
                                    {user.isAdmin ? 'Remove as Admin' : 'Upgrade to Admin'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );

}