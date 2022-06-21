import React, { Component } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";
import axios, { Axios } from "axios";

export class Prediction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChangePartenarInformations(event) {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });

    //call your api here
    // const response = await api.addPartenar
    // .then(res=>{
    //   console.log(res)
    //  }).catch(err => alert("error in adding partenar"))
  }
   handlePredicate(e) {
     e.preventDefault();
    let url="http://127.0.0.1:8000/dashboard/prediction/"+this.state.code+"/"

     axios
      .get(url)
      .then(response => {
        let result="NOT CHURN"
         let r = response.data;
         if (r[0]===1){  result=' CHURN'}

        this.setState({ result });
      })
      .catch(error => {
        console.log(error)});
    
    this.setState({ ...this.state, modal: true });
    console.log(this.state.code);
  }
  componentDidMount() {
    bsCustomFileInput.init();
  }

  render() {
    return (
      <div class="p-4">
        <div className="page-header">
          <h3 className="page-title"> Customer Churn Prediction </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Prediction
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Churn Customer
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-12 grid-margin px-5 stretch-card">
            <div className="card">
              <div className="card-body">
                <form className="forms-sample">
                  <Form.Group>
                    <label htmlFor="exampleInputName1">ID</label>
                    <Form.Control
                      type="number"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="put your code here ..."
                      name="code"
                      onChange={(e) => this.handleChangePartenarInformations(e)}
                      defaultValue="15"
                    />
                  </Form.Group>
                  <button
                    type="submit"
                    className="btn btn-primary mr-2"
                    onClick={(e) => this.handlePredicate(e)}
                  >
                    Submit
                  </button>
                  <button className="btn btn-dark">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {this.state && this.state.modal === true && (
          <div class="alert alert-success p-4">
            <center>
              <span>{this?.state?.result}</span>
            </center>
          </div>
        )}
      </div>
    );
  }
}

export default Prediction;
