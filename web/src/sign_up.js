import React from 'react';
import './App.css';
import logo from './logo.svg';
import MedSignUp from './med_sign_up';
import CustomerSignUp from './customer_sign_up';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      s: 0,
    };
    this.med = this.med.bind(this);
    this.customer = this.customer.bind(this);
  }

  med() {
    this.setState({ s: 1 });
  }

  customer() {
    this.setState({ s: 2 });
  }

	render() {
    if (this.state.s === 0) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <br />
            <div>
            <button className="button" onClick={this.med}> Sign Up as Medical Provider </button>
            </div>
            <div>
            -
            </div>
            <div>
            <button className="button" onClick={this.customer}> Sign Up as Customer </button>
            </div>
          </header>
        </div>
      );
    } else if (this.state.s === 1) {
      return (
      <div className="App">
        <MedSignUp state={this.state} />
      </div>
    );
    } else {
      return (
      <div className="App">
        <CustomerSignUp state={this.state} />
      </div>
    );
    }
	}
}
