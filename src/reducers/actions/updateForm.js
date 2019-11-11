import { UPDT_FORM } from '../actionTypes'

export const updateForm = updated => ({
    type: UPDT_FORM,
    payload: {
        ...updated
    }
})
