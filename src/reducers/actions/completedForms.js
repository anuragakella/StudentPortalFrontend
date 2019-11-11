import { ANLY_STATE_UPDT } from '../actionTypes'

export const completedForms = subdet => ({
    type: ANLY_STATE_UPDT,
    payload: subdet
})
