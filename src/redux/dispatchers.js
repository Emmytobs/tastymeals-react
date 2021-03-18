import {
    SAVE_TOKENS,
    SAVE_USER_DATA,
    SAVE_MEALS,
    SAVE_ADMIN_RESTAURANT_PROFILE,
    ADD_ORDER,
    REMOVE_ORDER,
    SAVE_FOOD_CATEGORIES
} from './actionNames'

export function saveTokens(payload, dispatch) {
    dispatch({ type: SAVE_TOKENS, payload })
}

export function saveUserData(payload, dispatch) {
    dispatch({ type: SAVE_USER_DATA, payload })
}

export function saveMeals(payload, mealCategory, dispatch) {
    dispatch({ type: SAVE_MEALS, mealCategory, payload })
}

export function saveAdminRestaurantProfile(payload, dispatch) {
    dispatch({ type: SAVE_ADMIN_RESTAURANT_PROFILE, payload })
}

export function addOrder(payload, dispatch) {
    dispatch({ type: ADD_ORDER, payload })
}

export function removeOrder(payload, dispatch) {
    dispatch({ type: REMOVE_ORDER, payload })
}

export function saveFoodCategories(payload, dispatch) {
    dispatch({ type: SAVE_FOOD_CATEGORIES, payload })
}