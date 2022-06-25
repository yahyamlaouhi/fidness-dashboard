import React, { Component } from "react";
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from "axios";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
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
        console.log(id)
        const partners = res.data;
        NotificationManager.success('Success message', 'Done deleting');
        this.setState({ partners });
        window.location.href = '/partner/partenarList'
        console.log('done deleting')
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
                            <td>{partners.date_creation}</td>
                            <td>
                              <Link className="badge badge-success mr-2" to={`/partner/updatepartner/` + partners.id + `/`}><Trans>Update</Trans></Link>
                              <button type="button" className="badge badge-danger mr-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Delete
                              </button>
                              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div class="modal-body">
                                      ...
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary" onClick={() => this.deleteRow(partners.id)}>Save changes</button>
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
