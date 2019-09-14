import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  message: null
};

const loadingStart = (state, action) => {
  return { loading: true };
};

const loadingEnd = (state, action) => {
  return { loading: false };
};

const showMessage = (state, action) => {
  if (!!action && !!action.message)
    return { message: action.message };
  return {};
};

const closeMessage = (state, action) => {
  return { message: null };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_START:
      return loadingStart(state, action);
    case actionTypes.LOADING_END:
      return loadingEnd(state, action);
    case actionTypes.SHOW_MESSAGE:
    case actionTypes.SHOW_ERROR:
      return showMessage(state, action);
    case actionTypes.CLOSE_MESSAGE:
      return closeMessage(state, action);
    default:
      return state;
  }
};

export default reducer;
