import React from 'react';
import './App.css';
import axios from 'axios';
import ProviderProfile from './provider_profile';
import AddNewService from './add_new_service';
import SeeServices from './services';

const BASE_URL = 'http://localhost:5000/';

export default class ProviderHome extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      username: props.state.username,
      password: props.state.password,
      data: props.state.data,
      user_data: props.state.user_data,
			res: {},
			s: 0,
    };
    this.handleProfile = this.handleProfile.bind(this);
		this.changeDate = this.changeDate.bind(this);
    this.handleSubmitKeyword = this.handleSubmitKeyword.bind(this);
		this.handleNewService = this.handleNewService.bind(this);
		this.handleSeeExisting = this.handleSeeExisting.bind(this);
  }

	handleProfile() {
		this.setState({ s: 3 });
	}

	handleNewService() {
		this.setState({ s: 4 });
	}

	handleSeeExisting() {
		this.setState({ s: 5 });
	}

	changeDate(event) {
        this.setState({ Date : event.target.value});
  }

	handleSubmitKeyword() {
      let url = `${BASE_URL}api/select` + '?query=' + `'SELECT ServiceType, Date, COUNT(ServiceID) as NumberOfAppointments
      FROM Appointment NATURAL JOIN Services
      WHERE Date = "` + this.state.Date + `" AND ProviderID = "` + this.state.data["ProviderID"] + `"
      GROUP BY ServiceID, ServiceType, Date'`;
    //   console.log(data);
      axios.get(url)
        .then(res => {
            if (res.data["data"].length == 0){
                this.setState({
                    res: res.data['data'],
                    s: 2
                  });
            } else {
							this.setState({
		            res: res.data['data'],
		            s: 1
		          });
						}
          console.log("STATE DATA");
          console.log(this.state.res);
        }).catch((error) => {
          this.setState({
          });
        });
    }

    renderTableHeader() {
      let header = ["Service Type","Date", "Number of Appointments"]
      return header.map((key, index) => {
        return <th key={index}> | {key.toUpperCase()} |</th>
      })
    }

		renderTable() {
      if (this.state.res !== undefined) {
        return this.state.res.map((result_entry) => {

          return (
            <tr key={result_entry['ServiceType']}>
                <td>{result_entry['ServiceType']}</td>
              <td>{result_entry['Date']}</td>
              <td>{result_entry['NumberOfAppointments']}</td>
            </tr>
          );
        })
      }
    }

	render() {
		if (this.state.s === 0) {
			return (
            <div className="App">
            <header className="App-header">
						<div>
							Logged In As Medical Provider
							</div>
							<div>
	            <button className="button" onClick={this.handleNewService}> Add New Service </button>
	            </div>
							<div>
	            -
	            </div>
	            <div>
	            <button className="button" onClick={this.handleSeeExisting}> See existing Services </button>
	            </div>
            <h2>Enter date to display appointments</h2>
            <div>
              <div>
                  Date: <input type='text'
                      value = {this.state.Date}
                      onChange={this.changeDate}/>
              </div>
              <button onClick={this.handleSubmitKeyword}> Submit </button>
							<button className="button" onClick={this.handleProfile} id = 'button1' type = "button"> Profile </button>
              </div>
            </header>
            </div>
            )
		} else if(this.state.s == 1) {
      return(
          <div className="App">
          <header className="App-header">
					<div>
						Logged In As Medical Provider
						</div>
            <h2>Enter date to display appointments</h2>
            <div>
              <div>
                  Date: <input type='text'
                      value = {this.state.Date}
                      onChange={this.changeDate}/>
              </div>
              <button onClick={this.handleSubmitKeyword}> Submit </button>
							<button className="button" onClick={this.handleProfile} id = 'button1' type = "button"> Profile </button>
              <table>
                <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTable()}
                </tbody>
              </table>
            </div>
            </header>
            </div>
        );
    } else if (this.state.s === 2) {
				return (
						<div className="App">
							<header className="App-header">
							<div>
								Logged In As Medical Provider
								</div>
								<div>
		            <button className="button" onClick={this.handleNewService}> Add New Service </button>
		            </div>
								<div>
		            -
		            </div>
		            <div>
		            <button className="button" onClick={this.handleSeeExisting}> See existing Services </button>
		            </div>
						<h2>Enter date to display appointments</h2>
						<div>
							<div>
									Date: <input type='text'
											value = {this.state.Date}
											onChange={this.changeDate}/>
							</div>
							<button onClick={this.handleSubmitKeyword}> Submit </button>
							<div className="Incorrect">
					No appointments on selected Date
								</div>
								<button className="button" onClick={this.handleProfile} id = 'button1' type = "button"> Profile </button>
							</div>
						</header>
						</div>
						)
		} else if (this.state.s === 3) {
					return (
		        <div className="App">
		          <ProviderProfile state={this.state}/>
		        </div>
		      );
		}  else if (this.state.s == 4) {
			return (
				<div className="App">
					<AddNewService state={this.state}/>
				</div>
			);
		}  else if (this.state.s == 5) {
			return (
				<div className="App">
					<SeeServices state={this.state}/>
				</div>
			);
		}
	}
}
