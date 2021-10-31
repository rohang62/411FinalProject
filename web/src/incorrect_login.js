import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import LoginScreen from './login_page';
import HomePage from './home_page';
import SignUp from './sign_up';

const BASE_URL = 'http://localhost:5000/';

export default class IncorrectLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.state.username,
      password: props.state.password,
      logged: 1,
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  changeUsername(event) {
    this.setState({ username: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit() {
    let url = `${BASE_URL}api/select` + '?query=' + '\'SELECT Password FROM User WHERE Username = "' + this.state.username + '"\'';
    console.log(url);
    axios.get(url,
			{ headers: { 'Access-Control-Allow-Origin': '*', } })
			.then(res => {
				const data = res.data;
				if (data === null || data['data'].length === 0) {
          this.setState({ logged: 1 });
        } else {
          if (data['data'][0]['Password'] == this.state.password) {
            this.setState({ logged: 2 });
          }
        }
			}).catch((error) => {
				this.setState({
					error: error.response.data.Error,
					requestDone: 2
				});
			});
  }

  handleSignUp() {
    this.setState({ logged: 3 });
  }

  render() {
    if (this.state.logged === 0) {
      return (
        <div className="App">
          <LoginScreen state={this.state} />
        </div>
      );
    } else if (this.state.logged === 1) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div>
              <label>
                Username:
                <input
                  type="text"
                  value={this.state.username}
                  onChange={this.changeUsername}
                />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.changePassword}
                />
              </label>
            </div>
            <div className="Incorrect">
              Incorrect details. Please try again.
            </div>
            <br />
            <div>
            <button className="button" onClick={this.handleSubmit}> Submit </button>
            </div>
            <div>
            -
            </div>
            <div>
            <button className="button" onClick={this.handleSignUp}> Sigh Up </button>
            </div>
          </header>
        </div>
      );
    } else if (this.state.logged === 2) {
      return (
      <div className="App">
        <HomePage state={this.state} />
      </div>
    );
    } else {
      return (
      <div className="App">
        <SignUp />
      </div>
    );
    }
  }
}
