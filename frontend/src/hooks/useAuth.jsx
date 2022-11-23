import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../services/auth.service";
import { AuthContext } from "../app/contexts/AuthProvider";


const useAuth = (process) => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    const auth = async (email, password) => {
        try {
            const { data } = await AuthService[process](email, password)
            setAuth(data)
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/')

        } catch (e) {
            setError(e.response.data.message);
        }
    }

    return { error, auth }
}

export default useAuth