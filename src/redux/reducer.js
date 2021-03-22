import {
    SAVE_TOKENS,
    SAVE_USER_DATA,
    SAVE_MEALS,
    REMOVE_FAVORITED_MEAL,
    SAVE_ADMIN_RESTAURANT_PROFILE,
    ADD_ORDER,
    REMOVE_ORDER,
    SAVE_FOOD_CATEGORIES,
    CHANGE_COLOR_THEME
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

        case ADD_ORDER:
            return { ...state, order: {...state.order, ...action.payload} }
        
        case REMOVE_ORDER:
            return { ...state, order: {} }

        case SAVE_FOOD_CATEGORIES:
            return { ...state, foodCategories: action.payload }


        case CHANGE_COLOR_THEME:
            return { ...state, colorMode: action.payload }

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

// function removeFavoritedMeal(state, action) {
//     const _state = {...state};
//     const updatedFavoritedMeals = _state.meals['FAVORITES'].filter(meal => meal.mealid !== action.payload)
//     return { ...state, meals: { ...state.meals, 'FAVORITES': updatedFavoritedMeals }}
// }