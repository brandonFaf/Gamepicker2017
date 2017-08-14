import React, { Component } from 'react';
import { connect } from 'react-redux';
class PickerPage extends Component {
	render() {
		return (
			<div>
				PickerPage
				{this.props.games.map(x => {
					return (
						<li key={x.awayTeam}>
							{x.awayTeam} vs {x.homeTeam}
						</li>
					);
				})}
			</div>
		);
	}
}
function getGamesByWeek(games, week) {
	week = 3;
	const gamesToDisplay = games.filter(game => {
		return game.week === week;
	});
	return gamesToDisplay;
}

function mapStateToProps(state, ownProps) {
	return {
		games: getGamesByWeek(state.games, ownProps.week)
	};
}

export default connect(mapStateToProps)(PickerPage);
