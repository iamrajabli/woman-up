
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState('');


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setAuth(user);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;