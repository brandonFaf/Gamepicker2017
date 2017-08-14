import * as types from '../actions/actionTypes.js';
export default function userReducer(
	state = { isAdmin: false, adminActive: false },
	action
) {
	switch (action.type) {
		case types.LOG_IN_SUCCESS:
			return Object.assign({}, state, {
				userName: action.user.userName,
				id: action.user.uid,
				isAdmin: action.user.isAdmin
			});
		case types.USER_SAVED:
			return Object.assign({}, state, { id: action.id });
		case types.LOG_OUT:
			return {};
		case types.TOGGLE_ADMIN:
			return Object.assign({}, state, { adminActive: !state.adminActive });
		default:
			return state;
	}
}
