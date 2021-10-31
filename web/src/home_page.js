import React from 'react';
import './App.css';
import axios from 'axios';
import ProviderHome from './provider_home';
import CustomerHome from './customer_home';

const BASE_URL = 'http://localhost:5000/';

export default class HomePage extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      username: props.state.username,
      password: props.state.password,
			s: -1,
			data: {},
			user_data: {},
    };
  }

	componentDidMount() {
		let url = `${BASE_URL}api/select` + '?query=' + '\'SELECT * FROM User WHERE Username = "' + this.state.username + '"\'';
		axios.get(url,
			{ headers: { 'Access-Control-Allow-Origin': '*', } })
			.then(res => {
				const data = res.data;
				let user_data = {};
				Object.assign(user_data, data['data'][0]);
				let url = `${BASE_URL}api/select` + '?query=' + '\'SELECT * FROM Customer WHERE Username = "' + this.state.username + '"\'';
		    axios.get(url,
					{ headers: { 'Access-Control-Allow-Origin': '*', } })
					.then(res => {
						const data = res.data;
						if (data['data'].length === 0) {
							let url = `${BASE_URL}api/select` + '?query=' + '\'SELECT * FROM MedicalProvider WHERE Username = "' + this.state.username + '"\'';
							axios.get(url,
								{ headers: { 'Access-Control-Allow-Origin': '*', } })
								.then(res => {
									const data = res.data;
					        this.setState({ data : data['data'][0], user_data: user_data, s: 0});
								}).catch((error) => {
									this.setState({
										requestDone: 2
									});
								});
		        } else {
		          this.setState({ data : data['data'][0], user_data: user_data, s: 1});
		        }
					}).catch((error) => {
						this.setState({
							requestDone: 2
						});
					});
			}).catch((error) => {
				this.setState({
					requestDone: 2
				});
			});
  }

	render() {
		if (this.state.s === 0) {
			return (
      <div className="App">
        <ProviderHome state={this.state}/>
      </div>
    );
		} else if (this.state.s === 1) {
			return (
        <div className="App">
          <CustomerHome state={this.state}/>
        </div>
      );
		}
		return (
		<div className="App">
		</div>
	)
	}
}
