import React from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
import HomePage from './home_page';

const BASE_URL = 'http://localhost:5000/';

export default class ChangeCustomer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      username: props.state.user_data.Username,
      password: props.state.user_data.Password,
      data: {
        CustomerID: props.state.data.CustomerID,
        Username: props.state.data.Username,
        Birthday: props.state.data.Birthday,
        SEX: props.state.data.SEX,
        Medical_History: props.state.data.Medical_History,
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
    let url = `${BASE_URL}api/put?table=Customer&key=CustomerID&id=${this.state.data.CustomerID}`
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
	                Medical History: <input name='Medical_History' type='text'
	                  value={this.state.data.Medical_History}
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
