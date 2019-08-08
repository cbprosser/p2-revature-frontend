import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import User from "../models/user.model";
import Reimbursement from "../models/reimbursement.model";
import reimbursementReducer from "./reimbursement.reducer";

export interface IAuthState {
    currentUser?: User,
    token?: string,
    errorMessage?: string
}

export interface IReimbursementState {
    reimbursements?: Reimbursement[],
    length?: number,
    errorMessage?: string
}

// compose IState of all the other pieces of the state store
export interface IState {
    auth: IAuthState,
    reimbursements: IReimbursementState
}

export const state = combineReducers<IState>({
    auth: authReducer,
    reimbursements: reimbursementReducer
})