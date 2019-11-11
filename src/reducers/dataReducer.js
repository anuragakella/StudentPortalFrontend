import { LOAD_FORMS } from './actionTypes.js'

const initSt = {
    data: {}
}

export default (state=initSt, action) => {
    switch(action.type) {
        case LOAD_FORMS:
            return {
                ...state,
                data: action.payload
            }
        default: 
            return state;
    }
}