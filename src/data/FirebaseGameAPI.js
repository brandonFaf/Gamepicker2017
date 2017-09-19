import firebase from 'firebase';
export default class GameAPI {
	static loadGames() {
		return firebase.database().ref('games').once('value');
	}
	static save(updates) {
		return firebase.database().ref().update(updates);
	}
	static loadUserPicks(userId) {
		return firebase.database().ref(`picks/${userId}`).once('value');
	}
	static loadUserSurvivor(userId) {
		return firebase.database().ref(`survivor/${userId}`).once('value');
	}
	static loadUserRecords(userId) {
		return firebase.database().ref(`records/${userId}`).once('value');
	}
	static loadWeeklyRecords() {
		return firebase.database().ref('records/result').once('value');
	}
	static loadPicks() {
		return firebase.database().ref('picks').once('value');
	}
	static loadWinners() {
		return firebase.database().ref('winners').once('value');
	}
}
