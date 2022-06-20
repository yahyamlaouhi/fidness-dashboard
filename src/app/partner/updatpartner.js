import React, { Component, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios'

export default class UpdatePartner extends Component {
  constructor(props) {
    super(props)

    // State
    this.state = {
      loyalty: '',
      contract: '',
      avarage: '',
      fees: ''
    }
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/part/partner/` + this.props.match.params.id + `/`).then(res => {
      this.setState({ loyalty: res.data.loyalty, avarage: res.data.avarage, contract: res.data.contract, fees: res.data.fees });
    }).catch((error) => {
      console.log(error);
    })
  }
  onChangeloyalty = (e) => {
    this.setState({ loyalty: e.target.value })
  }

  onChangecontract = (e) => {
    this.setState({ contract: e.target.value })
  }

  onChangeavarage = (e) => {
    this.setState({ avarage: e.target.value })
  }

  onChangefees = (e) => {
    this.setState({ fees: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const taskObject = {
      loyalty: this.state.loyalty,
      contract: this.state.contract,
      avarage: this.state.avarage,
      fees: this.state.fees,
    };

    axios.put(`http://127.0.0.1:8000/part/partner/` + this.props.match.params.id + `/`, taskObject).then((res) => {
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
                    <label htmlFor="exampleInputName1">Loyalty card name</label>
                    <Form.Control type="text" className="form-control" id="loyalty" placeholder="put your name here ..." name="loyalty" value={this.state.loyalty} onChange={(e) => this.onChangeloyalty(e)} />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="exampleSelectGender">Contract type</label>
                    <select className="form-control" id="contract" name="contract" value={this.state.contract} onChange={(e) => this.onChangecontract(e)}>
                      <option>1</option>
                      <option>3</option>
                      <option>6</option>
                      <option>12</option>
                    </select>
                  </Form.Group>

                  <Form.Group>
                    <label htmlFor="exampleInputPassword4">Average basket</label>
                    <Form.Control type="number" className="form-control" name="avarage" id="avarage" placeholder="Price ..." value={this.state.avarage} onChange={(e) => this.onChangeavarage(e)} />
                  </Form.Group>

                  <Form.Group>
                    <label htmlFor="exampleInputPassword4">Contract fees</label>
                    <Form.Control type="number" className="form-control" name="fees" id="fees" placeholder="Contract fees ..." value={this.state.fees} onChange={(e) => this.onChangefees(e)} />
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


