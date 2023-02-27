/**
 * axios setup to use mock service
 */

import axios from 'axios';
import { getToken } from './token';

const axiosServices = axios.create({
    baseURL: process.env.REACT_APP_API_BACKEND,
    headers: {
        Authorization: `bearer ${getToken('ACCESS_TOKEN')}`
    }
});

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
