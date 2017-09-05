import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../data/actions/userActions';
import firebase from 'firebase';
class UserName extends Component {
	constructor(props) {
		super(props);
		this.userNameChanged = this.userNameChanged.bind(this);
		this.state = {
			userName: ''
		};
	}
	componentDidMount() {
		let self = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				self.setState({ uid: user.uid });
			}
		});
	}
	userNameChanged(event) {
		this.setState({ userName: event.target.value });
	}
	render() {
		return (
			<div
				onSubmit={() =>
					this.props.actions.saveUser(this.state.userName, this.state.uid)}
				className={'container'}
			>
				<label htmlFor="userName">User Name:</label>
				<input
					id={'userName'}
					type="text"
					value={this.state.userName}
					onChange={this.userNameChanged}
				/>
				<button
					onClick={() =>
						this.props.actions.saveUser(
							this.state.userName,
							this.state.uid,
							this.props.history
						)}
				>
					Create Account
				</button>
			</div>
		);
	}
}
function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
}
export default connect(null, mapActionsToProps)(UserName);
