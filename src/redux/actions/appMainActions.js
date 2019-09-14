import * as actionTypes from './actionTypes';

export const showMessage = message => {
  return {
    type: actionTypes.SHOW_MESSAGE,
    message: message
  };
};

export const closeMessage = () => {
  return {
    type: actionTypes.CLOSE_MESSAGE
  };
};


export const loadingStart = () => {
  return { type: actionTypes.LOADING_START }
};

export const loadingEnd = () => {
  return { type: actionTypes.LOADING_END };
};
