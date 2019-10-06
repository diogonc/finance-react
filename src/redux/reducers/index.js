import { combineReducers } from 'redux'
import group from './groupReducers'
import financeAccount from './financeAccountReducers'
import account from './accountReducers'
import category from './categoryReducers'
import navigation from './navigationReducers'
import appMain from './appMainReducers'

export default combineReducers({
    group,
    financeAccount,
    navigation,
    account,
    category,
    appMain
})