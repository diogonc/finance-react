import * as actionTypes from './actionTypes';
import * as actions from './appMainActions';
import * as accountActions from './accountActions';

export const loadTransactionStarted = items => {
  return {
    type: actionTypes.LOAD_TRANSACTION_STARTED,
    items: items
  };
};

export const loadTransactionStart = () => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      dispatch(loadTransactionStarted());
      const filters = getState().transaction.filterFields;
      const result = await api.loadTransaction(filters);
      dispatch(loadTransactionSuccess(result.items));
      dispatch(updateTransactionOrder(getState().transaction.order));
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

export const loadTransactionSuccess = items => {
  return {
    type: actionTypes.LOAD_TRANSACTION_SUCCESS,
    items: items
  };
};

export const updateFilters = (newFilters) => {
  return {
    type: actionTypes.UPDATE_TRANSACTION_FILTERS,
    filters: newFilters
  };
}

export const toogleFilters = () => {
  return {
    type: actionTypes.TOOGLE_TRANSACTION_FILTERS
  };
};

export const addTransaction = (item, redirectUrl, defaultValue) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.addTransaction(item);
      dispatch(transactionAdded(result, redirectUrl, defaultValue));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());

      if (error.isAxiosError)
        return dispatch(accountActions.logoff());

      dispatch(actions.showMessage(error));
    }
  }
};

export const transactionAdded = (item, redirectUrl, defaultValue) => {
  return {
    type: actionTypes.ADD_TRANSACTION_SUCCESS,
    item: item,
    redirectUrl,
    defaultValue
  };
};

export const updateTransaction = (item, redirectUrl) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.updateTransaction(item);
      dispatch(transactionUpdated(result, redirectUrl));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const transactionUpdated = (item, redirectUrl) => {
  return {
    type: actionTypes.UPDATE_TRANSACTION_SUCCESS,
    item,
    redirectUrl
  };
};

export const deleteTransaction = (item, redirectUrl) => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      const result = await api.deleteTransaction(item);
      dispatch(transactionDeleted(result, redirectUrl));
      dispatch(actions.loadingEnd());
    } catch (error) {
      dispatch(actions.loadingEnd());
      dispatch(actions.showMessage(error));
    }
  }
};

export const transactionDeleted = (id, redirectUrl) => {
  return {
    type: actionTypes.DELETE_TRANSACTION_SUCCESS,
    id: id,
    redirectUrl
  };
};


export const updateTransactionOrder = (order) => {
  return {
    type: actionTypes.UPDATE_TRANSACTION_ORDER,
    order
  };
};