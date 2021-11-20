import React from 'react';
import './App.css';
import axios from 'axios';
import CustomerProfile from './customer_profile';
import AppointmentsPage from './appointments_page';
import CheapestAppointmentsPage from './appointment_cheapest';

const BASE_URL = 'http://localhost:5000/';

export default class CustomerHome extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      username: props.state.username,
      password: props.state.password,
      data: props.state.data,
      user_data: props.state.user_data,
			s: 0,
      res: [],
    };
    this.handleProfile = this.handleProfile.bind(this);
    this.goToAppointmentsPage = this.goToAppointmentsPage.bind(this);
    this.goToCheapestAppointments = this.goToCheapestAppointments.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
  }

	componentDidMount() {
    const url = `${BASE_URL}api/select` + '?query=' + '\'SELECT DISTINCT AppointmentID, ServiceType, Date, Time, Address FROM Appointment NATURAL JOIN Services NATURAL JOIN MedicalProvider NATURAL JOIN User WHERE CustomerID= "' + this.state.data.CustomerID + '"\'';
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

	handleDelete(event) {
		let url = `${BASE_URL}api/delete?table=Appointment&key=AppointmentID&id=${event.target.value}`
    axios.delete(url, {
    headers:
      { 'Access-Control-Allow-Origin': '*' }
  })
    .then(res => {
      this.setState({ error: '', s: 4 });
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
	                <tr key={result_entry['Appointment Ids']}>
									  <td>{result_entry['ServiceType']}</td>
	                  <td>{result_entry['Date']}</td>
	                  <td>{result_entry['Time']}</td>
	                  <td>{result_entry['Address']}</td>
	                  <td><button className = "button" onClick = {this.handleDelete} value = {result_entry['AppointmentID']}>CANCEL APPOINTMENT</button></td>
	                </tr>
	              );
	            })
	          }
	    }

	    goToAppointmentsPage(){
				this.setState({
						s:2
				});
	    }

	    goToCheapestAppointments(){
				this.setState({
						s:3
				});
	    }

	    renderTableHeader() {
	        let header = ["Service Type", "Date", "Time", "Address"]
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
								Logged In As Customer
								</div>
								<div>
								<button className="button" onClick={this.handleProfile} id = 'button1' type = "button"> Profile </button>
								</div>
								<div>
								<button className="button" onClick={this.goToAppointmentsPage}> Make New Appointment </button>
								<button className="button" onClick={this.goToCheapestAppointments}> Get Cheapest Services </button>
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
          <CustomerProfile state={this.state}/>
        </div>
      );
		} else if(this.state.s === 2){
            return(
                <div className = "App">
                    <AppointmentsPage state={this.state}/>
                </div>
            );
        } else if(this.state.s === 3){
            return(
                <div className = "App">
                    <CheapestAppointmentsPage state={this.state}/>
                </div>
            );
        } else {
					return (
		      <div className="App">
		        <CustomerHome state={this.state}/>
		      </div>
		    );
				}
	}
}
