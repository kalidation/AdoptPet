import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import router from './router';
import purgeStoredState from 'redux-persist/es/purgeStoredState';
import { createStore, applyMiddleware } from 'redux';

const middlewares = [ReduxThunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};


const persistedReducer = persistReducer(persistConfig, router);

export default () => {
    const store = createStore(
        persistedReducer,
        applyMiddleware(...middlewares)
    );
    const persistor = persistStore(store);
    return { store, persistor };
};