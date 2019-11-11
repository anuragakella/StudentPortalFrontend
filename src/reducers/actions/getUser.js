import { GET_USER } from '../actionTypes'

export const getUser = currentUser => ({
    type: GET_USER,
    payload: currentUser
})
