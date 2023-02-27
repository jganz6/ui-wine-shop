// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import AxiosInstance from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from 'store/slices/snackbar';

// ----------------------------------------------------------------------

const initialState = {
    loading: false,
    fetching: false,
    error: null,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null,
    users: []
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        hasErrorCreate(state, action) {
            state.errorCreate = action.payload;
        },
        hasErrorUpdate(state, action) {
            state.errorUpdate = action.payload;
        },
        hasErrorDelete(state, action) {
            state.errorDelete = action.payload;
        },

        // GET USERS
        getUsersSuccess(state, action) {
            state.users = action.payload;
        },

        // ADD USER
        addUserSuccess(state, action) {
            state.users = action.payload;
        },

        // UPDATE USER
        editUserSuccess(state, action) {
            state.users = action.payload;
        },

        // DELETE USER
        deleteUserSuccess(state, action) {
            state.users = action.payload;
        },

        loading(state, action) {
            state.loading = action.payload;
        },

        fetching(state, action) {
            state.fetching = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsers() {
    return async () => {
        try {
            dispatch(slice.actions.fetching(true));
            const response = await AxiosInstance.get('/users');
            dispatch(slice.actions.getUsersSuccess(response.data.data));
            dispatch(slice.actions.fetching(false));
        } catch (error) {
            dispatch(slice.actions.fetching(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addUser(user) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            dispatch(slice.actions.hasErrorCreate(null));

            await AxiosInstance.post('auth', user);
            dispatch(slice.actions.addUserSuccess([]));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Create new user',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );

            dispatch(slice.actions.loading(false));
        } catch (error) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Failed - Create new user',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            dispatch(slice.actions.hasErrorCreate(error.response?.data));
            dispatch(slice.actions.loading(false));
        }
    };
}

export function editUser(id, user) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            await AxiosInstance.patch(`users/${id}`, user);
            dispatch(slice.actions.editUserSuccess([]));
            dispatch(slice.actions.loading(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Edit user',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
        } catch (error) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Failed - Edit user',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            dispatch(slice.actions.hasErrorUpdate(error.response?.data));
            dispatch(slice.actions.loading(false));
        }
    };
}

export function deleteUser(id) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            await AxiosInstance.delete(`/users/${id}`);
            dispatch(slice.actions.deleteUserSuccess([]));
            dispatch(slice.actions.loading(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Delete user',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
        } catch (error) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Failed - Delete user',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            dispatch(slice.actions.loading(false));
            dispatch(slice.actions.hasErrorDelete(error.response?.data));
        }
    };
}

export function updateProfile(body) {
    return async () => {
        try {
            await AxiosInstance.patch(`/users`, body);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Edit Profile ',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );

            dispatch(slice.actions.loading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error.response?.data));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Failed - Edit Profile',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
            dispatch(slice.actions.loading(false));
        }
    };
}
