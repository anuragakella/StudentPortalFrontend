import { ANLY_STATE } from './actionTypes.js'

const initSt = {
}

export default (state=initSt, action) => {
    switch(action.type) {
        case ANLY_STATE:
            return {
                ...action.payload
            }
            
        default: 
            return state;
    }
}