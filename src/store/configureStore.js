import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../data/reducers';

export const history = createHistory();
const logger = createLogger();

const initialState = {};
const middleware = [thunk, logger, routerMiddleware(history)];

const store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(...middleware)
);

export default store;
