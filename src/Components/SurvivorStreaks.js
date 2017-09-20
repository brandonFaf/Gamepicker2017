import React, { Component } from 'react';
import { getStreaks } from '../data/actions/scoreActions';
import SurvivorBoard from './SurvivorBoard.js';
class SurvivorStreaks extends Component {
	constructor(props) {
		super(props);
		this.state = { scores: [], loading: true };
	}
	componentDidMount() {
		getStreaks().then(streaks => {
			this.setState({
				streaks,
				loading: false
			});
		});
	}
	render() {
		const { userName } = this.props;
		if (this.state.loading) {
			return <div className="loader" />;
		}
		return (
			<div>
				<h2>Survivor Streaks</h2>
				<SurvivorBoard
					userName={userName}
					streaks={this.state.streaks}
					longest
				/>
				<SurvivorBoard
					userName={userName}
					streaks={this.state.streaks}
					current
				/>
			</div>
		);
	}
}

export default SurvivorStreaks;
