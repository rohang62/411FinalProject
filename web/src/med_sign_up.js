import React from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
import HomePage from './home_page';

const BASE_URL = 'http://localhost:5000/';

export default class MedSignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      data: {
        Username: '',
  			Password: '',
  			First_Name: '',
  			Last_Name: '',
  			Email: '',
  			Address: '',
  			BusinessName: '',
  			PhoneNumber: '',
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
		let url = `${BASE_URL}api/procedure?type=addProvider`
    axios.post(url, this.state.data,
			{ headers: { 'Access-Control-Allow-Origin': '*', } })
			.then(res => {
						let data = res['data']
        		this.setState({ error: data, requestDone: 1 });
			}).catch((error) => {
				this.setState({
					error: error.response.data.Error,
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
              <h2>Sign Up As a Medical Provider</h2>
              <img src={logo} className="App-logo" alt="logo" />
              <div>
                <div>
                  Username: <input name='Username' type='text'
                    value={this.state.data.username}
                    onChange={this.changeData} />
                </div>
                <div>
                  Password: <input name='Password' type='text'
                    value={this.state.data.password}
                    onChange={this.changeData} />
                </div>
                <div>
                  First Name: <input name='First_Name' type='text'
                    value={this.state.data.f_name}
                    onChange={this.changeData} />
                </div>
                <div>
                  Last Name: <input name='Last_Name' type='text'
                    value={this.state.data.l_name}
                    onChange={this.changeData} />
                </div>
                <div>
                  Email: <input name='Email' type='text'
                    value={this.state.data.email}
                    onChange={this.changeData} />
                </div>
                <div>
                  Address: <input name='Address'
                    type='text' value={this.state.data.address}
                    onChange={this.changeData} />
                </div>
                <div>
                  Business Name: <input name='BusinessName' type='text'
                    value={this.state.data.b_name}
                    onChange={this.changeData} />
                </div>
                <div>
                  Phone Number: <input name='PhoneNumber'
                    type='text' value={this.state.data.phone}
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
    } else if (this.state.requestDone === 1) {
			let s = {username: this.state.data.Username, password: this.state.data.Password}
        return (
        <div className="App">
          <HomePage state={s} />
        </div>
      );
    }
    return (
          <div className="App">
          <header className="App-header">
            <h2>Sign Up As a Medical Provider</h2>
            <img src={logo} className="App-logo" alt="logo" />
            <div>
              <div>
                Username: <input name='Username' type='text'
                  value={this.state.data.username}
                  onChange={this.changeData} />
              </div>
              <div>
                Password: <input name='Password' type='text'
                  value={this.state.data.password}
                  onChange={this.changeData} />
              </div>
              <div>
                First Name: <input name='First_Name' type='text'
                  value={this.state.data.f_name}
                  onChange={this.changeData} />
              </div>
              <div>
                Last Name: <input name='Last_Name' type='text'
                  value={this.state.data.l_name}
                  onChange={this.changeData} />
              </div>
              <div>
                Email: <input name='Email' type='text'
                  value={this.state.data.email}
                  onChange={this.changeData} />
              </div>
              <div>
                Address: <input name='Address'
                  type='text' value={this.state.data.address}
                  onChange={this.changeData} />
              </div>
              <div>
                Business Name: <input name='BusinessName' type='text'
                  value={this.state.data.b_name}
                  onChange={this.changeData} />
              </div>
              <div>
                Phone Number: <input name='PhoneNumber'
                  type='text' value={this.state.data.phone}
                  onChange={this.changeData} />
              </div>
              <div className="Incorrect">
                Username already exists
              </div>
              <div>
                <button onClick={this.handleSubmit}
                  disabled={!allfilled}> Submit </button>
              </div>
            </div>
            </header>
          </div>
      );
   }
}
