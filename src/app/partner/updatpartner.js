import React, { Component, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios'
import moment from 'moment'
export default class UpdatePartner extends Component {
  constructor(props) {
    super(props)

    // State
    this.state = {
      code:'',
      nom: '',
      type_contrat:null,
      montant_achat: null,
      frais_contrat:null,
    }
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/dashboard/partner/` + this.props.match.params.id + `/`).then(res => {
      this.setState({code:res.data.code, nom: res.data.nom, type_contrat: res.data.type_contrat, montant_achat: res.data.montant_achat, frais_contrat: res.data.frais_contrat, roi:res.data.roi, date_creation: res.data.date_creation });
    }).catch((error) => {
      console.log(error);
    })
  }
  handleChangePartenarInformations(event) {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
    }
  onSubmit = (e) => {
    e.preventDefault()

    const taskObject = {
      code: this.state.code,
      nom: this.state.nom,
      montant_achat:parseInt(this.state.montant_achat),
      type_contrat: this.state.type_contrat,
      frais_contrat: parseInt(this.state.frais_contrat),
      roi:parseFloat(this.state.frais_contrat/this.state.montant_achat),
      date_creation:moment().format("DD-MM-YYYY hh:mm:ss")
    };
    console.log(taskObject)
    axios.put(`http://127.0.0.1:8000/dashboard/partner/` + this.props.match.params.id + `/`, taskObject).then((res) => {
      console.log(res.data)
      console.log('task a été modifié')
    }).catch((error) => {
      console.log(error)
    })

    // rederiction task list

  }

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-12 grid-margin px-5 stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Update partner</h4>
                <form className="forms-sample" onSubmit={this.onSubmit}>
                <Form.Group>
                    <label htmlFor="exampleInputName1">Code</label>
                    <Form.Control type="text" className="form-control" id="code" placeholder="put your name here ..." name="code" value={this.state.code} onChange={(e) => this.handleChangePartenarInformations(e)} />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleInputName1">Loyalty card name</label>
                    <Form.Control type="text" className="form-control" id="loyalty" placeholder="put your name here ..." name="nom" value={this.state.nom} onChange={(e) => this.handleChangePartenarInformations(e)} />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleSelectGender">Contract type</label>
                    <select className="form-control" id="contract" name="type_contrat" value={this.state.type_contrat} onChange={(e) => this.handleChangePartenarInformations(e)}>
                      <option>1</option>
                      <option>3</option>
                      <option>6</option>
                      <option>12</option>
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label htmlFor="exampleInputPassword4">Average basket</label>
                    <Form.Control type="number" className="form-control" name="montant_achat" id="avarage" placeholder="Price ..." value={this.state.montant_achat} onChange={(e) => this.handleChangePartenarInformations(e)} />
                  </Form.Group>

                  <Form.Group>
                    <label htmlFor="exampleInputPassword4">Contract fees</label>
                    <Form.Control type="number" className="form-control" name="frais_contrat" id="fees" placeholder="Contract fees ..." value={this.state.frais_contrat} onChange={(e) => this.handleChangePartenarInformations(e)} />
                  </Form.Group>


                  <button type="submit" className="btn btn-primary mr-2">Update</button>
                  <button className="btn btn-dark">Cancel</button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}


