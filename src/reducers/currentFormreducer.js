import { UPDT_FORM } from './actionTypes.js'

const initSt = {
}

export default (state=initSt, action) => {
    switch(action.type) {
        case UPDT_FORM:
            return {
                ...action.payload
            }
        default: 
            return state;
    }
}