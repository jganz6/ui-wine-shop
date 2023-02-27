// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import AxiosInstance from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from 'store/slices/snackbar';

// ----------------------------------------------------------------------

const initialState = {
    loading: false,
    error: null,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null,
    warehouses: [],
    orders: [],
    transactions: []
};

const slice = createSlice({
    name: 'warehouse',
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

        // GET WAREHOUSES
        getWarehousesSuccess(state, action) {
            state.warehouses = action.payload;
        },

        // ADD WAREHOUSE
        addWarehouseSuccess(state, action) {
            state.warehouses = action.payload;
        },

        // UPDATE WAREHOUSE
        editWarehouseSuccess(state, action) {
            state.warehouses = action.payload;
        },

        // DELETE WAREHOUSE
        deleteWarehouseSuccess(state, action) {
            state.warehouses = action.payload;
        },

        // GET ORDERS
        getOrdersSuccess(state, action) {
            state.orders = action.payload;
        },

        // GET TRANSACTIONS
        getTransactionsSuccess(state, action) {
            state.transactions = action.payload;
        },

        loading(state, action) {
            state.loading = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getWarehouses() {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            const response = await AxiosInstance.get('/warehouse');
            dispatch(slice.actions.getWarehousesSuccess(response.data.data));
            dispatch(slice.actions.loading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.loading(false));
        }
    };
}

export function addWarehouse(warehouse) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            const response = await AxiosInstance.post('/warehouse', warehouse);
            dispatch(slice.actions.addWarehouseSuccess(response.data));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Create new warehouse',
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
                    message: 'Failed - Create new warehouse',
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

export function editWarehouse(warehouse) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            const response = await AxiosInstance.patch(`/warehouse/${warehouse.id}`, warehouse);
            dispatch(slice.actions.editWarehouseSuccess(response.data));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Update warehouse',
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
                    message: 'Failed - Update warehouse',
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

export function deleteWarehouse(warehouse) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            const response = await AxiosInstance.delete(`/warehouse/${warehouse.id}`);
            dispatch(slice.actions.deleteWarehouseSuccess(response.data));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Delete warehouse',
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
                    message: 'Failed - Delete warehouse',
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

export function getOrders(type) {
    return async () => {
        try {
            let response;
            switch (type) {
                case 'request':
                    response = await AxiosInstance.get('/warehouse/order');
                    break;
                case 'delivery':
                    response = await AxiosInstance.get('/warehouse/order-delivery');
                    break;
                case 'returned':
                    response = await AxiosInstance.get('/warehouse/order-returned');
                    break;
                case 'sales':
                    response = await AxiosInstance.get('/warehouse/sales');
                    break;
                default:
                    response = await AxiosInstance.get('/warehouse/order');
            }
            dispatch(slice.actions.getOrdersSuccess(response.data.orders));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getTransactions(type) {
    return async () => {
        try {
            let response;
            switch (type) {
                case 'request':
                    response = await AxiosInstance.get('/warehouse/transaction');
                    break;
                case 'delivery':
                    response = await AxiosInstance.get('/warehouse/transaction-delivery');
                    break;
                case 'returned':
                    response = await AxiosInstance.get('/warehouse/transaction-returned');
                    break;
                case 'sales':
                    response = await AxiosInstance.get('/warehouse/transaction-success');
                    break;
                default:
                    response = await AxiosInstance.get('/warehouse/transaction');
            }
            dispatch(slice.actions.getTransactionsSuccess(response.data.transactions));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
