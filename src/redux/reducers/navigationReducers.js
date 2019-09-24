import * as actionTypes from '../actions/actionTypes';

let expanded = window.innerWidth > 600;
expanded = JSON.parse(localStorage.getItem('expanded'));

const initialState = {
    anchorEl: null,
    isMenuExpanded: expanded
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOOGLE_MENU:
            localStorage.setItem('expanded', action.isMenuExpanded);
            return {
                anchorEl: null,
                isMenuExpanded: action.isMenuExpanded
            };
        default:
            return state;

    }
};

export default reducer;
