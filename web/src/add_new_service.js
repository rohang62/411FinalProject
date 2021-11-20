import React from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
import HomePage from './home_page';

const BASE_URL = 'http://localhost:5000/';

export default class AddNewService extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      username: props.state.username,
      password: props.state.password,
      data: props.state.data,
      user_data: props.state.user_data,
      service_data: {
        ServiceType: '',
  			OpeningTime: '',
  			ClosingTime: '',
  			TurnaroundTime: '',
  			Price: '',
      },
      requestDone: 0,
      error: '',
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
    let url = `${BASE_URL}api/select` + '?query=' + '\'SELECT ServiceType FROM Services WHERE ProviderID = ' + this.state.data.ProviderID + '\'';
    axios.get(url,{ headers: { 'Access-Control-Allow-Origin': '*', } })
    .then(res => {
      const data = res.data['data'];
      let exists = false;
      for (let i = 0; i < data.length; i++) {
        if (this.state.service_data.ServiceType == data[i]['ServiceType']) {
          exists = true;
        }
      }
      if (exists) {
        this.setState({
          requestDone: 2
        });
      } else {
        let url = `${BASE_URL}api/select` + '?query=' + '\'SELECT MAX(ServiceID) AS ServiceID FROM Services\'';
        axios.get(url,
          { headers: { 'Access-Control-Allow-Origin': '*', } })
          .then(res => {
            const data = res.data;
            let newServiceID = data['data'][0]['ServiceID'] + 1;
            let service_data = {}
            Object.assign(service_data, this.state.service_data);
            service_data['ServiceID'] = newServiceID;
            service_data['ProviderID'] = this.state.data.ProviderID;
            let url = `${BASE_URL}api/post?table=Services`
            axios.post(url, service_data, {
            headers:
              { 'Access-Control-Allow-Origin': '*' }
          })
            .then(res => {
              const data = res.data;
              this.setState({ error: data, requestDone: 1 });
            }).catch((error) => {
              this.setState({
                error: error.response.data,
                requestDone: 4
              });
            });
            }).catch((error) => {
            this.setState({
              error: error.response.data.Error,
              requestDone: 4
            });
          });
      }
    }).catch((error) => {
    this.setState({
      error: error.response.data.Error,
      requestDone: 4
    });
  });
	}

	render() {
		let allfilled = true;
    Object.entries(this.state.service_data).forEach(([_, value]) => {
      if (value === '') {
        allfilled = false;
      }
    });
    if (this.state.requestDone === 0) {
      return (
            <div className="App">
            <header className="App-header">
              <h2>Add a new Service</h2>
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
    } else if (this.state.requestDone === 1) {
			let s = {username: this.state.data.Username, password: this.state.data.Password}
        return (
        <div className="App">
          <HomePage state={s} />
        </div>
      );
    } else if (this.state.requestDone === 2) {
      return (
            <div className="App">
            <header className="App-header">
              <h2>Add a new Service</h2>
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
                <div className="Incorrect">
                  You already have a service with this type
                </div>
              </div>
              </header>
            </div>
        );
    }
   }
}
