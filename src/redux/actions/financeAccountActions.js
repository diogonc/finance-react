import * as actionTypes from './actionTypes';
import * as actions from './appMainActions';
import * as accountActions from './accountActions';

export const loadAccountStarted = items => {
  return {
    type: actionTypes.LOAD_ACCOUNT_STARTED,
    items: items
  };
};

export const loadAccountStart = () => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      dispatch(loadAccountStarted());
      const filters = getState().financeAccount.filterFields;
      const result = await api.loadAccount(filters);
      dispatch(loadAccountSuccess(result.items));
      dispatch(updateAccountOrder(getState().financeAccount.order));
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

export const loadAccountSuccess = items => {
  return {
    type: actionTypes.LOAD_ACCOUNT_SUCCESS,
    items: items
  };
};

export const updateFilters = (newFilters) => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_FILTERS,
    filters: newFilters
  };
}

export const toogleFilters = () => {
  return {
    type: actionTypes.TOOGLE_ACCOUNT_FILTERS
  };
};

export const addAccount = (item, redirectUrl, defaultValue) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.addAccount(item);
      dispatch(accountAdded(result, redirectUrl, defaultValue));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());

      if (error.isAxiosError)
      return dispatch(accountActions.logoff());

      dispatch(actions.showMessage(error));
    }
  }
};

export const accountAdded = (item, redirectUrl, defaultValue) => {
  return {
    type: actionTypes.ADD_ACCOUNT_SUCCESS,
    item: item,
    redirectUrl,
    defaultValue
  };
};

export const updateAccount = (item, redirectUrl) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.updateAccount(item);
      dispatch(accountUpdated(result, redirectUrl));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const accountUpdated = (item, redirectUrl) => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_SUCCESS,
    item,
    redirectUrl
  };
};

export const deleteAccount = (item, redirectUrl) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.deleteAccount(item);
      dispatch(accountDeleted(result, redirectUrl));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const accountDeleted = (id, redirectUrl) => {
  return {
    type: actionTypes.DELETE_ACCOUNT_SUCCESS,
    id: id,
    redirectUrl
  };
};


export const updateAccountOrder = (order) => {
  return {
    type: actionTypes.UPDATE_ACCOUNT_ORDER,
    order
  };
};