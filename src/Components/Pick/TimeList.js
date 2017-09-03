import React, { Component } from 'react';
import PickLine from './PickLine';
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
				<ul>
					{games.map(game =>
						<PickLine
							showError={this.showError.bind(this)}
							key={game.id}
							game={game}
						/>
					)}
				</ul>
			</li>
		);
	}
}

export default TimeList;
