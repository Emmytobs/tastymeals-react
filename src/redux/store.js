import reducer from './reducer'
import { createStore } from 'redux';

export const initialState = {
    accessToken: '',
    refreshToken: '',
    user: {},
    cart: [],
    orders: '',
    favorites: '',
    mealsByAdmin: [],
    adminRestaurantProfile: ''
}

function loadStoreInLocalStorage() {
    try {
        const stateInLocalStorage = localStorage.getItem('tasty-meals-app-state')
        if (!stateInLocalStorage) {
            return initialState
        }
        return JSON.parse(stateInLocalStorage);
    } catch (error) {
        console.log(error)
    }
}

function saveStoreInLocalStorage(state) {
    try {
        localStorage.setItem('tasty-meals-app-state', JSON.stringify(state))
    } catch (error) {
        console.log(error)
    }
}

const persistedState = loadStoreInLocalStorage()

const store = createStore(
    reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Try this out sometime :))
// store.subscribe(() => console.log('Store state changed'));
store.subscribe(() => saveStoreInLocalStorage(store.getState()));

export default store; 