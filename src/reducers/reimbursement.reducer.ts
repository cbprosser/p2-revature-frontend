import { reimbursementTypes } from "../actions/reimbursements.actions";

const initialState = {

}

export default (state = initialState, action: any) => {
    switch (action.type) {

    case reimbursementTypes.FIND_ALL_BY_STATUS:
        return {
            ...state,
            ...action.payload
        }
    
    case reimbursementTypes.FIND_ALL_BY_ID:
        return {
            ...state,
            ...action.payload
        }
    
    case reimbursementTypes.FAILED_TO_FIND:
        return {
            ...state,
            ...action.payload
        }

    default:
        return state
    }
}
