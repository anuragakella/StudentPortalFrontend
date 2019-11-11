import { SEND_ERR } from './actionTypes.js'

const initSt = {
}

export default (state=initSt, action) => {
    switch(action.type) {
        case SEND_ERR:
            return {
                ...action.payload
            }
        default: 
            return state;
    }
}