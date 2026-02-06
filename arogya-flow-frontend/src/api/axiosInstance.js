import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:"http://localhost:5000/api",
    headers:{
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error: ", error?.response || error?.message);
        return Promise.reject(error);
    }
);