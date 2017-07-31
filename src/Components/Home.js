import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: '',
			email: '',
			signedIn: false
		};
	}
	componentDidMount() {
		let self = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				self.setState({
					signedIn: true,
					displayName: user.displayName,
					email: user.email
				});
			}
		});
	}
	render() {
		return (
			<div>
				<div>Home</div>
				<span>{this.state.displayName}</span> |
				<span>{this.state.email}</span> |
				<span>{this.state.signedIn}</span>
				<Link to="/login">login</Link>
			</div>
		);
	}
}

export default Home;
