import React, { Component, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';



export default function Login() {
  let {loginUser} = useContext(AuthContext)
  
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();



  const handleSubmit= (e)=> {
    console.log({username,password})
        e.preventDefault();
      loginUser({username,password})


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
                <Form  className="pt-3" >

                  <Form.Group className="d-flex search-field">
                    <Form.Control type="username" name="username" placeholder="Username" size="lg" className="h-auto" value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" name="password" placeholder="Password" size="lg" className="h-auto" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </Form.Group>
                  <div className="mt-3">
                    <button onClick={e => { handleSubmit(e) } } className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >SIGN IN</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div></div>
  )
  }