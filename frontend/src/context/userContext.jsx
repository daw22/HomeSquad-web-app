import React, { useState } from "react";

export const userContext = React.createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const data = {
        user,
        setUser
    };
    
    return <userContext.Provider value={data}>
        {children}
    </userContext.Provider>
}

export default UserContextProvider;