import { ersClient } from "../axios/ers-client";


export const authTypes = {
    UPDATE_CURRENT_USER: '[AUTH] UPDATE CURRENT USER',
    FAILED_LOGIN: '[AUTH] FAILED LOGIN'
}

export const login = (credentials: any, history: any) => async (dispatch: any) => {
    try {
        const resp = await ersClient.post('/login', credentials);
        // localStorage.setItem('tk', resp.data.token);
        const token = resp.data.token;
        const user = JSON.parse(atob(token.split('.')[1])).user;
        const userToken = {
            user,
            token
        }
        
        dispatch({
            type: authTypes.UPDATE_CURRENT_USER,
            payload: userToken
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