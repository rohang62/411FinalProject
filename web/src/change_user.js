import React from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
import HomePage from './home_page';

const BASE_URL = 'http://localhost:5000/';

export default class ChangeUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      username: props.state.user_data.Username,
      password: props.state.user_data.Password,
      data: {
        Username: props.state.user_data.Username,
  			Password: props.state.user_data.Password,
  			First_Name: props.state.user_data.First_Name,
  			Last_Name: props.state.user_data.Last_Name,
  			Email: props.state.user_data.Email,
  			Address: props.state.user_data.Address,
      },
      requestDone: 0,
      error: '',
		};
    this.changeData = this.changeData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  changeData(event) {
    let data = this.state.data;
		data[event.target.name] = event.target.value;
		this.setState({ data: data })
  }

	handleSubmit() {
    let url = `${BASE_URL}api/put?table=User&key=Username&id=${this.state.username}`
    axios.put(url, this.state.data, {
    headers:
      { 'Access-Control-Allow-Origin': '*' }
  })
    .then(res => {
      this.setState({ error: '', requestDone: 1 });
    }).catch((error) => {
      this.setState({
        error: error.response.data,
        requestDone: 2
      });
    });
	}

	render() {
		let allfilled = true;
    Object.entries(this.state.data).forEach(([_, value]) => {
      if (value === '') {
        allfilled = false;
      }
    });
    if (this.state.requestDone === 0) {
			return (
	          <div className="App">
	          <header className="App-header">
	            <h2>Update User Data</h2>
	            <img src={logo} className="App-logo" alt="logo" />
	            <div>
	              <div>
	                Password: <input name='Password' type='text'
	                  value={this.state.data.Password}
	                  onChange={this.changeData} />
	              </div>
	              <div>
	                First Name: <input name='First_Name' type='text'
	                  value={this.state.data.First_Name}
	                  onChange={this.changeData} />
	              </div>
	              <div>
	                Last Name: <input name='Last_Name' type='text'
	                  value={this.state.data.Last_Name}
	                  onChange={this.changeData} />
	              </div>
	              <div>
	                Email: <input name='Email' type='text'
	                  value={this.state.data.Email}
	                  onChange={this.changeData} />
	              </div>
	              <div>
	                Address: <input name='Address'
	                  type='text' value={this.state.data.Address}
	                  onChange={this.changeData} />
	              </div>
	              <div>
	                <button onClick={this.handleSubmit}
	                  disabled={!allfilled}> Submit </button>
	              </div>
	            </div>
	            </header>
	          </div>
	      );
    } else {
        return (
        <div className="App">
          <HomePage state={this.state} />
        </div>
      );
    }
   }
}
