import { SWITCH_SUB } from './actionTypes.js'

const initSt = {
    currentSub: {}
}

export default (state=initSt, action) => {
    switch(action.type) {
        case SWITCH_SUB:
            return {
                ...action.payload
            }
        default: 
            return state;
    }
}