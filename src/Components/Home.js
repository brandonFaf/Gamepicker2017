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
			} else {
				self.setState({
					signedIn: false,
					displayName: '',
					email: ''
				});
			}
		});
	}
	logout() {
		firebase.auth().signOut();
	}
	render() {
		let link = null;
		if (this.state.signedIn) {
			link = <a onClick={this.logout}>Logout</a>;
		} else {
			link = <Link to="/login">login</Link>;
		}
		return (
			<div>
				<div>Home</div>
				<span>{this.state.displayName}</span> |
				<span>{this.state.email}</span> |
				{link}
			</div>
		);
	}
}

export default Home;
