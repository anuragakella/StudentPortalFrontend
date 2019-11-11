import { AUTH_TKN } from '../actionTypes'

export const changeAuth = subdet => ({
    type: AUTH_TKN,
    payload: subdet
})
