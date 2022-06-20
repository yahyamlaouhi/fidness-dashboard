import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
export class Register extends Component {
  constructor(props) {
    super(props)

    // creation des fonctions
    this.onChangename = this.onChangename.bind(this); // importation de contenu de state
    this.onChangelastname = this.onChangelastname.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangepassword1 = this.onChangepassword1.bind(this);
    this.onChangepassword2 = this.onChangepassword2.bind(this);
    this.onChangelastusername = this.onChangelastusername.bind(this);


    this.onSubmit = this.onSubmit.bind(this);

    // initioalisation
    this.state = {
       username:"",
        name: '',
        lastname: '',
        email: '',
        password1:'',
        password2:''
    }
}
onChangename = (e) => {
  this.setState({name: e.target.value})
  console.log(e.target.value)
}

onChangelastname = (e) => {
  this.setState({lastname: e.target.value})
}

onChangelastusername = (e) => {
  this.setState({username: e.target.value})
}

onChangeemail = (e) => {
  this.setState({email: e.target.value})
  console.log(e.target.value)
}

onChangepassword1 = (e) => {
  this.setState({password1: e.target.value})
  console.log(e.target.value)
}


onChangepassword2 = (e) => {
  this.setState({password2: e.target.value})
  console.log(e.target.value)
}

onSubmit = (e) => {
  e.preventDefault();

  const taskObject = {
      username:this.state.username,
      first_name: this.state.name,
      last_name: this.state.lastname,
      email: this.state.email,
      password: this.state.password1,
      password2: this.state.password1

  };
  // consomation d'un API avec axios
  axios.post('http://127.0.0.1:8000/auth/register/', taskObject).then(res => 
  console.log(res.data),
  NotificationManager.success('Success message', 'Admin added'));
  console.log(this.state)
  this.setState({name: '', lastname: '', email: '', password1:'',password2:''})
}

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.png")} alt="logo" />
                </div>
                <h4>Add new user</h4>
                <h6 className="font-weight-light">Register your admins. It only takes a few steps</h6>
                <form className="pt-3" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Username" value={this.state.username} onChange={this.onChangelastusername} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="First name" value={this.state.name} onChange={this.onChangename} />
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control form-control-lg" id="exampleInputname" placeholder="Last name" value={this.state.lastname} onChange={this.onChangelastname}/>
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg"  placeholder="Email" value={this.state.email} onChange={this.onChangeemail}/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password1} onChange={this.onChangepassword1} />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" value={this.state.password2} onChange={this.onChangepassword2} />
                  </div>
                  
                  
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/">Register</button>
                  </div>
                  <NotificationContainer/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
