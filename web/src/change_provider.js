import React from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
import HomePage from './home_page';

const BASE_URL = 'http://localhost:5000/';

export default class ChangeProvider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      username: props.state.user_data.Username,
      password: props.state.user_data.Password,
      data: {
        ProviderID: props.state.data.ProviderID,
        Username: props.state.data.Username,
        BusinessName: props.state.data.BusinessName,
  			PhoneNumber: props.state.data.PhoneNumber,
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
    let url = `${BASE_URL}api/put?table=MedicalProvider&key=ProviderID&id=${this.state.data.ProviderID}`
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
	            <h2>Update Provider Data</h2>
	            <img src={logo} className="App-logo" alt="logo" />
	            <div>
	              <div>
	                Business Name: <input name='BusinessName' type='text'
	                  value={this.state.data.BusinessName}
	                  onChange={this.changeData} />
	              </div>
	              <div>
	                Phone Number: <input name='PhoneNumber' type='text'
	                  value={this.state.data.PhoneNumber}
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
