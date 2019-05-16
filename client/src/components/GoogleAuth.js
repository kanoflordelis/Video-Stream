import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId:
						'451928490839-o2gm9qafqd4a0kinkm3q9uko9cnfesn9.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = isSignedIn => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSingOut = () => {
		this.auth.signOut();
	};

	onSingIn = () => {
		this.auth.signIn();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSingOut} className="ui red google button">
					<i className="google icon" />
					Sing Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSingIn} className="ui red google button">
					<i className="google icon" />
					Sing In with Google
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);
