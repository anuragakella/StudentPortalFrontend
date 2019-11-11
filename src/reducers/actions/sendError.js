import { SEND_ERR } from '../actionTypes'

export const sendError = error => ({
    type: SEND_ERR,
    payload: {
        ...error
    }
})