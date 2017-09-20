import GameAPI from '../../data/FirebaseGameAPI';
import UserAPI from '../../data/FirebaseUserAPI';

export function getScores() {
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

export function getStreaks() {
	//get survivor picks for user
	//get winners
	//loop through survovors starting at end and count to first incorrect
	let picks, winners, users;
	return new Promise((resolve, reject) => {
		GameAPI.loadWinners()
			.then(winnerSnap => {
				winners = winnerSnap.val();
				return UserAPI.loadAllUsers();
			})
			.then(userSnap => {
				users = userSnap.val();
				return GameAPI.loadSurvivor();
			})
			.then(snapshot => {
				let streaks = [];
				let survivor = snapshot.val();
				if (!survivor) {
					resolve([]);
					return;
				}
				for (let user in users) {
					let userSurvivor = makeArray(survivor[user]).reverse();
					streaks.push(
						Object.assign(
							{ userName: users[user].userName },
							makeStreaks(userSurvivor, winners)
						)
					);
				}
				resolve(streaks);
			});
	});
}

function makeStreaks(survivor, winners) {
	let count = 0,
		longest = 0,
		current = 0,
		beenWrong = false;
	for (let s of survivor) {
		if (s && winners[s.id] && s.team === winners[s.id]) {
			count++;
		} else {
			if (current == 0 && !beenWrong) {
				current = count;
			}
			if (count > longest) {
				longest = count;
			}
			count = 0;
			if (s && winners[s.id]) {
				beenWrong = true;
			}
		}
	}
	return { current, longest };
}

function makeArray(obj) {
	if (Array.isArray(obj)) return obj;
	else {
		let arr = [];
		for (let key in obj) {
			arr[key] = obj[key];
		}
		return arr;
	}
}
