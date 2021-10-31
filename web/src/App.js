import React from 'react';
import './App.css';
import LoginPage from './login_page';

export default class App extends React.Component {
	render() {
		return (
			<div id='App-header'>
				<LoginPage state={{}} />
			</div>
		)
	}
}
