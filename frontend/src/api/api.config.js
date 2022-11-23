import axios from 'axios';


export const apiAuth = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

apiAuth.interceptors.request.use(
    config => {
        const { accessToken } = JSON.parse(localStorage.getItem('user')) || {};

        if (accessToken) {
            config.headers['x-access-token'] = `Bearer ${accessToken}`;
        }
        return config;
    }
);


export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});