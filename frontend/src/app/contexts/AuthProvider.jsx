
import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState('');


    // Определяем авторизован ли пользователь и если закончился токен, то выходим
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setAuth(user);

            const token = jwt_decode(user.accessToken); 
            const deadline = new Date(0);
            deadline.setUTCSeconds(token.exp)
            if (deadline - new Date().getTime() < 0) {
                localStorage.removeItem('user');
                setAuth('');
            }

        }
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;