import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getDashboardMetrics = async () => {
    const response = await api.get('/dashboard/');
    return response.data;
};

export const getInsights = async () => {
    const response = await api.get('/insights/');
    return response.data;
};

export const createComplaint = async (complaintData) => {
    const response = await api.post('/complaints/', complaintData);
    return response.data;
};

export const getClusters = async () => {
    const response = await api.get('/clusters/');
    return response.data;
};

// Add interceptor for auth token
api.interceptors.request.use((config) => {
    // We try to get token from localStorage. The token is stored as "token" based on AuthContext
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
