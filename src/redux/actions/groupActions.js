import * as actionTypes from './actionTypes';
import * as actions from '../actions/appMainActions';

export const loadGroupStarted = groups => {
  return {
    type: actionTypes.LOAD_GROUP_STARTED,
    items: groups
  };
};

export const loadGroupStart = () => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      dispatch(loadGroupStarted());
      const result = await api.loadGroup();
      dispatch(loadGroupSuccess(result.items));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
      return [];
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
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.addGroup(group);
      dispatch(groupAdded(result));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const groupAdded = item => {
  return {
    type: actionTypes.ADD_GROUP_SUCCESS,
    item: item
  };
};

export const updateGroup = group => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.updateGroup(group);
      dispatch(groupUpdated(result));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const groupUpdated = group => {
  return {
    type: actionTypes.UPDATE_GROUP_SUCCESS,
    item: group
  };
};

export const deleteGroup = group => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.deleteGroup(group);
      dispatch(groupDeleted(result));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const groupDeleted = id => {
  return {
    type: actionTypes.DELETE_GROUP_SUCCESS,
    id: id
  };
};
