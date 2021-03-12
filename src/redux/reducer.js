import {
    SAVE_TOKENS,
    SAVE_USER_DATA,
    SAVE_MEAL_BY_ADMIN
} from './actionNames'

import { initialState } from './store'

function reducer(state=initialState, action) {
    switch (action.type) {
        case SAVE_TOKENS:
            return { ...state, accessToken: action.payload[0], refreshToken: action.payload[1] }

        case SAVE_USER_DATA:
            return { ...state, user: { ...action.payload } }
        
        case SAVE_MEAL_BY_ADMIN:
            return { ...state, mealsByAdmin: [...state.mealsByAdmin, action.payload] }
            
        default:
            return state    
    }
}

export default reducer