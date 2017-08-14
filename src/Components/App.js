import React, { Component } from 'react';
import logo from '../logo.svg';
import Main from './Main.js';
import '../App.css';
import firebase from 'firebase';
import config from '../data/firebaseConfig.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as selectActions from '../data/actions/gameActions';
import { withRouter } from 'react-router';
class App extends Component {
	constructor(props) {
		super(props);
		firebase.initializeApp(config);
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log('here');
				props.actions.loadGames();
			}
		});
	}
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<Main />
			</div>
		);
	}
}
function mapActionsToProps(dispatch) {
	console.log('here 1');
	return { actions: bindActionCreators(selectActions, dispatch) };
}
export default withRouter(connect(null, mapActionsToProps)(App));
