import * as types from '../actions/actionTypes.js';

export default function survivorReducer(state = [], action) {
	switch (action.type) {
		case types.LOAD_SURVIVOR_SUCCESS: {
			if (Array.isArray(action.teams)) return action.teams;
			else {
				let arr = [];
				for (let key in action.teams) {
					arr[key] = action.teams[key];
				}
				return arr;
			}
		}
		case types.SAVE_SURVIVOR: {
			let newArray = state.slice();

			newArray[action.week] = action.team
				? { team: action.team, id: action.id }
				: null;
			return newArray;
		}
		default:
			return state;
	}
}
