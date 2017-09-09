import * as types from './actionTypes';
//Offline
// import GameAPI from '../../data/OfflineGameAPI';
//Firebase
import GameAPI from '../FirebaseGameAPI';
import { showLoading } from './loadingActions';
function loadGamesSuccess(games) {
	return { type: types.LOAD_GAMES_SUCCESS, games };
}
function savePickSuccess(game, teamName) {
	return { type: types.SAVE_PICK, game, teamName };
}
function saveWinnerSuccess(game, winningTeam, losingTeam) {
	return { type: types.SAVE_WINNER, game, winningTeam, losingTeam };
}
function loadPicksSuccess(picks) {
	return { type: types.LOAD_PICKS_SUCCESS, picks };
}
function loadWeeklyRecordsSuccess(teams) {
	return { type: types.LOAD_WEEKLY_RECORDS_SUCCESS, teams };
}
export function loadGames() {
	return function(dispatch) {
		return GameAPI.loadGames()
			.then(snapshot => {
				//TODO: return only the current week and week before and after and get the other weeks later
				//A hacky way to do this would be to grab like 16*3 games around the current week. I'll grab extras though because of byes
				let keys = Object.keys(snapshot.val());
				//give the game an id based on the key it has. Have to do it with keys because might not always get an array back.
				let games = snapshot.val().filter(String).map((n, i) => {
					return Object.assign(n, { id: keys[i] });
				});
				dispatch(loadGamesSuccess(games));
			})
			.catch(err => {
				throw err;
			});
	};
}
export function savePick(game, winningTeam) {
	return (dispatch, getState) => {
		dispatch(showLoading());
		let updates = {};
		const { user } = getState();
		updates[`picks/${user.id}/${game.id}`] = winningTeam;
		updates[`games/${game.id}`] = game;
		return GameAPI.savePick(updates)
			.then(() => {
				dispatch(savePickSuccess(game, winningTeam));
			})
			.catch(err => {
				throw err;
			});
	};
}
export function saveWinner(game, winningTeam, losingTeam) {
	return (dispatch, getState) => {
		dispatch(showLoading());
		let updates = {};
		updates[`winners/${game.id}`] = winningTeam;
		updates[`records/result/${winningTeam}/${game.week}`] = true;
		updates[`records/result/${losingTeam}/${game.week}`] = false;
		updates[`games/${game.id}`] = game;
		return GameAPI.savePick(updates)
			.then(() => {
				dispatch(saveWinnerSuccess(game, winningTeam, losingTeam));
			})
			.catch(err => {
				throw err;
			});
	};
}
export function loadPicks(userId) {
	return function(dispatch) {
		return GameAPI.loadUserPicks(userId).then(snapshot => {
			if (snapshot.val()) {
				dispatch(loadPicksSuccess(snapshot.val()));
			}
		});
	};
}

export function loadWeeklyRecords() {
	return function(dispatch) {
		return GameAPI.loadWeeklyRecords().then(snapshot => {
			if (snapshot.val()) {
				dispatch(loadWeeklyRecordsSuccess(snapshot.val()));
			}
		});
	};
}
