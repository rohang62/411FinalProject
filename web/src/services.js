import React from 'react';
import './App.css';
import axios from 'axios';
import ProviderHome from './provider_home';
import ProviderProfile from './provider_profile';
import UpdateService from './update_service';

const BASE_URL = 'http://localhost:5000/';

export default class SeeServices extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      username: props.state.username,
      password: props.state.password,
      data: props.state.data,
      user_data: props.state.user_data,
			s: 0,
      res: [],
			service_data: {}
    };
    this.handleProfile = this.handleProfile.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleGoBack = this.handleGoBack.bind(this);
  }

	componentDidMount() {
    const url = `${BASE_URL}api/select` + '?query=' + '\'SELECT DISTINCT ServiceID, ProviderID, ServiceType, OpeningTime, ClosingTime, TurnaroundTime, Price FROM Services WHERE ProviderID= "' + this.state.data.ProviderID + '"\'';
    axios.get(url, {
            headers:
            {
                    'Access-Control-Allow-Origin': '*',
            },
    })
            .then((res) => {
                    this.setState({ res: res.data["data"], s: 0 });
            }).catch((error) => {
                    this.setState({
                            res: error.text,
                            s: 4,
                    });
            });
}

	handleProfile() {
		this.setState({ s: 1 });
	}

	handleGoBack() {
		this.setState({ s: 4 });
	}

	handleUpdate(event) {
		const url = `${BASE_URL}api/select` + '?query=' + '\'SELECT DISTINCT ServiceID, ProviderID, ServiceType, OpeningTime, ClosingTime, TurnaroundTime, Price FROM Services WHERE ServiceID= "' + event.target.value + '"\'';
    axios.get(url, {
            headers:
            {
                    'Access-Control-Allow-Origin': '*',
            },
    })
            .then((res) => {
                    this.setState({ service_data: res.data["data"][0], s: 2 });
            }).catch((error) => {
                    this.setState({
                            res: error.text,
                            s: 4,
                    });
            });
	}

	handleDelete(event) {
		let url = `${BASE_URL}api/delete?table=Services&key=ServiceID&id=${event.target.value}`
    axios.delete(url, {
    headers:
      { 'Access-Control-Allow-Origin': '*' }
  })
    .then(res => {
      this.setState({ error: '', s: 3 });
    }).catch((error) => {
      this.setState({
        s: 4
      });
    });
    }

		renderTable(){
	        if (this.state.res !== undefined) {
	            return this.state.res.map((result_entry) => {

	              return (
	                <tr key={result_entry['ServiceID']}>
									  <td>{result_entry['ServiceType']}</td>
	                  <td>{result_entry['OpeningTime']}</td>
	                  <td>{result_entry['ClosingTime']}</td>
	                  <td>{result_entry['TurnaroundTime']}</td>
										<td>{result_entry['Price']}</td>
	                  <td><button className = "button" onClick = {this.handleDelete} value = {result_entry['ServiceID']}>Delete Service</button></td>
										<td><button className = "button" onClick = {this.handleUpdate} value = {result_entry['ServiceID']}>Update Service</button></td>
	                </tr>
	              );
	            })
	          }
	    }

	    renderTableHeader() {
	        let header = ["Service Type", "OpeningTime", "ClosingTime", "TurnaroundTime", "Price"]
	        return header.map((key, index) => {
	                return <th key={index}>{key.toUpperCase()}</th>
	        })
	    }

	render() {
		if (this.state.s === 0) {
			return (	<div className="App">
                <header className= "App-header" >
                <div>Welcome, {this.state.username}!</div>
								<div>
								<button className="button" onClick={this.handleProfile} id = 'button1' type = "button"> Profile </button>
								<button className="button" onClick={this.handleGoBack} id = "button3"> Go Home </button>
								</div>
								<table>
									<tbody>
											<tr>{this.renderTableHeader()}</tr>
													{this.renderTable()}

									</tbody>
					</table>
                    </header>
								</div>
            )
		} else if (this.state.s === 1) {
			return (
        <div className="App">
          <ProviderProfile state={this.state}/>
        </div>
      );
		} else if (this.state.s === 2) {
			return (
        <div className="App">
          <UpdateService state={this.state}/>
        </div>
      );
		} else if (this.state.s === 3) {
			return (
			<div className="App">
				<SeeServices state={this.state}/>
			</div>
		);
		} else {
			return (
      <div className="App">
        <ProviderHome state={this.state}/>
      </div>
    );
		}
	}
}
