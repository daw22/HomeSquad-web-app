import React, { useState } from "react";

export const userContext = React.createContext();

const UserContextProvider = ({children}) => {
    const [logedIn, setLogedIn] = useState(false);

    const data = {
        logedIn, 
        setLogedIn
    };
    
    return <userContext.Provider value={data}>
        {children}
    </userContext.Provider>
}

export default UserContextProvider;