/* eslint-disable class-methods-use-this */
import AxiosInstance from '../axios';
import { setToken, purgeToken } from '../token';

export const login = async (payload) => {
    try {
        const response = await AxiosInstance.post('auth/login', payload);
        return response;
    } catch (errors) {
        return errors.response;
    }
};

export const getUserDetail = async () => {
    try {
        const response = await AxiosInstance.get('/users/detail');
        return response;
    } catch (errors) {
        return errors.response;
    }
};

export const accountActivation = async (payload) => {
    try {
        const response = await AxiosInstance.post('/auth/activation', payload);
        return response;
    } catch (errors) {
        return errors.response;
    }
};
export const resetPassword = async (payload) => {
    try {
        const response = await AxiosInstance.post('/auth/reset-password', payload);
        return response;
    } catch (errors) {
        return errors.response;
    }
};
export const forgotPassword = async (payload) => {
    try {
        const response = await AxiosInstance.post('/auth/send-email-reset-password', payload);
        return response;
    } catch (errors) {
        return errors.response;
    }
};

export const revoke = async (refreshToken) => {
    try {
        window.localStorage.setItem('tokenHasBeenRefreshed', true);
        const response = await AxiosInstance.post('auth/revoke', null, { headers: { Authorization: `bearer ${refreshToken}` } });
        if (response.status === 200) {
            await setToken(response.data.data);
            response.config.headers.Authorization = `bearer {${response.data.data.accessToken}}`;
            window.localStorage.removeItem('tokenHasBeenRefreshed');
        }
        return response;
    } catch (errors) {
        await purgeToken();
        window.location.href = '/login';
        return errors;
    }
};

export const logoutUser = async () => {
    try {
        const response = await AxiosInstance.post('auth/logout');
        if (response.status === 200) {
            purgeToken();
            window.location.href = '/login';
        }
        return response;
    } catch (errors) {
        return errors;
    }
};
