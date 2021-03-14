import {
    SAVE_TOKENS,
    SAVE_USER_DATA,
    SAVE_MEAL_BY_ADMIN,
    SAVE_ADMIN_RESTAURANT_PROFILE,
    ADD_MEAL_TO_CART,
    REMOVE_MEAL_FROM_CART
} from './actionNames'

export function saveTokens(payload, dispatch) {
    dispatch({ type: SAVE_TOKENS, payload })
}

export function saveUserData(payload, dispatch) {
    dispatch({ type: SAVE_USER_DATA, payload })
}

export function saveMealByAdmin(payload, dispatch) {
    dispatch({ type: SAVE_MEAL_BY_ADMIN, payload })
}

export function saveAdminRestaurantProfile(payload, dispatch) {
    dispatch({ type: SAVE_ADMIN_RESTAURANT_PROFILE, payload })
}

export function addMealToCart(payload, dispatch) {
    dispatch({ type: ADD_MEAL_TO_CART, payload })
}

export function removeMealFromCart(payload, dispatch) {
    dispatch({ type: REMOVE_MEAL_FROM_CART, payload })
}