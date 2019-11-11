import { ANLY_STATE_UPDT } from './actionTypes.js'

const initSt = {
}

export default (state=initSt, action) => {
    switch(action.type) {
        case ANLY_STATE_UPDT:
            return {
                ...action.payload
            }
            
        default: 
            return state;
    }
}