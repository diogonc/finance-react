import * as actionTypes from './actionTypes';
import * as actions from './appMainActions';
import * as accountActions from './accountActions';

export const loadBalancePerCategoryStarted = result => {
  return {
    type: actionTypes.LOAD_BALANCE_PER_CATEGORY_STARTED,
    result
  };
};

export const loadBalancePerCategoryStart = () => {
  return async (dispatch, getState, api) => {
    dispatch(actions.loadingStart());
    try {
      dispatch(loadBalancePerCategoryStarted());
      const filters = getState().balancePerCategory.filterFields;
      const result = await api.loadBalancePerCategory(filters);
      dispatch(loadBalancePerCategorySuccess(result));
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

export const loadBalancePerCategorySuccess = result => {
  return {
    type: actionTypes.LOAD_BALANCE_PER_CATEGORY_SUCCESS,
    result
  };
};

export const updateFilters = (newFilters) => {
  return {
    type: actionTypes.UPDATE_BALANCE_PER_CATEGORY_FILTERS,
    filters: newFilters
  };
}

export const toogleFilters = () => {
  return {
    type: actionTypes.TOOGLE_BALANCE_PER_CATEGORY_FILTERS
  };
};

export const clear = () => {
  return {
    type: actionTypes.CLEAR_BALANCE_PER_CATEGORY
  };
};