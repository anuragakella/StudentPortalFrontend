import { ANLY_DATA } from './actionTypes.js'

const initSt = {
}

export default (state=initSt, action) => {
    switch(action.type) {
        case ANLY_DATA:
            return {
                ...action.payload
            }
        default: 
            return state;
    }
}