import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Axios = axios.create({
    // baseURL: 'http://localhost:8889',
    timeout: 2000
})

Axios.interceptors.request.use(config => {
    const token = sessionStorage.getItem('demo-token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        Redirect('/login')
    }
    return config
})

export default Axios