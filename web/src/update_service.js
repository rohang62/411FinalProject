import React from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
import ProviderHome from './provider_home';

const BASE_URL = 'http://localhost:5000/';

export default class UpdateService extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      username: props.state.username,
      password: props.state.password,
      data: props.state.data,
      user_data: props.state.user_data,
			s: 0,
      res: [],
			service_data: props.state.service_data
    };
    this.changeData = this.changeData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  changeData(event) {
    let data = this.state.service_data;
		data[event.target.name] = event.target.value;
		this.setState({ service_data: data })
  }

	handleSubmit() {
    let url = `${BASE_URL}api/put?table=Services&key=ServiceID&id=${this.state.service_data.ServiceID}`
    axios.put(url, this.state.service_data, {
    headers:
      { 'Access-Control-Allow-Origin': '*' }
  })
    .then(res => {
      this.setState({ error: '', s: 1 });
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
    if (this.state.s === 0) {
      console.log(this.state.service_data)
			return (
	          <div className="App">
	          <header className="App-header">
	            <h2>Update Service Data</h2>
	            <img src={logo} className="App-logo" alt="logo" />
	            <div>
	              <div>
	                Service Type: <input name='ServiceType' type='text'
	                  value={this.state.service_data.ServiceType}
	                  onChange={this.changeData} />
	              </div>
                <div>
	                Opening Time: <input name='OpeningTime' type='text'
	                  value={this.state.service_data.OpeningTime}
	                  onChange={this.changeData} />
	              </div>
                <div>
	                Closing Time: <input name='ClosingTime' type='text'
	                  value={this.state.service_data.ClosingTime}
	                  onChange={this.changeData} />
	              </div>
                <div>
	                Turnaround Time: <input name='TurnaroundTime' type='text'
	                  value={this.state.service_data.TurnaroundTime}
	                  onChange={this.changeData} />
	              </div>
                <div>
	                Price: <input name='Price' type='text'
	                  value={this.state.service_data.Price}
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
          <ProviderHome state={this.state} />
        </div>
      );
    }
   }
}
