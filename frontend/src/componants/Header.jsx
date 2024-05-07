import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext";

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);
    console.log("header userinfo:", userInfo)

    useEffect(() => {
        fetch('http://localhost:3000/user/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, []);

    async function logout() {
        try {
            await fetch('http://localhost:3000/user/logout', {
                method: 'POST',
                credentials: 'include', // Include credentials
            });
            setUserInfo({});
            window.location.href = "/login"
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }


    const username = userInfo?.username;


    return (
        <header>
            <div className="header-content">
                <div className="user-info">
                    {username && (
                        <div className="username">{username}'s</div>
                    )}
                </div>
                <div className="logo-container">
                    <Link to="/" className="logo">
                        BlogSpot
                    </Link>
                </div>
            </div>

            <nav>
                {userInfo.isAdmin && (
                    <Link to='/adminpage'>admin</Link>
                )}

                {username && (
                    <>
                        <Link to={`/profilepage/${userInfo.id}`}>Profile</Link>
                        <Link to="/create">Create new post</Link>
                        <a className="logout-btn" onClick={() => {
                            logout();
                        }}>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login" >Login </Link>
                        <Link to="/register" >Register</Link>
                    </>
                )}

            </nav>
        </header>
    )
}