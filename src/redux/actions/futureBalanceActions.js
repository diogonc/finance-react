import * as actionTypes from './actionTypes';
import * as actions from './appMainActions';
import * as accountActions from './accountActions';

export const loadFutureBalanceStarted = result => {
  return {
    type: actionTypes.LOAD_FUTURE_BALANCE_STARTED,
    result
  };
};

export const loadFutureBalanceStart = () => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      dispatch(loadFutureBalanceStarted());
      const filters = getState().futureBalance.filterFields;
      const result = await api.loadFutureBalance(filters);
      dispatch(loadFutureBalanceSuccess(result));
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

export const loadFutureBalanceSuccess = result => {
  return {
    type: actionTypes.LOAD_FUTURE_BALANCE_SUCCESS,
    result
  };
};

export const updateFilters = (newFilters) => {
  return {
    type: actionTypes.UPDATE_FUTURE_BALANCE_FILTERS,
    filters: newFilters
  };
}

export const toogleFilters = () => {
  return {
    type: actionTypes.TOOGLE_FUTURE_BALANCE_FILTERS
  };
};

export const clear = () => {
  return {
    type: actionTypes.CLEAR_FUTURE_BALANCE
  };
};