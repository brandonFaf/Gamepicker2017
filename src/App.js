import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import Main from './Components/Main.js';
import './App.css';
import config from './data/firebaseConfig.js';
class App extends Component {
	constructor(props) {
		super(props);
		firebase.initializeApp(config);
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

export default App;
