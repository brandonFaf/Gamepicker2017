import * as types from '../actions/actionTypes.js';

export default function userReducer(state = { loading: true }, action) {
	switch (action.type) {
		case types.SHOW_LOADING:
			return true;
		case types.HIDE_LOADING:
		case types.NO_USER:
		case types.SAVE_PICK:
		case types.SAVE_WINNER:
		case types.LOG_IN_SUCCESS:
			return false;
		default:
			return state;
	}
}
