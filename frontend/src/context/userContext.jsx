import React, { useState } from "react";

export const userContext = React.createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');

    const data = {
        user,
        setUser,
        role,
        setRole
    };
    
    return <userContext.Provider value={data}>
        {children}
    </userContext.Provider>
}

export default UserContextProvider;