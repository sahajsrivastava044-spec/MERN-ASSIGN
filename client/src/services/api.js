import axios from 'axios';


const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL || 'http://localhost:5000',
    timeout:10000,
    headers:{
        'Content-Type':'application/json',
    },
});

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');
       console.log(token,"ABC")
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response && error.respoinse.status===401){
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            window.location.href='/login';

            console.log('Seddion expired. Please login again.');
        }
        return Promise.reject(error);
    }
)

export default api;