import { LOAD_FORMS } from '../actionTypes'

export const loadForm = data => ({
    type: LOAD_FORMS,
    payload: {
        data
    }
})