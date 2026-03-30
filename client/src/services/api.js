import axios from 'axios';


const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL || 'http://localhost:5000',
    timeout:10000,
    headers:{
        'Content-Type':'application/json',
    },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



api.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response && error.response.status===401){
            console.log("401 error:", error.response.data);
            // localStorage.removeItem('token');
            // localStorage.removeItem('user');

            // window.location.href='/login';

            console.log('Session expired. Please login again.');
        }
        return Promise.reject(error);
    }
)

export default api;