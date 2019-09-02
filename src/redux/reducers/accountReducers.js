import * as actionTypes from '../actions/actionTypes';

const initialState = {

};

const login = (state, action) => {
  const user = { id: 'test', username: 'username' };
  return { user };
};

const logoff = (state, action) => {
  return {};
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return login(state, action);
    case actionTypes.LOGOFF:
      return logoff(state, action);
    default:
      return state;
  }
};

export default reducer;
