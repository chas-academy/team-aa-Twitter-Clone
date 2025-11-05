import axios from 'axios';

// Use environment variable or fallback to production URL
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://team-aa-twitter-clone.onrender.com/api',
    withCredentials: false,
});

//attach token to every request if exists
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;