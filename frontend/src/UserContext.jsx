import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({ likedPosts: [] });

    const updateUserContext = (newUserInfo) => {
        setUserInfo({
            ...userInfo,
            ...newUserInfo,
            isLoggedIn: !!newUserInfo.id,
        });
    };

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo: updateUserContext }}>
            {children}
        </UserContext.Provider>
    );
}
