import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';


export default function Login() {
  let { loginUser } = useContext(AuthContext)

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();



  const handleSubmit = (e) => {
    console.log({ username, password })
    e.preventDefault();
    loginUser({ username, password })


    // const { name, value } = e.target;
    // setLoginForm({...loginForm, [name]: value});
  }

  return (
    <div><div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/logo.png")} alt="logo" />
              </div>
              <h4>Welcome to fidness dashboard</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <form className="pt-3" onSubmit={e => { handleSubmit(e) }} >
                <Form.Group className="d-flex search-field">
                  <Form.Control type="username" name="username" id="username" placeholder="Username" size="lg" className="h-auto" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="password" name="password" id="password" placeholder="Password" size="lg" className="h-auto" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="mt-3">
                  <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >SIGN IN</button>
                </div>
              </form>
              <NotificationContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}