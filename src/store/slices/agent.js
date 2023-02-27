// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import AxiosInstance from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from 'store/slices/snackbar';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    agents: []
};

const slice = createSlice({
    name: 'agent',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET USERS
        getAgentsSuccess(state, action) {
            state.agents = action.payload;
        },

        // ADD USER
        addAgentSuccess(state, action) {
            state.agents = action.payload;
        },

        // UPDATE USER
        editAgentSuccess(state, action) {
            state.agents = action.payload;
        },

        // DELETE USER
        deleteAgentSuccess(state, action) {
            state.agents = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAgents() {
    return async () => {
        try {
            const response = await AxiosInstance.get('/users?role=Agent');
            dispatch(slice.actions.getAgentsSuccess(response.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addAgent(user) {
    return async () => {
        try {
            const response = await AxiosInstance.post('/api/agent', user);
            dispatch(slice.actions.addAgentSuccess(response.data));
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
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function editAgent(user) {
    return async () => {
        try {
            const response = await AxiosInstance.patch('/api/agent', user);
            dispatch(slice.actions.editAgentSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function deleteAgent(user) {
    return async () => {
        try {
            const response = await AxiosInstance.post('/api/agent/delete', user);
            dispatch(slice.actions.deleteAgentSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
