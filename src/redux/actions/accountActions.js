import * as actionTypes from './actionTypes';
import * as actions from '../actions/appMainActions';
import * as balancePerAccountActions from '../actions/balancePerAccountActions';
import * as categoryActions from '../actions/categoryActions';
import * as financeAccountActions from '../actions/financeAccountActions';
import * as groupActions from '../actions/groupActions';
import * as transactionActions from '../actions/transactionActions';

export const loginSuccess = loginPayload => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    account: loginPayload
  };
};

export const logoff = () => {
  return (dispatch) => {
    dispatch(logoffUser());
    dispatch(balancePerAccountActions.clear());
    dispatch(categoryActions.clear());
    dispatch(financeAccountActions.clear());
    dispatch(groupActions.clear());
    dispatch(transactionActions.clear());
    dispatch(actions.loadingEnd());
  }
};

export const logoffUser = () => {
  return {
    type: actionTypes.LOGOFF
  };
};

export const storeUsers = (users) => {
  return {
    type: actionTypes.STORE_USERS,
    items: users
  };
};

export const requestLogin = loginData => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.login(loginData.username, loginData.password);
      dispatch(actions.loadingEnd());
      dispatch(loginSuccess(result));
      const usersResult = await api.loadUsers();
      dispatch(storeUsers(usersResult.items));
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));

    }
  }
};

