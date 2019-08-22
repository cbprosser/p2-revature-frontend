import { tdClient } from "../axios/td-client";
import User from "../models/user.model";


export const authTypes = {
    UPDATE_CURRENT_USER: '[AUTH] UPDATE CURRENT USER',
    LOCALSTORAGE_USER_FOUND: '[AUTH] LOCALSTORAGE USER FOUND',
    LOGGED_OUT: '[AUTH] LOGGED_OUT',
    FAILED_LOGIN: '[AUTH] FAILED LOGIN'
}

export const login = (credentials: any, history: any) => async (dispatch: any) => {
    try {
        const resp = await tdClient.post('/login', credentials);
        // localStorage.setItem('tk', resp.data.token);
        const user = resp.data;
        localStorage.setItem('td.user', JSON.stringify(user));
        dispatch({
            type: authTypes.UPDATE_CURRENT_USER,
            payload: user
        })

        history.push('/');
    } catch (err) {
        console.log(err);
        console.log('invalid credentials');
        dispatch({
            type: authTypes.FAILED_LOGIN,
            payload: 'Invalid Credentials'
        });
    }
}

export const checkLocalStorage = () => (dispatch: any) => {
    const lsString = localStorage.getItem('td.user');
    if (localStorage.getItem('td.user')) {
        const lsUser: User = lsString && JSON.parse(lsString);
        dispatch({
            type: authTypes.LOCALSTORAGE_USER_FOUND,
            payload: lsUser
        })
    }
}

export const logout = () => (dispatch: any) => {
    localStorage.removeItem('td.user');

    dispatch({
        type: authTypes.LOGGED_OUT
    })
    
}