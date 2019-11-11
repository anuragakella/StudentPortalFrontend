import { SWITCH_SUB } from '../actionTypes'

export const switchSubjects = current_sub => ({
    type: SWITCH_SUB,
    payload: {
        current_sub
    }
})
