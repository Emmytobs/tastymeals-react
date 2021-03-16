import {
    SAVE_TOKENS,
    SAVE_USER_DATA,
    SAVE_MEALS,
    SAVE_ADMIN_RESTAURANT_PROFILE,
    ADD_MEAL_TO_CART,
    REMOVE_MEAL_FROM_CART,
    SAVE_FOOD_CATEGORIES
} from './actionNames'

import { initialState } from './store'

function reducer(state=initialState, action) {
    switch (action.type) {
        case SAVE_TOKENS:
            return { ...state, accessToken: action.payload[0], refreshToken: action.payload[1] }

        case SAVE_USER_DATA:
            return { ...state, user: { ...action.payload } }
        
        case SAVE_MEALS:
            return { ...state, meals: { ...state.meals, [action.mealCategory]: [...action.payload] }}
            
        case SAVE_ADMIN_RESTAURANT_PROFILE:
            return { ...state, adminRestaurantProfile: { ...action.payload } }

        case ADD_MEAL_TO_CART:
            return { ...state, cart: [...state.cart, action.payload] }
        
        case REMOVE_MEAL_FROM_CART:
            return removeCartItem(state, action)

        case SAVE_FOOD_CATEGORIES:
            return { ...state, foodCategories: action.payload }

        default:
            return state    
    }
}

export default reducer

function removeCartItem(state, action) {
    const _state = { ...state };
    const updatedCart = _state.cart.filter(item => item.id !== action.payload);
    return { ...state, cart: updatedCart };
}