import * as actionTypes from '../actions/actionTypes';

let accountData = {};
accountData = JSON.parse(localStorage.getItem('account'));

const initialState = accountData || {};

const loginSuccess = (state, action) => {
  const userData = {
    user: { ...action.account.user },
    token: action.account.token
  };
  localStorage.setItem('account', JSON.stringify(userData));
  return userData;
};

const logoff = () => {
  localStorage.removeItem('account');
  return {};
}

const storeUsers = (state, action) => {
  const userData = {
    ...state,
    users: action.items
  };
  localStorage.setItem('account', JSON.stringify(userData));
  return userData
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGOFF:
      return logoff();
    case actionTypes.STORE_USERS:
      return storeUsers(state, action);
    default:
      return state;
  }
};

export default reducer;
