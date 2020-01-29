import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import ticketsReducer from './car-quiz/car-quiz.reducer';

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['cart']
}

const rootReducer = combineReducers({
    tickets: ticketsReducer
});

export default persistReducer(persistConfig, rootReducer);