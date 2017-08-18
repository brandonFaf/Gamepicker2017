import React from 'react';
import Home from './Home';
import Login from './Login';
import PickPage from './Pick/PickPage';
import { Route } from 'react-router-dom';
const Main = () =>
	(<div>
		<Route exact path="/" component={Home} />
		<Route path="/login" component={Login} />
		<Route path="/pick" component={PickPage} />
	</div>);
export default Main;
