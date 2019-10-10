import * as actionTypes from './actionTypes';
import * as actions from './appMainActions';
import * as accountActions from './accountActions';

export const loadBalancePerAccountStarted = result => {
  return {
    type: actionTypes.LOAD_BALANCE_PER_ACCOUNT_STARTED,
    result
  };
};

export const loadBalancePerAccountStart = () => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      dispatch(loadBalancePerAccountStarted());
      const filters = getState().balancePerAccount.filterFields;
      const result = await api.loadBalancePerAccount(filters);
      dispatch(loadBalancePerAccountSuccess(result));
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

export const loadBalancePerAccountSuccess = result => {
  return {
    type: actionTypes.LOAD_BALANCE_PER_ACCOUNT_SUCCESS,
    result
  };
};

export const updateFilters = (newFilters) => {
  return {
    type: actionTypes.UPDATE_BALANCE_PER_ACCOUNT_FILTERS,
    filters: newFilters
  };
}

export const toogleFilters = () => {
  return {
    type: actionTypes.TOOGLE_BALANCE_PER_ACCOUNT_FILTERS
  };
};
