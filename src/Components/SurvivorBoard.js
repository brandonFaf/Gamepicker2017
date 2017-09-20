import React, { Component } from 'react';
import { getStreaks } from '../data/actions/scoreActions';
class SurvivorBoard extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: false };
		this.selectStreak = this.selectStreak.bind(this);
	}
	selectStreak() {
		if (this.props.longest) {
			return this.props.streaks.map(x => {
				return { userName: x.userName, streak: x.longest };
			});
		} else {
			return this.props.streaks.map(x => {
				return { userName: x.userName, streak: x.current };
			});
		}
	}
	render() {
		const { userName } = this.props;
		let prevScore = 0;
		let rank = 1;
		let streaks = this.selectStreak().sort((a, b) => b.streak - a.streak);
		if (this.state.loading) {
			return <div className="loader" />;
		}
		let header = '';
		if (this.props.longest) {
			header = <h3> Longest </h3>;
		} else {
			header = <h3> Current </h3>;
		}
		return (
			<div className={'streakContainer'}>
				{header}
				<ul>
					{streaks.map(function(n, i) {
						if (i > 0 && n.streak !== prevScore) {
							rank++;
						}
						let val = `${rank}. ${n.userName}: ${n.streak}`;
						if (n.userName === userName) {
							val = (
								<strong>
									{val}
								</strong>
							);
						}
						prevScore = n.streak;
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

export default SurvivorBoard;
