import axios from 'axios';
import { revoke } from './services/auth.services';
import { getToken, setToken, purgeToken } from './token';

/**
 * Create Axios instance.
 */
const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BACKEND,
    headers: {
        Authorization: `bearer ${getToken('ACCESS_TOKEN')}`
    }
});

/**
 * Default request interceptor axios.
 */
AxiosInstance.interceptors.request.use(
    (config) => {
        if (config.url !== 'auth/revoke' || config.url !== 'auth/logout')
            config.headers.Authorization = `bearer ${getToken('ACCESS_TOKEN')}`;
        if (config.url === 'auth/logout') config.headers.Authorization = `bearer ${getToken('REFRESH_TOKEN')}`;
        return config;
    },
    (errors) => Promise.reject(errors)
);

/**
 * Default response interceptors axios.
 */
AxiosInstance.interceptors.response.use(
    (response) => response,
    async (errors) => {
        /**
         * IF THE REQUEST ERROR GET STATUS CODE : 401
         * THEN CHECK THE MESSAGES ERROR.
         * IF THE MESSAGES ERROR IS EXPIRED TOKEN.
         * THEN REFRESH TOKEN AND RUNNING AGAIN AXIOS WITH BEFORE CONFIGURATION
         */
        const oldConfigAxios = errors.config;
        const statusCode = errors?.response?.status;
        const messageErrors = errors?.response?.data?.message;
        if (statusCode === 401 && (messageErrors === 'Expired token...' || messageErrors === 'Expired token ...')) {
            // THIS LINE LOGIC FOR REFRESH TOKEN.
            // GET AXIOS CONFIGURATION BEFORE.
            // GET VARIABLE TO PREVENT LOOP IF ANY ERRORS WHEN REFRESHED THE TOKEN.
            const tokenHasBeenRefreshed = window.localStorage.getItem('tokenHasBeenRefreshed');
            // IF THE TOKEN HAS NOT BEEN REFRESHED, IT WILL BE REFRESHED.
            if (!tokenHasBeenRefreshed) {
                // REFRESH TOKEN NOW IN THIS LINE.
                const refreshToken = getToken('REFRESH_TOKEN');
                const resToken = await revoke(refreshToken);
                await setToken(resToken.data.data);
                if (resToken.status === 200) {
                    // SET NEW HEADER TOKEN TO OLDER CONFIG AXIOS.
                    oldConfigAxios.headers.Authorization = `bearer ${getToken('ACCESS_TOKEN')}`;
                    return AxiosInstance(oldConfigAxios);
                }
            }
        } else if (statusCode === 401 && errors.config.url !== 'auth/login') {
            purgeToken();
            window.location.href = '/login';
        }
        return Promise.reject(errors);
    }
);

export default AxiosInstance;
