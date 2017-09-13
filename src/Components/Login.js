import React, { Component } from 'react';
import firebaseui from 'firebaseui';
import firebase from 'firebase';
class Login extends Component {
	componentDidMount() {
		const uiConfig = {
			signInSuccessUrl: '/login/username',
			signInOptions: [
				// Leave the lines as is for the providers you want to offer your users.
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				firebase.auth.FacebookAuthProvider.PROVIDER_ID,
				firebase.auth.TwitterAuthProvider.PROVIDER_ID,
				firebase.auth.EmailAuthProvider.PROVIDER_ID
			]
		};
		// Initialize the FirebaseUI Widget using Firebase.
		let ui = new firebaseui.auth.AuthUI(firebase.auth());
		// The start method will wait until the DOM is loaded.
		ui.start('#firebaseui-auth-container', uiConfig);
	}
	render() {
		return (
			<div className="login-container">
				<div>login</div>
				<div id="firebaseui-auth-container" />
			</div>
		);
	}
}
export default Login;
