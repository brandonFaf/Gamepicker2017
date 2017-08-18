import React, { Component } from 'react';
import { connect } from 'react-redux';
import PickLine from './PickLine';
class PickList extends Component {
	render() {
		return (
			<ul>
				{this.props.games.map(game => <PickLine key={game.id} game={game} />)}
			</ul>
		);
	}
}
function getGamesByWeek(games, week) {
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

export default connect(mapStateToProps)(PickList);
