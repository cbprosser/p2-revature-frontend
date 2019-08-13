import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import User from "../models/user.model";

export interface IAuthState {
    currentUser?: User,
    token?: string,
    errorMessage?: string
}

// compose IState of all the other pieces of the state store
export interface IState {
    auth: IAuthState
}

export const state = combineReducers<IState>({
    auth: authReducer
})