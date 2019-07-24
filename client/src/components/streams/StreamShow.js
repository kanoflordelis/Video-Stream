import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchStream(this.props.match.params.id);
		this.buildPlayer();
	}

	componentDidUpdate() {
		this.buildPlayer();
	}

	componentWillUnmount() {
		this.player.destroy();
	}

	buildPlayer() {
		const { id } = this.props.match.params;

		if (this.player || !this.props.stream) {
			return;
		}
		this.player = flv.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${id}.flv`
		});
		this.player.attachMediaElement(this.videoRef.current);
		this.player.load();
	}

	render() {
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}

		const { title, description } = this.props.stream;

		return (
			<div>
				<div
					className="ui fluid container"
					style={{ height: '580px', paddingBottom: '50px' }}
				>
					<video
						ref={this.videoRef}
						style={{ width: '100%', height: '100%' }}
						controls={true}
					/>
				</div>
				<div className="ui container">
					<div style={{ margin: '0 100px' }}>
						<h1>{title}</h1>
						<div className="ui red label">
							<i className="heart outline icon" />
							259
						</div>
						<div className="ui divider" />
						<h5>{description}</h5>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
	mapStateToProps,
	{ fetchStream }
)(StreamShow);
