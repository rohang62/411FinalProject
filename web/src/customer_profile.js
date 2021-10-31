import React from 'react';
import './App.css';
import axios from 'axios';
import LoginPage from './login_page';
import ChangeUser from './change_user';
import ChangeCustomer from './change_customer';

const BASE_URL = 'http://localhost:5000/';

export default class CustomerProfile extends React.Component {
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
    this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChangeUser() {
		this.setState({ s: 1 });
	}

	handleChangeCustomer() {
		this.setState({ s: 2 });
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
        s: 4
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
  					CustomerID: {this.state.data.CustomerID}<br />
            Birthday: {this.state.data.Birthday}<br />
            SEX: {this.state.data.SEX}<br />
            Medical History: {this.state.data.Medical_History}<br />
  					</div>
            <div>
            <button className="button" onClick={this.handleChangeCustomer}> Change Customer Data </button>
            </div>
            <br />
            <div>
            <button className="button" onClick={this.handleDelete} id = "button2"> Delete User </button>
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
          <ChangeCustomer state = {this.state} />
        </div>
      );
    } else {
      return (
  			<div id='App-header'>
  				<LoginPage state={{}} />
  			</div>
  		)
    }
	}
}
