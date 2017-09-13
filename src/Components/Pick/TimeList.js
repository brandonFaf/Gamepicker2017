import React, { Component } from 'react';
import PickLine from './PickLine';
import { Route } from 'react-router-dom';
import AdminLine from './AdminLine.js';
class TimeList extends Component {
	constructor(props) {
		super(props);
		this.state = { showError: false };
	}
	showError() {
		this.setState({ showError: true });
	}
	render() {
		let { gameTime, games } = this.props;
		return (
			<li>
				<strong>
					{gameTime}
				</strong>
				{this.state.showError &&
					<div className={'error'}>
						Oops You tried to make/change your pick too late
					</div>}

				{games.map(game =>
					<div key={game.id}>
						<Route
							exact
							path="/pick"
							render={() =>
								<PickLine showError={this.showError.bind(this)} game={game} />}
						/>
						<Route
							exact
							path="/pick/admin"
							render={() =>
								<AdminLine showError={this.showError.bind(this)} game={game} />}
						/>
					</div>
				)}
			</li>
		);
	}
}

export default TimeList;
