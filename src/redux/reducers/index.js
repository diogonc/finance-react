import { combineReducers } from 'redux'
import group from './groupReducers'
import financeAccount from './financeAccountReducers'
import account from './accountReducers'
import category from './categoryReducers'
import transaction from './transactionReducers'
import balancePerAccount from './balancePerAccountReducers'
import balancePerCategory from './balancePerCategoryReducers'
import futureBalance from './futureBalanceReducers'
import navigation from './navigationReducers'
import appMain from './appMainReducers'

export default combineReducers({
    group,
    financeAccount,
    navigation,
    account,
    category,
    transaction,
    balancePerAccount,
    balancePerCategory,
    futureBalance,
    appMain
})