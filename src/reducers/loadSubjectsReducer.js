import { LOAD_SUBS } from './actionTypes.js'

const initSt = {
    subState: {}
}

export default (state=initSt, action) => {
    switch(action.type) {
        case LOAD_SUBS:
            return {
                ...state,
                subState: action.payload
            }
        default: 
            return state;
    }
}