import { IAuthState } from ".";
import { authTypes } from "../actions/auth.actions";

const initialState: IAuthState = {

}

export default (state = initialState, action: any) => {
    switch (action.type) {

        case authTypes.LOGGED_OUT:
            return {
                ...state,
                currentUser: null
            }
        case authTypes.LOCALSTORAGE_USER_FOUND:
            return {
                ...state,
                currentUser: action.payload
            }
        case authTypes.UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case authTypes.FAILED_LOGIN:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state
    }
}
