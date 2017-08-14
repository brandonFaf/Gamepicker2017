import { combineReducers } from 'redux';
import games from './gamesReducer';
import user from './UserReducer';
import loading from './loadingReducer';
import picks from './picksReducer';
import weeklyRecords from './weeklyRecordsReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
	games,
	user,
	loading,
	picks,
	weeklyRecords,
	routing: routerReducer
});
export default rootReducer;
