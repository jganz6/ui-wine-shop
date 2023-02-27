/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// action - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import { login, logoutUser, getUserDetail, accountActivation, forgotPassword, resetPassword } from 'utils/services/auth.services';
import { getToken, setToken, getUserData } from 'utils/token';
import { decryptData, encodeData } from 'utils/base64';

// const
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

// ==============================|| AUTH CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        async function checkingLogin() {
            const token = await getToken('ACCESS_TOKEN');
            const data = decryptData(window.localStorage.getItem('@_ui_us') ? window.localStorage.getItem('@_ui_us') : {});
            if (token && data) {
                const userData = await getUserData();
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user: {
                            full_name: `${userData.first_name} ${userData.last_name}`,
                            ...userData
                        }
                    }
                });
            } else {
                dispatch({
                    type: LOGOUT
                });
            }
        }
        checkingLogin();
    }, [dispatch]);

    const getUserInfo = async () => {
        const res = await getUserDetail();
        if (res.status === 200) {
            const data = encodeData(res.data.data);
            window.localStorage.setItem('@_ui_us', data);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user: {
                        full_name: `${res.data.data.first_name} ${res.data.data.last_name}`,
                        ...res.data.data
                    }
                }
            });
        }
    };

    const submitLogin = async (email, password) => {
        const res = await login({ email, pw: password });
        if (res.status !== 201) {
            return res;
        } else {
            setToken(res.data.data);
            getUserInfo();
        }
    };

    const submitActivation = async (otp, password) => {
        const res = await accountActivation({ token_activation: otp, pw: password });
        return res;
    };

    const submitResetPassword = async (otp, password) => {
        const res = await resetPassword({ token_activation: otp, pw: password });
        return res;
    };

    const submitForgotPassword = async (email) => {
        const res = forgotPassword({ email });
        if (res.status !== 200) {
            return res;
        }
    };

    const logout = async () => {
        try {
            const response = await logoutUser();
            dispatch({
                type: LOGOUT
            });
            return response;
        } catch (errors) {
            return errors;
        }
    };

    const updateProfile = () => {};
    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                submitLogin,
                getUserInfo,
                submitActivation,
                submitForgotPassword,
                submitResetPassword,
                logout,
                updateProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthContext;
