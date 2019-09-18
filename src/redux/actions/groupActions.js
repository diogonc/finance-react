import * as actionTypes from './actionTypes';
import * as actions from '../actions/appMainActions';

export const loadGroupStart = () => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.loadGroup();
      dispatch(loadGroupSuccess(result.items));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const loadGroupSuccess = groups => {
  return {
    type: actionTypes.LOAD_GROUP_SUCCESS,
    items: groups
  };
};

export const addGroup = group => {
  return {
    type: actionTypes.ADD_GROUP,
    item: group
  };
};

export const updateGroup = group => {
  return {
    type: actionTypes.UPDATE_GROUP,
    item: group
  };
};

export const deleteGroup = uuid => {
  return {
    type: actionTypes.DELETE_GROUP,
    uuid: uuid
  };
};
