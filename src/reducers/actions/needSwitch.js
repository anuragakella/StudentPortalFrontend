import { NEED_SWITCH } from '../actionTypes'

export const needSwitch = needswitch => ({
    type: NEED_SWITCH,
    payload: {
        needswitch
    }
})