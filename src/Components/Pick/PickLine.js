import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import * as gameActions from '../../data/actions/gameActions';
class PickLine extends Component {
	constructor(props) {
		super(props);
		this.savePick = this.savePick.bind(this);
		this.addPick = this.addPick.bind(this);
		this.selectSurvivor = this.selectSurvivor.bind(this);
		this.state = {
			game: Object.assign({}, props.game)
		};
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

	selectSurvivor(team) {
		if (this.props.survivorTeams[this.state.game.week] === team) {
			this.props.actions.saveSurvivor(null, this.state.game.week);
		} else {
			this.props.actions.saveSurvivor(team, this.state.game.week);
		}
	}

	isValid(game) {
		const format = 'MMMM D h:mm a';
		const now = moment(moment(), format);
		const gameTime = moment(game.date + ' ' + game.time, format);

		return now.isBefore(gameTime);
	}

	getSurvivorContent(team, week) {
		const selected = this.props.survivorTeams[week];
		if (selected || !this.isValid(this.state.game)) {
			return selected === team ? '⭐' : null;
		} else {
			return this.props.survivorTeams.find(x => x === team) ? null : '\u2606';
		}
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
	combine(arr) {
		if (arr) {
			return arr.filter(x => x).sort((a, b) => a < b).join(', ');
		}
		return '';
	}
	render() {
		const { game, picks } = this.props;
		const { awayTeam, homeTeam } = game;
		let pick = picks[game.id];
		let awaySurvivor = this.getSurvivorContent(awayTeam, game.week);
		let homeSurvivor = this.getSurvivorContent(homeTeam, game.week);
		const awaySelected = pick === awayTeam ? 'selected' : '';
		const homeSelected = pick === homeTeam ? 'selected' : '';
		const divider = !this.isValid(game) ? 'divider' : '';
		let correct = '';
		if (game.winner) {
			correct = pick === game.winner ? 'correct' : 'wrong';
		}
		return (
			<div className={'container'}>
				{awaySurvivor &&
					<button
						onClick={() => this.selectSurvivor(awayTeam)}
						className={'survivor-away'}
					>
						{awaySurvivor}
					</button>}
				<span
					className={`awayTeam box ${divider} ${awaySelected} ${correct}`}
					onClick={() => this.savePick(awayTeam)}
				>
					<span>
						{awayTeam}
					</span>
				</span>
				<span className={'at box'}>@</span>
				<span
					className={`homeTeam box ${divider} ${homeSelected} ${correct}`}
					onClick={() => this.savePick(homeTeam)}
				>
					<span>
						{homeTeam}
					</span>
				</span>
				{homeSurvivor &&
					<button
						onClick={() => this.selectSurvivor(homeTeam)}
						className={'survivor-home'}
					>
						{homeSurvivor}
					</button>}
				{!this.isValid(game) &&
					<span className={'pickedAway'}>
						{this.combine(game.pickedAwayTeam)}
					</span>}
				{!this.isValid(game) &&
					<span className={'pickedHome'}>
						{this.combine(game.pickedHomeTeam)}
					</span>}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const { picks, user } = state;

	return {
		user,
		picks
	};
}
function mapActionsToProps(dispatch) {
	return { actions: bindActionCreators(gameActions, dispatch) };
}
export default connect(mapStateToProps, mapActionsToProps)(PickLine);
