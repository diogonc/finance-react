import * as actionTypes from '../actions/actionTypes';
import { compareStrings } from '../../shared/utils';

const initialState = {
  items: [],
  shouldBeUpdated: true,
  lastUpdate: new Date(),
  showFilters: false,
  redirectUrl: null,
  filterFields: { name: '', userId: 'all' },
  order: { by: 'name', direction: 'asc' }
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

const updateCategoryOrder = (state, action) => {
  const sortedItems = state.items.sort((a, b) => {
    switch (action.order.by) {
      case 'priority':
        return a.priority - b.priority;
      case 'type':
        return compareStrings(a.type, b.type);
      case 'group':
        var groupA = !!a.group ? a.group.name : '';
        var groupB = !!b.group ? b.group.name : '';
        return compareStrings(groupA, groupB);
      default:
        return compareStrings(a.name, b.name);
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
    case actionTypes.LOAD_CATEGORY_STARTED:
      return loadStarted(state, action);
    case actionTypes.LOAD_CATEGORY_SUCCESS:
      return load(state, action);
    case actionTypes.ADD_CATEGORY_SUCCESS:
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return handleUpdate(state, action);
    case actionTypes.UPDATE_CATEGORY_FILTERS:
      return updateFilters(state, action);
    case actionTypes.TOOGLE_CATEGORY_FILTERS:
      return toogleFilters(state, action);
    case actionTypes.UPDATE_CATEGORY_ORDER:
      return updateCategoryOrder(state, action);
    case actionTypes.CLEAR_CATEGORY:
      return clear();
    default:
      return state;
  }
};

export default reducer;
