import { LOAD_SUBS } from '../actionTypes'

export const getSubjects = subdet => ({
    type: LOAD_SUBS,
    payload: subdet
})
