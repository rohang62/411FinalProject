import React from 'react';
import './App.css';
import axios from 'axios';
import LoginPage from './login_page';
import ChangeUser from './change_user';
import ChangeProvider from './change_provider';
import ProviderHome from './provider_home';

const BASE_URL = 'http://localhost:5000/';

export default class ProviderProfile extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      username: props.state.username,
      password: props.state.password,
      data: props.state.data,
      user_data: props.state.user_data,
			s: 0,
    };
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangeProvider = this.handleChangeProvider.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleGoBack = this.handleGoBack.bind(this);
  }

  handleChangeUser() {
		this.setState({ s: 1 });
	}

	handleChangeProvider() {
		this.setState({ s: 2 });
	}

	handleGoBack() {
		this.setState({ s: 4 });
	}

	handleDelete() {
    let url = `${BASE_URL}api/delete?table=User&key=Username&id=${this.state.username}`
    axios.delete(url, {
    headers:
      { 'Access-Control-Allow-Origin': '*' }
  })
    .then(res => {
      this.setState({ error: '', s: 3 });
    }).catch((error) => {
      this.setState({
        error: error.response.data,
        s: 5
      });
    });
	}

	render() {
		if (this.state.s === 0) {
			return (
				<div id='App-header'>
				<header className="App-header">
				<div>
					Username: {this.state.user_data.Username}<br />
          Password: {this.state.user_data.Password}<br />
          First_Name: {this.state.user_data.First_Name}<br />
          Last_Name: {this.state.user_data.Last_Name}<br />
          Email: {this.state.user_data.Email}<br />
          Address: {this.state.user_data.Address}
					</div>
          <div>
          <button className="button" onClick={this.handleChangeUser}> Change User Data </button>
          </div>
          <div>
  					ProviderID: {this.state.data.ProviderID}<br />
            BusinessName: {this.state.data.BusinessName}<br />
            PhoneNumber: {this.state.data.PhoneNumber}<br />
  					</div>
            <div>
            <button className="button" onClick={this.handleChangeProvider}> Change Provider Data </button>
            </div>
						<br />
						<div>
            <button className="button" onClick={this.handleDelete} id = "button2"> Delete User </button>
						<button className="button" onClick={this.handleGoBack} id = "button3"> Go Home </button>
            </div>
					</header>
				</div>
			)
		} else if (this.state.s === 1) {
			return (
        <div className="App">
          <ChangeUser state = {this.state} />
        </div>
      );
		} else if (this.state.s === 2) {
      return (
        <div className="App">
          <ChangeProvider state = {this.state} />
        </div>
      );
    } else if (this.state.s === 3) {
      return (
  			<div id='App-header'>
  				<LoginPage state={{}} />
  			</div>
  		)
    } else {
			return (
      <div className="App">
        <ProviderHome state={this.state}/>
      </div>
    );
		}
	}
}
