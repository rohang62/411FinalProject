import React from 'react';
import './App.css';
import ProviderProfile from './provider_profile';

export default class ProviderHome extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      username: props.state.username,
      password: props.state.password,
      data: props.state.data,
      user_data: props.state.user_data,
			s: 0,
    };
    this.handleProfile = this.handleProfile.bind(this);
  }

	handleProfile() {
		this.setState({ s: 1 });
	}
	render() {
		if (this.state.s === 0) {
			return (
				<div id='App-header'>
				<header className="App-header">
				<div>
					Logged In As Medical Provider
					</div>
					<div>
					<button className="button" onClick={this.handleProfile} id = 'button1' type = "button"> Profile </button>
					</div>
					</header>
				</div>
			)
		} else if (this.state.s === 1) {
			return (
        <div className="App">
          <ProviderProfile state={this.state}/>
        </div>
      );
		}
	}
}
