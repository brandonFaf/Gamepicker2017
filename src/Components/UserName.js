import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../data/actions/userActions';
import firebase from 'firebase';
class UserName extends Component {
	constructor(props) {
		super(props);
		this.userNameChanged = this.userNameChanged.bind(this);
		this.submitUserName = this.submitUserName.bind(this);
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
	submitUserName() {
		if (this.props.user.userName !== '') {
			this.props.actions.saveUser(
				this.props.user.userName,
				this.state.uid,
				this.props.history
			);
		} else {
			this.props.actions.saveUser(
				this.state.userName,
				this.state.uid,
				this.props.history
			);
		}
	}
	userNameChanged(event) {
		this.setState({ userName: event.target.value });
	}
	render() {
		let userName = this.props.user.userName;
		let userNameDisabled = userName && userName !== '';
		return (
			<div onSubmit={this.submitUserName} className={'container'}>
				<label htmlFor="userName">User Name:</label>
				<input
					id={'userName'}
					type="text"
					value={userName}
					onChange={this.userNameChanged}
					disabled={userNameDisabled}
				/>
				<button onClick={this.submitUserName}>Create Account</button>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		user: state.user
	};
}
function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
}
export default connect(mapStateToProps, mapActionsToProps)(UserName);
