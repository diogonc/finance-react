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
      const filters = getState().group.filterFields;
      const result = await api.loadGroup(filters);
      dispatch(loadGroupSuccess(result.items));
      dispatch(updateGroupOrder(getState().group.order));
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

export const updateFilters = (newFilters) => {
  return {
    type: actionTypes.UPDATE_GROUP_FILTERS,
    filters: newFilters
  };
}

export const toogleFilters = () => {
  return {
    type: actionTypes.TOOGLE_GROUP_FILTERS
  };
};

export const addGroup = (group, redirectUrl, defaultValue) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.addGroup(group);
      dispatch(groupAdded(result, redirectUrl, defaultValue));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const groupAdded = (item, redirectUrl, defaultValue) => {
  return {
    type: actionTypes.ADD_GROUP_SUCCESS,
    item: item,
    redirectUrl,
    defaultValue
  };
};

export const updateGroup = (group, redirectUrl) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.updateGroup(group);
      dispatch(groupUpdated(result, redirectUrl));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const groupUpdated = (item, redirectUrl) => {
  return {
    type: actionTypes.UPDATE_GROUP_SUCCESS,
    item,
    redirectUrl
  };
};

export const deleteGroup = (group, redirectUrl) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.deleteGroup(group);
      dispatch(groupDeleted(result, redirectUrl));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const groupDeleted = (id, redirectUrl) => {
  return {
    type: actionTypes.DELETE_GROUP_SUCCESS,
    id: id,
    redirectUrl
  };
};


export const updateGroupOrder = (order) => {
  return {
    type: actionTypes.UPDATE_GROUP_ORDER,
    order
  };
};