import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import productReducer from './slices/product-slice';
import currencyReducer from './slices/currency-slice';
import cartReducer from './slices/cart-slice';
import compareReducer from './slices/compare-slice';
import wishlistReducer from './slices/wishlist-slice';
import authReducer from './slices/auth-slice';

const persistConfig = {
    key: 'mundolapa',
    version: 1.1,
    storage,
    blacklist: ['product'],
};

const rootReducer = combineReducers({
    product: productReducer,
    currency: currencyReducer,
    cart: cartReducer,
    compare: compareReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
