import axios from 'axios';

const api = axios.create({
    baseURL: 'https://team-aa-twitter-clone.onrender.com',
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