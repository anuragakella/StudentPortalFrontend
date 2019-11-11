import { GET_USER } from './actionTypes.js'

const initSt = {
}

export default (state=initSt, action) => {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state;
    }
}