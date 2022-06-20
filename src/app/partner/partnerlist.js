import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import moment from 'moment';
import { Trans } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from "react-router-dom";
export class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      partners: [],
      loading: null,
      postsPerPage: 10,
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/dashboard/partner/")
      .then(response => {
        const partners = response.data;
        this.setState({ partners });
      })
      .catch(error => console.log(error));
  }
  deleteRow(id) {
    axios.delete(`http://127.0.0.1:8000/dashboard/partner/${id}/`)
      .then(() => {

        // Issue GET request after item deleted to get updated list
        // that excludes user of id
        return axios.get(`http://127.0.0.1:8000/dashboard/partner/`)
      })
      .then(res => {
        const partners = res.data;
        NotificationManager.success('Success message', 'Done deleting');
        this.setState({ partners });
        console.log('done deleting')
        window.location.reload(false);
      })

  }


  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.partners.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    // Implement page numbers
    const pageNumbers = [];

    for (
      let i = 1;
      i <= Math.ceil(this.state.partners.length / this.state.postsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    // Set current page
    const setPage = (pageNum) => {
      this.setState({ currentPage: pageNum });
    };
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">Partner List</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Tables
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Basic tables
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                {/* <h4 className="card-title">Basic Table</h4>
                <p className="card-description"> Add className <code>.table</code>
                </p> */}
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Loyalty card</th>
                        <th>Contract type</th>
                        <th>Average basket</th>
                        <th>Contract fee</th>
                        <th>Return on investment</th>
                        <th>Creation date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {" "}
                      {currentPosts.map((partners) => {
                        return (
                          <tr>
                            <td>{partners.nom}</td>
                            <td>{partners.type_contrat}</td>
                            <td>{partners.montant_achat_dt_field}</td>
                            <td>{partners.frais_contrat}</td>
                            <td>{partners.roi}</td>
                            <td>{moment(partners.date_creation).format("DD/MM/YYYY")}</td>
                            <td>
                              <Link className="badge badge-success mr-2" to={`/partner/updatepartner/` + partners.id+`/`}><Trans>Update</Trans></Link>
                              <button type="button" className="badge badge-danger mr-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Delete
                              </button>
                              <div>
                                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Delete Partner</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                      </div>
                                      <div className="modal-body">
                                        Are you sure you want to confirm delete ?
                                      </div>
                                      <div className="modal-footer">
                                        <a type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</a>
                                        <a type="button" onClick={() => this.deleteRow(partners.id)} className="btn btn-primary">Confirm delete</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}{" "}
                    </tbody>
                  </table>
                  <center>
                    <div className="w-full flex justify-around">
                      {pageNumbers.map((pageNum, index) => (
                        <span
                          key={index}
                          className={
                            pageNum === this.state.currentPage
                              ? "cursor-pointer flex items-center justify-center w-12 h-12 border-2 rounded-full bg-blue-500 text-white"
                              : "cursor-pointer flex items-center justify-center w-12 h-12 border-2 rounded-full"
                          }
                          onClick={() => {
                            setPage(pageNum);
                          }}
                        >
                          {pageNum}{" "}
                        </span>
                      ))}{" "}
                    </div>
                  </center>
                  <NotificationContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BasicTable;
