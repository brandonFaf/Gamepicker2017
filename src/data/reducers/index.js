import { combineReducers } from 'redux';
import games from './gamesReducer';
import user from './UserReducer';
import loading from './loadingReducer';
import picks from './picksReducer';
import weeklyRecords from './weeklyRecordsReducer';
import survivor from './survivorReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	games,
	user,
	loading,
	picks,
	weeklyRecords,
	survivor,
	routing: routerReducer
});
export default rootReducer;
