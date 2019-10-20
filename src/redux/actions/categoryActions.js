import * as actionTypes from './actionTypes';
import * as actions from './appMainActions';
import * as accountActions from './accountActions';

export const loadCategoryStarted = items => {
  return {
    type: actionTypes.LOAD_CATEGORY_STARTED,
    items: items
  };
};

export const loadCategoryStart = () => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      dispatch(loadCategoryStarted());
      const filters = getState().category.filterFields;
      const result = await api.loadCategory(filters);
      dispatch(loadCategorySuccess(result.items));
      dispatch(updateCategoryOrder(getState().category.order));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      if (error.isAxiosError)
        return dispatch(accountActions.logoff());

      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
      return [];
    }
  }
};

export const loadCategorySuccess = items => {
  return {
    type: actionTypes.LOAD_CATEGORY_SUCCESS,
    items: items
  };
};

export const updateFilters = (newFilters) => {
  return {
    type: actionTypes.UPDATE_CATEGORY_FILTERS,
    filters: newFilters
  };
}

export const toogleFilters = () => {
  return {
    type: actionTypes.TOOGLE_CATEGORY_FILTERS
  };
};

export const addCategory = (item, redirectUrl, defaultValue) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.addCategory(item);
      dispatch(categoryAdded(result, redirectUrl, defaultValue));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());

      if (error.isAxiosError)
        return dispatch(accountActions.logoff());

      dispatch(actions.showMessage(error));
    }
  }
};

export const categoryAdded = (item, redirectUrl, defaultValue) => {
  return {
    type: actionTypes.ADD_CATEGORY_SUCCESS,
    item: item,
    redirectUrl,
    defaultValue
  };
};

export const updateCategory = (item, redirectUrl) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.updateCategory(item);
      dispatch(categoryUpdated(result, redirectUrl));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const categoryUpdated = (item, redirectUrl) => {
  return {
    type: actionTypes.UPDATE_CATEGORY_SUCCESS,
    item,
    redirectUrl
  };
};

export const deleteCategory = (item, redirectUrl) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.deleteCategory(item);
      dispatch(categoryDeleted(result, redirectUrl));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const categoryDeleted = (id, redirectUrl) => {
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    id: id,
    redirectUrl
  };
};


export const updateCategoryOrder = (order) => {
  return {
    type: actionTypes.UPDATE_CATEGORY_ORDER,
    order
  };
};


export const clear = () => {
  return {
    type: actionTypes.CLEAR_CATEGORY
  };
};