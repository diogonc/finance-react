import * as actionTypes from '../actions/actionTypes';
import { compareStrings } from '../../shared/utils';
import { dateToString } from '../../shared/formatters';

var today = new Date();
const initialState = {
  items: [],
  shouldBeUpdated: true,
  lastUpdate: today,
  showFilters: false,
  redirectUrl: null,
  filterFields: {
    description: '',
    categories: [],
    financeAccounts: [],
    users: [],
    from: dateToString(new Date(today.getFullYear(), today.getMonth(), 1)),
    to: dateToString(new Date(today.getFullYear(), today.getMonth() + 1, 0))
  },
  order: { by: 'date', direction: 'desc' }
};

const clear = () => {
  return initialState;
}

const load = (state, action) => {
  return {
    ...state,
    items: action.items,
    shouldBeUpdated: false,
    redirectUrl: null,
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

const updateTransactionOrder = (state, action) => {
  const sortedItems = state.items.sort((a, b) => {
    switch (action.order.by) {
      case 'priority':
        return a.priority - b.priority;
      case 'account':
        return compareStrings(a.financeAccount.name, b.financeAccount.name);
      case 'description':
        return compareStrings(a.description, b.description);
      case 'category':
        return compareStrings(a.category.name, b.category.name);
      case 'date':
        return compareStrings(a.date, b.date);
      case 'value':
        return compareStrings(a.value, b.value);
      default:
        return compareStrings(a.date, b.date);
    }
  });
  if (action.order.direction === 'desc')
    sortedItems.reverse();

  return {
    ...state,
    items: sortedItems,
    order: action.order
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

const handleUpdate = (state, action) => {
  return {
    ...state,
    shouldBeUpdated: true,
    redirectUrl: action.redirectUrl,
    defaultValue: !!action.defaultValue ? action.defaultValue : null
  };
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_TRANSACTION_STARTED:
      return loadStarted(state, action);
    case actionTypes.LOAD_TRANSACTION_SUCCESS:
      return load(state, action);
    case actionTypes.ADD_TRANSACTION_SUCCESS:
    case actionTypes.UPDATE_TRANSACTION_SUCCESS:
    case actionTypes.DELETE_TRANSACTION_SUCCESS:
      return handleUpdate(state, action);
    case actionTypes.UPDATE_TRANSACTION_FILTERS:
      return updateFilters(state, action);
    case actionTypes.TOOGLE_TRANSACTION_FILTERS:
      return toogleFilters(state, action);
    case actionTypes.UPDATE_TRANSACTION_ORDER:
      return updateTransactionOrder(state, action);
    case actionTypes.CLEAR_TRANSACTION:
      return clear();
    default:
      return state;
  }
};

export default reducer;
