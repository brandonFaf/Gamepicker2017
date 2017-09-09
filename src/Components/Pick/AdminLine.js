import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import * as selectActions from '../../data/actions/gameActions';
class AdminLine extends Component {
	constructor(props) {
		super(props);
		this.saveWinner = this.saveWinner.bind(this);
		this.state = { game: Object.assign({}, props.game) };
	}
	isValid(game) {
		const format = 'MMMM D h:mm a';
		const now = moment(moment(), format);
		const gameTime = moment(game.date + ' ' + game.time, format);

		return now.isBefore(gameTime);
	}

	saveWinner(teamName) {
		let winningTeam, losingTeam;
		winningTeam = teamName;
		losingTeam =
			teamName === this.state.game.awayTeam
				? this.state.game.homeTeam
				: this.state.game.awayTeam;
		this.setState({
			game: Object.assign(this.state.game, { winner: teamName })
		});
		this.props.actions.saveWinner(this.state.game, winningTeam, losingTeam);
	}
	render() {
		if (!this.props.user.isAdmin) {
			return <div>Your're not welcome here</div>;
		}
		const { game } = this.props;
		const awaySelected = game.winner === game.awayTeam ? 'selected' : '';
		const homeSelected = game.winner === game.homeTeam ? 'selected' : '';
		return (
			<li className={'admin'}>
				<span
					className={awaySelected}
					onClick={() => this.saveWinner(game.awayTeam)}
				>
					{game.awayTeam}
				</span>{' '}
				@{' '}
				<span
					className={homeSelected}
					onClick={() => this.saveWinner(game.homeTeam)}
				>
					{' '}{game.homeTeam}
				</span>
			</li>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const game = ownProps.game;

	return {
		game,
		user: state.user
	};
}
function mapActionsToProps(dispatch) {
	return { actions: bindActionCreators(selectActions, dispatch) };
}
export default connect(mapStateToProps, mapActionsToProps)(AdminLine);
