import React from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
import HomePage from './home_page';

const BASE_URL = 'http://localhost:5000/';

export default class CustomerSignUp extends React.Component {
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
  			Birthday: '',
  			SEX: '',
				Medical_History: '',
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
    let url = `${BASE_URL}api/select` + '?query=' + '\'SELECT * FROM User WHERE Username = "' + this.state.data.Username + '"\'';
    axios.get(url,
			{ headers: { 'Access-Control-Allow-Origin': '*', } })
			.then(res => {
				const data = res.data;
				if (data === null || data['data'].length === 0) {
          let url = `${BASE_URL}api/post?table=User`
          let user_data = {};
          Object.assign(user_data, this.state.data);
          delete user_data['Birthday']
          delete user_data['SEX']
					delete user_data['Medical_History']
          axios.post(url, user_data, {
  				headers:
  				{
  					'Access-Control-Allow-Origin': '*',
  					'Content-Type': 'application/json'
  				}
  			})
  				.then(res => {
            let url = `${BASE_URL}api/select` + '?query=' + '\'SELECT MAX(CustomerID) as CustomerID FROM Customer\'';
            axios.get(url,
        			{ headers: { 'Access-Control-Allow-Origin': '*', } })
        			.then(res => {
        				const data = res.data;
        				let newCustomerID = data['data'][0]['CustomerID'] + 1;
                let customer_data = {}
                Object.assign(customer_data, this.state.data);
                customer_data['CustomerID'] = newCustomerID;
                delete customer_data['Password']
                delete customer_data['First_Name']
                delete customer_data['Last_Name']
                delete customer_data['Email']
                delete customer_data['Address']
                let url = `${BASE_URL}api/post?table=Customer`
                axios.post(url, customer_data, {
        				headers:
        					{ 'Access-Control-Allow-Origin': '*' }
        			})
        				.then(res => {
        					const data = res.data;
        					this.setState({ error: data, requestDone: 1 });
        				}).catch((error) => {
        					this.setState({
        						error: error.response.data,
        						requestDone: 2
        					});
        				});
                }).catch((error) => {
        				this.setState({
        					error: error.response.data.Error,
        					requestDone: 2
        				});
        			});
  				}).catch((error) => {
  					this.setState({
  						error: error.response.data,
  						requestDone: 2
  					});
  				});
        } else {
          this.setState({ requestDone: 2 });
        }
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
	                Birthday (YYYY-MM-DD): <input name='Birthday' type='text'
	                  value={this.state.data.Birthday}
	                  onChange={this.changeData} />
	              </div>
	              <div>
	                Sex: <input name='SEX'
	                  type='text' value={this.state.data.SEX}
	                  onChange={this.changeData} />
	              </div>
								<div>
	                Medical History: <input name='Medical_History'
	                  type='text' value={this.state.data.Medical_History}
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
									Birthday (YYYY-MM-DD): <input name='Birthday' type='text'
										value={this.state.data.Birthday}
										onChange={this.changeData} />
								</div>
								<div>
									Sex: <input name='SEX'
										type='text' value={this.state.data.SEX}
										onChange={this.changeData} />
								</div>
								<div>
									Medical History: <input name='Medical_History'
										type='text' value={this.state.data.Medical_History}
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
