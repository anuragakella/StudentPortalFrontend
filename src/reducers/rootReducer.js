import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import switchSubReducer from './switchSubReducer';
import loadSubjectsReducer from './loadSubjectsReducer';
import needSwitchReducer from './needSwitchReducer';
import currentFormreducer from './currentFormreducer';
import errReducer from './errReducer'
import authorizationReducer from './authorizationReducer';
import profileReducer from './profileReducer';
import analyticsReducer from './analyticsReducer'
import analyticsStateReducer from './analyticsStateReducer';
import analyticsFormDataReducer from './analyticsFormDataReducer';
export default combineReducers ({
    user: profileReducer,
    formData: dataReducer,
    currentSub: switchSubReducer,
    subState: loadSubjectsReducer,
    needSwitch: needSwitchReducer,
    currentForm: currentFormreducer,
    errors: errReducer,
    token: authorizationReducer,
    analytics: analyticsReducer,
    analyticsState: analyticsStateReducer,
    analyticsData: analyticsFormDataReducer
})