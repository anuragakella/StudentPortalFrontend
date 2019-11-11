import { AUTH_TKN } from './actionTypes.js'

const initSt = {
}

export default (state=initSt, action) => {
    switch(action.type) {
        case AUTH_TKN:
            localStorage.setItem('auth', action.payload.token)
            return {
                ...action.payload
            }
        default: 
            return state;
    }
}