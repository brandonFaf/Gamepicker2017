import firebase from 'firebase';
//Offline
// import GameAPI from '../../data/OfflineGameAPI';
// import UserAPI from '../../data/OfflineUserAPI';
//Firebase
import GameAPI from '../../data/FirebaseGameAPI';
import UserAPI from '../../data/FirebaseUserAPI';

export default function getUsersAndWinners() {
	return new Promise((resolve, reject) => {
		let picks;
		let winners;
		let users;
		GameAPI.loadPicks()
			.then(snapshot => {
				picks = snapshot.val();
				return GameAPI.loadWinners();
			})
			.then(winnerSnap => {
				winners = winnerSnap.val();
				return UserAPI.loadAllUsers();
			})
			.then(userSnap => {
				users = userSnap.val();
				const uids = Object.keys(users);
				let scoresWeekly = uids.map((uid, i) => {
					let score;
					if (users[uid].userName == 'SI') {
						score = -1;
					} else {
						score = winners.reduce((total, cur, index) => {
							return cur == picks[uid][index] ? ++total : total;
						}, 0);
					}

					return { userName: users[uid].userName, score };
				});
				scoresWeekly = scoresWeekly.sort((a, b) => {
					return b.score - a.score;
				});
				resolve({ scoresWeekly });
			})
			.catch(err => {
				reject(err);
			});
	});
}
