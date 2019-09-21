import * as actionTypes from '../actions/actionTypes';

const initialState = {
  items: [],
  shouldBeUpdated: true,
  lastUpdate: new Date()
};

const load = (state, action) => {
  return {
    items: action.items,
    shouldBeUpdated: false,
    lastUpdate: new Date()
  };
};


const loadStarted = (state, action) => {
  return {
    ...state,
    shouldBeUpdated: false,
    lastUpdate: new Date()
  };
};

const markListToBeUpdated = (state, action) => {
  return { ...state, shouldBeUpdated: true };
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_GROUP_STARTED:
      return loadStarted(state, action);
    case actionTypes.LOAD_GROUP_SUCCESS:
      return load(state, action);
    case actionTypes.ADD_GROUP_SUCCESS:
    case actionTypes.UPDATE_GROUP_SUCCESS:
    case actionTypes.DELETE_GROUP_SUCCESS:
      return markListToBeUpdated(state, action);
    default:
      return state;
  }
};

export default reducer;
