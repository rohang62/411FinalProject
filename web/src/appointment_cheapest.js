import React from 'react';
import './App.css';
import axios from 'axios';
import CustomerHome from './customer_home';
const BASE_URL = 'http://localhost:5000/';

export default class CheapestAppointmentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: props.state.username,
        password: props.state.password,
        appointments_list : [],
        Service_Type: '',
        Date: '',
        Time: '',
        res: [],
        booked:0,
        data: props.state.data,
        user_data: props.state.user_data,
        user_s:props.state.s,
    };
    this.changeDate = this.changeDate.bind(this);
    this.changeServiceType = this.changeServiceType.bind(this);
    this.changeTime = this.changeTime.bind(this);

    this.makeAppointment = this.makeAppointment.bind(this);
    this.handleSubmitKeyword = this.handleSubmitKeyword.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    }

    handleGoBack() {
  		this.setState({ booked: 2 });
  	}

    changeServiceType(event) {
        this.setState({ Service_Type : event.target.value});
    }

    changeDate(event) {
      this.setState({ Date : event.target.value});
    }

    changeTime(event) {
     this.setState({ Time : event.target.value});
    }

  handleSubmitKeyword() {
    let url = `${BASE_URL}api/select` + '?query=' +
    `'
    SELECT BusinessName, ServiceType, ServiceID, Price
    FROM MedicalProvider JOIN (
        SELECT ProviderId AS pid, ServiceType, MIN(Price) AS Price, ServiceID
        FROM MedicalProvider NATURAL JOIN Services
        WHERE ClosingTime > "` + this.state.Time + `" AND "` + this.state.Time + `" > OpeningTime
            AND ServiceID NOT IN
                (SELECT ServiceID
                FROM Appointment NATURAL JOIN Services
                WHERE Date = "` + this.state.Date + `" AND ServiceType LIKE "%` + this.state.Service_Type +`%" AND Time = "`+ this.state.Time +`")
        GROUP BY ProviderID, ServiceID, ServiceType) a
    ON MedicalProvider.ProviderID= a.pid
    ORDER BY Price ASC;
    '`;
    //console.log(url);
    axios.get(url)
            .then(res => {
        console.log(res);
        this.setState({
          res: res.data['data'],
        });
        console.log("STATE DATA");
        console.log(this.state.res);
            }).catch((error) => {
                this.setState({
                });
            });
  }

    renderTableHeader() {
        let header = ["Provider Name", "Service Type", "Price","Book"]
        return header.map((key, index) => {
            return <th key={index}> | {key.toUpperCase()} |</th>
        })
    }

  // set appointmentID
  // set customer ID
  // set service ID
  // set date
  // set time
  // set duration

  makeAppointment(event){
    let url = `${BASE_URL}api/select` + '?query=' + '\'SELECT MAX(AppointmentID) as AppointmentID FROM Appointment\'';
    axios.get(url)
      .then(res => {
        let newAppointmentID = res.data['data'][0]['AppointmentID'] + 1;
        console.log("NEWAPPOINTMENTID");
        console.log(newAppointmentID)
        let appointmentData = {
          AppointmentID : newAppointmentID,
          CustomerId : this.state.data.CustomerID,
          ServiceID : event.target.value,
          Date: this.state.Date,
          Time: this.state.Time,
          Duration: 30
        };
        let url = `${BASE_URL}api/post?table=Appointment`
        axios.post(url, appointmentData, {
          headers:
            { 'Access-Control-Allow-Origin': '*' ,
              'Content-Type' : 'application/json',
          }
        }).then(_ => {
          this.setState({
            booked:1,
          })
        }
        );
      });
  }

  renderTable() {
        if (this.state.res !== undefined) {
            return this.state.res.map((result_entry) => {

                return (
                    <tr key={result_entry['ServiceID']}>
            <td>{result_entry['BusinessName']}</td>
            <td>{result_entry['ServiceType']}</td>
            <td>{result_entry['Price']}</td>
                        <td><button className = "button" onClick = {this.makeAppointment} value = {result_entry['ServiceID']}>BOOK NOW</button></td>
                    </tr>
                );
            })
        }
    }


  render() {
    if(this.state.booked === 0){

      return(

          <div className="App">
          <header className="App-header">
            <h2>Search for cheapest services</h2>
            <div>
              <div>
                  Date: <input type='text'
                      value = {this.state.Date}
                      onChange={this.changeDate}/>
              </div>
              <div>
                  Time: <input type='text'
                      value = {this.state.Time}
                      onChange={this.changeTime}/>
              </div>
              <button onClick={this.handleSubmitKeyword}> Submit </button>
              <table>
                <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTable()}
                </tbody>
              </table>
            </div>
            <button className="button" onClick={this.handleGoBack} id = "button3"> Go Home </button>
            </header>
            </div>
      );
    }  else if (this.state.booked == 1) {
      return (
        <div className = "App">
          <CustomerHome state = {this.state}/>
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
