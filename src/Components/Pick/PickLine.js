import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import * as selectActions from '../../data/actions/gameActions';
class PickLine extends Component {
	constructor(props) {
		super(props);
		this.savePick = this.savePick.bind(this);
		this.addPick = this.addPick.bind(this);
		this.state = { game: Object.assign({}, props.game) };
	}
	addPick(game, array) {
		if (!game[array]) {
			game[array] = [];
		}
		const userIndex = game[array].indexOf(this.props.user.userName);
		if (userIndex < 0) {
			game[array].push(this.props.user.userName);
		}
	}
	removePick(game, array) {
		if (!game[array]) {
			return (game[array] = []);
		}
		const userIndex = game[array].indexOf(this.props.user.userName);
		if (userIndex >= 0) {
			game[array].splice(userIndex, 1);
		}
	}

	isValid(game) {
		const format = 'MMMM D h:mm a';
		const now = moment(moment(), format);
		const gameTime = moment(game.date + ' ' + game.time, format);

		return now.isBefore(gameTime);
	}

	savePick(teamName) {
		let winningTeam, losingTeam;
		if (!this.isValid(this.state.game)) {
			this.props.showError();
			return;
		}
		if (teamName === this.state.game.awayTeam) {
			winningTeam = this.state.game.awayTeam;
			losingTeam = this.state.game.homeTeam;
			this.addPick(this.state.game, 'pickedAwayTeam');
			this.removePick(this.state.game, 'pickedHomeTeam');
		} else {
			losingTeam = this.state.game.awayTeam;
			winningTeam = this.state.game.homeTeam;
			this.addPick(this.state.game, 'pickedHomeTeam');
			this.removePick(this.state.game, 'pickedAwayTeam');
		}
		this.props.actions.savePick(this.state.game, winningTeam, losingTeam);
	}
	render() {
		const { game, picks } = this.props;
		let pick = picks[game.id];
		const awaySelected = pick === game.awayTeam ? 'selected' : '';
		const homeSelected = pick === game.homeTeam ? 'selected' : '';
		let correct = '';
		if (game.winner) {
			correct = pick === game.winner ? 'correct' : 'wrong';
		}
		return (
			<li>
				<span
					className={`${awaySelected} ${correct}`}
					onClick={() => this.savePick(game.awayTeam)}
				>
					{game.awayTeam}
				</span>{' '}
				@{' '}
				<span
					className={`${homeSelected} ${correct}`}
					onClick={() => this.savePick(game.homeTeam)}
				>
					{' '}{game.homeTeam}
				</span>
			</li>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const game = ownProps.game;
	const picks = state.picks;

	return {
		game,
		user: state.user,
		picks
	};
}
function mapActionsToProps(dispatch) {
	return { actions: bindActionCreators(selectActions, dispatch) };
}
export default connect(mapStateToProps, mapActionsToProps)(PickLine);
