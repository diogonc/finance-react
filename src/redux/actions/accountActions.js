import * as actionTypes from './actionTypes';
import * as actions from '../actions/appMainActions';

export const loginSuccess = loginPayload => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    loginPayload
  };
};

export const logoff = () => {
  return {
    type: actionTypes.LOGOFF
  };
};

export const requestLogin = loginData => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.login(loginData.username, loginData.password);

      dispatch(actions.loadingEnd());
      dispatch(loginSuccess(result.toJSON()));
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));

    }
  }
};

