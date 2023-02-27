// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import agentReducer from './slices/agent';
import cartReducer from './slices/cart';
import inventoryReducer from './slices/inventory';
import menuReducer from './slices/menu';
import snackbarReducer from './slices/snackbar';
import transactionReducer from './slices/transaction';
import userReducer from './slices/user';
import warehouseReducer from './slices/warehouse';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    menu: menuReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'barookah-'
        },
        cartReducer
    ),
    snackbar: snackbarReducer,
    agent: agentReducer,
    inventory: inventoryReducer,
    transaction: transactionReducer,
    user: userReducer,
    warehouse: warehouseReducer
});

export default reducer;
