// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axiosMock';
import AxiosInstance from 'utils/axios';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    loading: false,
    fetching: false,
    error: null,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null,
    transactions: [],

    purchaseOrderList: [],
    purchaseDetail: [],

    receiveList: []
};

const slice = createSlice({
    name: 'transaction',
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

        // GET TRANSACTIONS
        getTransactionsSuccess(state, action) {
            state.transactions = action.payload;
        },
        getPurchaseOrderSuccess(state, action) {
            state.purchaseOrderList = action.payload;
        },
        getPurchaseDetailSuccess(state, action) {
            state.purchaseDetail = action.payload;
        },
        getReceiveListSuccess(state, action) {
            state.receiveList = action.payload;
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

export function getTransactions() {
    return async () => {
        try {
            const response = await axios.get('/api/transaction/list');
            dispatch(slice.actions.getTransactionsSuccess(response.data.transactions));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

// =============== ADMIN: PURCHASE ORDER ========================//
export function getPurchaseOrder() {
    return async () => {
        try {
            dispatch(slice.actions.fetching(true));
            dispatch(slice.actions.hasError(null));
            const response = await AxiosInstance.get('items/invoice');
            dispatch(slice.actions.getPurchaseOrderSuccess(response.data.data));
            dispatch(slice.actions.fetching(false));
        } catch (error) {
            dispatch(slice.actions.fetching(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}
export function createPurchaseOrder(order) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            dispatch(slice.actions.hasErrorCreate(null));

            await AxiosInstance.post('items/invoice', order);
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Success - Create new purchase order',
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
                    message: 'Failed - Create new purchase order',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            dispatch(slice.actions.feloadingtching(false));
            dispatch(slice.actions.hasErrorCreate(error));
        }
    };
}

export function getPurchaseDetail(id) {
    return async () => {
        try {
            dispatch(slice.actions.fetching(true));
            dispatch(slice.actions.hasError(null));
            const response = await AxiosInstance.get(`items/invoice/${id}`);
            dispatch(slice.actions.getPurchaseDetailSuccess(response.data.data));
            dispatch(slice.actions.fetching(false));
        } catch (error) {
            dispatch(slice.actions.fetching(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

// =============== WAREHOUSE: RECEIVE LIST ========================//
export function getReceiveList({ user, id, type }) {
    return async () => {
        try {
            dispatch(slice.actions.fetching(true));

            let response;
            if (user.role === '29') {
                response = await AxiosInstance.get(`/items/invoice?id_warehouse=${id}&status=${type}`);
            } else {
                response = await AxiosInstance.get(`/items/invoice?status=${type}`);
            }

            dispatch(slice.actions.getReceiveListSuccess(response.data.data));
            dispatch(slice.actions.fetching(false));
        } catch (error) {
            dispatch(slice.actions.fetching(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}
