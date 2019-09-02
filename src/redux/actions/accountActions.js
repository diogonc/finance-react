import * as actionTypes from './actionTypes';

export const login = loginData => {
  return {
    type: actionTypes.LOGIN,
    loginData
  };
};

export const logoff = () => {
  return {
    type: actionTypes.LOGOFF
  };
};

