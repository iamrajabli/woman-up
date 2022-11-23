import { api } from '../api/api.config';

const AuthService = {
    login: (email, password) => {
        return api.post('/auth/login', { email, password })
    },
    register: (email, password) => {
        return api.post('/auth/register', { email, password })
    }
}

export default AuthService;