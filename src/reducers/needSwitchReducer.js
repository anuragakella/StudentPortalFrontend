import { NEED_SWITCH } from './actionTypes.js'

const initSt = {
}

export default (state=initSt, action) => {
    switch(action.type) {
        case NEED_SWITCH:
            return {
                ...action.payload
            }
        default: 
            return state;
    }
}