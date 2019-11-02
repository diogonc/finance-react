import * as actionTypes from '../actions/actionTypes';
import { dateToString } from '../../shared/formatters';

var today = new Date();
const initialState = {
  result: {},
  shouldBeUpdated: true,
  lastUpdate: today,
  showFilters: true,
  filterFields: {
    description: '',
    categories: [],
    financeAccounts: [],
    users: [],
    from: dateToString(new Date(today.getFullYear(), 0, 1)),
    to: dateToString(new Date(today.getFullYear(), today.getMonth() + 1, 0))
  }
};

const clear = () => {
  return initialState;
}

const load = (state, action) => {
  // const sortedResult = sortCategories(action.result);

  return {
    ...state,
    result: action.result,
    shouldBeUpdated: false,
    lastUpdate: new Date()
  };
};

const updateFilters = (state, action) => {
  return {
    ...state,
    shouldBeUpdated: true,
    showFilters: true,
    filterFields: { ...action.filters }
  };
};

const toogleFilters = (state, action) => {
  return {
    ...state,
    showFilters: !state.showFilters,
  };
};

const loadStarted = (state, action) => {
  return {
    ...state,
    shouldBeUpdated: false,
    lastUpdate: new Date()
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BALANCE_PER_CATEGORY_STARTED:
      return loadStarted(state, action);
    case actionTypes.LOAD_BALANCE_PER_CATEGORY_SUCCESS:
      return load(state, action);
    case actionTypes.UPDATE_BALANCE_PER_CATEGORY_FILTERS:
      return updateFilters(state, action);
    case actionTypes.TOOGLE_BALANCE_PER_CATEGORY_FILTERS:
      return toogleFilters(state, action);
    case actionTypes.CLEAR_BALANCE_PER_CATEGORY:
      return clear();
    default:
      return state;
  }
};

export default reducer;

function sortCategories(result) {
  result.groups.debit.forEach(group => {
    const categories = Object.keys(group.categories).map(function (key) {
      return group.categories[key];
    });

    const sortedCategories = categories.sort((a, b) => {
      return a.balance.total = b.balance.total;
    })
    
    group.sortedCategories = sortedCategories;
    return group;
  })
  return result;
}