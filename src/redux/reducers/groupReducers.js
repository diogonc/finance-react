import * as actionTypes from '../actions/actionTypes';

const initialState = {
  items: []
};

const load = (state, action) => {
  return { items: action.items };
};

const add = (state, action) => {
  const newList = [
    ...state.items,
    {
      ...action.item,
      id: ((new Date().getTime() * 10000) + 621355968000000000)
    }
  ];
  return { items: newList };
};

const update = (state, action) => {
  const newList = state.items.map(item => {
    if (item.id === action.item.id) {
      return { ...action.item };
    }
    return item;
  });
  return { items: newList };
};

const deleteItem = (state, action) => {
  const newList = state.items.filter(item => action.id !== item.id);
  return { items: newList };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_GROUP_SUCCESS:
      return load(state, action);
    case actionTypes.ADD_GROUP:
      return add(state, action);
    case actionTypes.UPDATE_GROUP:
      return update(state, action);
    case actionTypes.DELETE_GROUP:
      return deleteItem(state, action);
    default:
      return state;
  }
};

export default reducer;
