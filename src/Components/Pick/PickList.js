import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeList from './TimeList';
class PickList extends Component {
	render() {
		let result =
			Object.keys(this.props.games).length === 0
				? <div className="loader" />
				: <ul>
						{Object.keys(this.props.games).map(gameTime => {
							let games = this.props.games[gameTime];
							return (
								<TimeList
									key={gameTime}
									survivor={this.props.survivor}
									gameTime={gameTime}
									games={games}
								/>
							);
						})}
					</ul>;
		return result;
	}
}
function getGamesByWeek(games, week) {
	const gamesToDisplay = games.filter(game => {
		return game.week === week;
	});
	let timeMap = {};
	gamesToDisplay.forEach(game => {
		const key = game.day + ' ' + game.date + ' ' + game.time;
		if (!timeMap[key]) {
			timeMap[key] = [];
		}
		timeMap[key].push(game);
	});
	return timeMap;
}

function mapStateToProps(state, ownProps) {
	return {
		games: getGamesByWeek(state.games, ownProps.week),
		survivor: state.survivor
	};
}

export default connect(mapStateToProps)(PickList);
