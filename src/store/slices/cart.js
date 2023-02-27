// third-party
import { createSlice } from '@reduxjs/toolkit';

// ------------------------------------------------------------
const initialState = {
    listItem: []
};

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.listItem =
                state.listItem.findIndex((obj) => obj.id === action.payload.id) === -1
                    ? [...state.listItem, action.payload]
                    : [...state.listItem];
        },
        deleteItem(state, action) {
            state.listItem = state.listItem.filter((value) => value.id !== action.payload.id);
        }
    }
});

// Reducer
export default cart.reducer;

export const { addItem, deleteItem } = cart.actions;
