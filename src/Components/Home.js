import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../data/actions/userActions.js';
class Home extends Component {
	render() {
		let link = null;
		if (this.props.user.id) {
			link = <a onClick={this.props.actions.logOut}>logout</a>;
		} else {
			link = <Link to="/login">login</Link>;
		}
		return (
			<div>
				<div>Home</div>
				<span>{this.props.user.userName}</span> |
				{link} |
				<Link to="/pick">Pick</Link>
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
	return { actions: bindActionCreators(userActions, dispatch) };
}

export default connect(mapStateToProps, mapActionsToProps)(Home);
