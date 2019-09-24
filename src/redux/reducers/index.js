import { combineReducers } from 'redux'
import group from './groupReducers'
import account from './accountReducers'
import navigation from './navigationReducers'
import appMain from './appMainReducers'

export default combineReducers({
    group,
    navigation,
    account,
    appMain
})