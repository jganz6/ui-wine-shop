// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import AxiosInstance from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from 'store/slices/snackbar';
import formData from 'utils/formData';

// ----------------------------------------------------------------------

const initialState = {
    loading: false,
    fetching: false,
    error: null,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null,
    inventories: []
};

const slice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
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

        getInventoriesSuccess(state, action) {
            state.inventories = action.payload;
        },
        addInventorySuccess(state, action) {
            state.inventories = action.payload;
        },
        editInventorySuccess(state, action) {
            state.inventories = action.payload;
        },
        deleteInventorySuccess(state, action) {
            state.inventories = action.payload;
        },

        // LOADING
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

export function getInventories() {
    return async () => {
        try {
            dispatch(slice.actions.fetching(true));
            const response = await AxiosInstance.get('/items');
            dispatch(slice.actions.getInventoriesSuccess(response.data.data));
            dispatch(slice.actions.fetching(false));
        } catch (error) {
            dispatch(slice.actions.fetching(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function addInventory(inventory) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            const payload = await formData(inventory);
            await AxiosInstance.post('items', payload);
            dispatch(slice.actions.addInventorySuccess([]));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Create new item',
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
                    message: 'Failed - Create new item',
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

export function editInventory(id, inventory) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            const payload = await formData(inventory);
            await AxiosInstance.patch(`items/${id}`, payload);
            dispatch(slice.actions.editInventorySuccess([]));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Edit item',
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
                    message: 'Failed - Edit item',
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

export function deleteInventory(id) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            await AxiosInstance.delete(`/items/${id}`);
            dispatch(slice.actions.deleteInventorySuccess([]));
            dispatch(slice.actions.loading(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Delete item',
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
                    message: 'Failed - Delete item',
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
