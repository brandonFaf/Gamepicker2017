import React, { Component } from 'react';
import { getScores } from '../data/actions/scoreActions';
class Scoreboard extends Component {
	constructor(props) {
		super(props);
		this.state = { scores: [], loading: true };
	}
	componentDidMount() {
		getScores().then(scores => {
			this.setState({
				scores: scores.scoresWeekly,
				loading: !this.state.loading
			});
		});
	}
	render() {
		const { userName } = this.props;
		let prevScore = 0;
		let rank = 1;
		if (this.state.loading) {
			return <div className="loader" />;
		}
		return (
			<div>
				<ul>
					<h2>Scoreboard</h2>
					{this.state.scores.map(function(n, i) {
						if (i > 0 && n.score !== prevScore) {
							rank++;
						}
						let val = `${rank}. ${n.userName}: ${n.score}`;
						if (n.userName === userName) {
							val = (
								<strong>
									{val}
								</strong>
							);
						}
						prevScore = n.score;
						return (
							<li key={n.userName}>
								{val}
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

export default Scoreboard;
