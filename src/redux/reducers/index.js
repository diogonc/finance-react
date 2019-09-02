import { combineReducers } from 'redux'
import product from './productReducers'
import group from './groupReducers'
import account from './accountReducers'
import navigation from './navigationReducers'

export default combineReducers({
    product,
    group,
    navigation,
    account
})