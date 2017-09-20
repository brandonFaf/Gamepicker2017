import React, { Component } from 'react';
import PickList from './PickList';
import './pickpage.css';
class PickPage extends Component {
	constructor(props) {
		super(props);
		this.state = { week: 3 };
	}
	render() {
		const weeks = Array.apply(null, { length: 17 }).map(Number.call, Number);
		return (
			<div>
				<h1>Make Your Picks</h1>
				<div className={'weeksContainer'}>
					{weeks.map(week =>
						<h3
							key={week}
							className={this.state.week === week + 1 ? 'isActive' : ''}
							onClick={() => this.setState({ week: week + 1 })}
						>
							{week + 1}
						</h3>
					)}
				</div>
				<PickList week={this.state.week} />
			</div>
		);
	}
}

export default PickPage;
