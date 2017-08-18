import firebase from 'firebase';
export default class UserAPI {
	static loadAllUsers() {
		return firebase.database().ref('users').once('value');
	}
	static loadUser(uid) {
		return firebase.database().ref(`users/${uid}`).once('value');
	}
	static createUser(uid, userName) {
		let updates = {};
		updates['users/' + uid] = { userName };
		return firebase.database().ref().update(updates);
	}
}
