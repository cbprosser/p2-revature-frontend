import { ersClient } from "../axios/ers-client";


export const reimbursementTypes = {
    FIND_ALL_BY_STATUS: '[REIM] FIND ALL BY STATUS',
    FIND_ALL_BY_ID: '[REIM] FIND ALL BY ID',
    FAILED_TO_FIND: '[REIM] FAILED TO FIND REIMBURSEMENTS'
}

export const byStatus = (status: string, view: number, page: number) => async (dispatch: any, getState: any) => {
    try {
        const state = getState();
        const token = state.auth.currentUser.token;
        const resp = await ersClient.get(`/reimbursements/status/${status}?count=${view}&page=${page}`, {
            headers: {
                authorization: 'Bearer ' + token
            }
        });

        const length = resp.data[resp.data.length - 1]

        const reimbursements = resp.data.splice(0, resp.data.length - 1);

        dispatch({
            type: reimbursementTypes.FIND_ALL_BY_STATUS,
            payload: { 
                reimbursements,
                length
            }
        })
        
    } catch (err) {
        dispatch({
            type: reimbursementTypes.FAILED_TO_FIND,
            payload: 'Found no reimbursements'
        });
    }
}

export const byId = (id: number, view: number, page: number) => async (dispatch: any, getState: any) => {
    try {
        const state = getState();
        const token = state.auth.currentUser.token;
        const resp = await ersClient.get(`/reimbursements/author/userId/${id}?count=${view}&page=${page}`, {
            headers: {
                authorization: 'Bearer ' + token
            }
        });

        const length = resp.data[resp.data.length - 1]

        const reimbursements = resp.data.splice(0, resp.data.length - 1);

        dispatch({
            type: reimbursementTypes.FIND_ALL_BY_ID,
            payload: { 
                reimbursements,
                length
            }
        })
        
    } catch (err) {
        dispatch({
            type: reimbursementTypes.FAILED_TO_FIND,
            payload: 'Found no reimbursements'
        });
    }
}