import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({});

    const updateUserContext = (newUserInfo) => {
        setUserInfo({ ...userInfo, ...newUserInfo });
    };

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo: updateUserContext }}>
            {children}
        </UserContext.Provider>
    );
}
