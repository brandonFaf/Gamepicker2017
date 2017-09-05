import * as types from './actionTypes';
import firebase from 'firebase';
import UserAPI from '../FirebaseUserAPI';
import { loadPicks } from './gameActions';
function userLoggedInSuccess(user) {
	return { type: types.LOG_IN_SUCCESS, user };
}
export function noUser() {
	return { type: types.NO_USER };
}
function userLoggedOut() {
	return { type: types.LOG_OUT };
}
export function toggleAdmin() {
	return { type: types.TOGGLE_ADMIN };
}
export function saveUser(userName, uid, history) {
	return function(dispatch) {
		let updates = {};
		updates['users/' + uid] = { userName };
		firebase.database().ref().update(updates).then(() => {
			dispatch(userLoggedInSuccess({ userName, uid }));
			history.push('/');
		});
	};
}

export function logOut() {
	return dispatch => {
		firebase.auth().signOut().then(() => {
			dispatch(userLoggedOut());
		});
	};
}
export function loadUser(uid) {
	return function(dispatch) {
		UserAPI.loadUser(uid).then(user => {
			if (user.val()) {
				let userObj = Object.assign(user.val(), { uid });
				dispatch(userLoggedInSuccess(userObj));
				dispatch(loadPicks(uid));
			}
		});
	};
}
