import * as types from './actionTypes';
import firebase from 'firebase';
import { Actions, ActionConst } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
//Offline
// import UserAPI from '../../data/OfflineUserAPI';
//Firebase
import UserAPI from '../../data/FirebaseUserAPI';

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
export function saveUser(userName, uid) {
	return function(dispatch) {
		let updates = {};
		updates['users/' + uid] = { userName };
		firebase.database().ref().update(updates).then(() => {
			dispatch(userLoggedInSuccess({ user: { userName, uid } }));
		});
	};
}

export function loginUser(credential, userName) {
	return function(dispatch) {
		return firebase
			.auth()
			.signInWithCredential(credential)
			.then(user => {
				dispatch(saveUser(userName, user.uid));
				return user.uid;
			})
			.catch(err => {
				//TODO add alert saying login failed and go back to login screen.
			});
	};
}
export function logOut() {
	return dispatch => {
		firebase.auth().signOut().then(() => {
			dispatch(userLoggedOut());
			AsyncStorage.clear();
			Actions.login(ActionConst.REPLACE);
		});
	};
}
export function loadUser(uid) {
	return function(dispatch) {
		UserAPI.loadUser(uid).then(user => {
			let userObj = Object.assign(user.val(), { uid });
			dispatch(userLoggedInSuccess(userObj));
			dispatch(loadPicks(uid));
			Actions.home(ActionConst.REPLACE);
		});
	};
}
