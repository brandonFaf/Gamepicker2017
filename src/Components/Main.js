import React from 'react';
import Home from './Home';
import Login from './Login';
import { Switch, Route } from 'react-router-dom';
const Main = () =>
	<div>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
		</Switch>
	</div>;
export default Main;
