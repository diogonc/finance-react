import * as actionTypes from './actionTypes';
import * as actions from '../actions/appMainActions';

export const loginSuccess = loginPayload => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    account: loginPayload
  };
};

export const logoff = () => {
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

