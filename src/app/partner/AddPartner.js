import React, { Component, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Redirect, useHistory, useNavigate } from "react-router-dom";
import moment from 'moment';
class AddPartner extends Component {
  constructor(props) {
    super(props)
    // initioalisation
    this.state = {
      nom: '',
      type_contrat: null,
      montant_achat: null,
      Frais_contrat:null,
    }
  }
    // creation des fonctions
    // this.onChangeLoyalty = this.onChangeLoyalty.bind(this); // importation de contenu de state
    // this.onChangeContract = this.onChangeContract.bind(this);
    // this.onChangeAvarage = this.onChangeAvarage.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);


  

  // onChangeLoyalty = (e) => {
  //   this.setState({ loyalty: e.target.value })
  //   console.log(e.target.value)
  // }

  // onChangeContract = (e) => {
  //   this.setState({ contract: e.target.value })
  //   console.log(e.target.value)
  // }

  // onChangeAvarage = (e) => {
  //   this.setState({ avarage: e.target.value })
  //   console.log(e.target.value)
  // }

    handleChangePartenarInformations(event) {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
    }
  



  onSubmit = (e) => {
     e.preventDefault();

    let taskObject = {
      code: this.state.nom,
      nom: this.state.nom,
      type_contrat:this.state.type_contrat,
      montant_achat: parseInt(this.state.montant_achat),
      frais_contrat: parseInt(this.state.frais_contrat),
      id_admin_creation:1,
      roi:parseFloat(this.state.montant_achat/this.state.frais_contrat),
      date_creation:moment().format("DD-MM-YYYY hh:mm:ss")
    };

    console.log(taskObject)

    // consomation d'un API avec axios
    axios.post('http://127.0.0.1:8000/dashboard/partner/',taskObject)
    .then(res => 
      console.log("resss",res.data));

      NotificationManager.success('Success message', 'Added deleting');
      useHistory().push('/partner/partenarList')
    console.log(this.state)
    
  }

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-12 grid-margin px-5 stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add partner</h4>
                <form className="forms-sample" onSubmit={this.onSubmit}>
                  <Form.Group controlId="loyalty">
                    <label htmlFor="exampleInputName1">Loyalty card name</label>
                    <input type="text" className="form-control" id="exampleInputName1" placeholder="put your name here ..." name="nom" value={this.state.nom}  onChange={(e) => this.handleChangePartenarInformations(e)} />
                  </Form.Group>
                  <Form.Group controlId="contract">
                    <label htmlFor="exampleSelectGender">Contract type</label>
                    <select className="form-control" id="exampleSelectGender" name="type_contrat" value={this.state.type_contrat}  onChange={(e) => this.handleChangePartenarInformations(e)}>
                      <option>Select</option>
                      <option>1</option>
                      <option>3</option>
                      <option>6</option>
                      <option>12</option>
                    </select>
                  </Form.Group>

                  <Form.Group controlId="avarage">
                    <label htmlFor="exampleInputPassword4">Average basket</label>
                    <input type="number" className="form-control" name="montant_achat" id="exampleInputPassword4" placeholder="Avarage basket ..." value={this.state.montant_achat}  onChange={(e) => this.handleChangePartenarInformations(e)} />
                  </Form.Group>

                  <Form.Group controlId="fees">
                    <label htmlFor="exampleInputPassword4">Contract fees</label>
                    <input type="number" className="form-control" name="frais_contrat" id="exampleInputPassword4" placeholder="Contract fees ..." value={this.state.frais_contrat}  onChange={(e) => this.handleChangePartenarInformations(e)} />
                  </Form.Group>

                  <button  className="btn btn-primary mr-2">Submit</button>
                </form>
              </div>
            </div>
          </div>
          <NotificationContainer />
        </div>
      </div>
    )
  }
}


export default AddPartner
