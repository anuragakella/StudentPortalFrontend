import { ANLY_STATE } from '../actionTypes'

export const analyticsSelector = selector => ({
    type: ANLY_STATE,
    payload: selector
})
