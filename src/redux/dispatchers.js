import {
    SAVE_TOKENS,
    SAVE_USER_DATA,
    SAVE_MEAL_BY_ADMIN
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