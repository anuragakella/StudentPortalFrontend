import {ANLY_DATA } from '../actionTypes'

export const analyticsStateChange = subdet => ({
    type: ANLY_DATA,
    payload: subdet
})
