import * as actionTypes from '../actions/actionTypes';

const initialState = {

};

const loginSuccess = (state, action) => {
  const user = { id: 'test', username: 'username' };
  return { user, loading: false };
};

const loginFail = (state, action) => {
  return { loading: false };
};

const logoff = (state, action) => {
  return {};
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);
    case actionTypes.LOGOFF:
      return logoff(state, action);
    default:
      return state;
  }
};

export default reducer;
