import GameAPI from '../../data/FirebaseGameAPI';
import UserAPI from '../../data/FirebaseUserAPI';

export default function getScores() {
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
					let score = Object.keys(winners).reduce((total, cur) => {
						return winners[cur] === picks[uid][cur] ? ++total : total;
					}, 0);
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
