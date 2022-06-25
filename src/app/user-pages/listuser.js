import React, { Component } from "react";
import moment from 'moment';
import { Link } from "react-router-dom";
import { Trans } from 'react-i18next';
import axios from "axios";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


export class Listuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      admins: [],
      loading: null,
      postsPerPage: 5,
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/auth/user/")
      .then(response => {
        console.log(response.data)
        const admins = response.data;
        this.setState({ admins });
      })
      .catch(error => {
        console.log(error)
      });
  }

  deleteRow(id) {
    axios.delete(`http://127.0.0.1:8000/auth/user/${id}/`)
      .then(() => {

        // Issue GET request after item deleted to get updated list
        // that excludes user of id
        return axios.get(`http://127.0.0.1:8000/auth/user/`)
      })
      .then(res => {
        const admins = res.data;

        NotificationManager.success('Success message', 'supprimer');
        this.setState({ admins });
        window.location.href = '/listuser';
      })
      .catch(error => {
        console.log(error)
        NotificationManager.success('Error message', 'supprimer');
      })
  }
  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.admins.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    // Implement page numbers
    const pageNumbers = [];

    for (
      let i = 1;
      i <= Math.ceil(this.state.admins.length / this.state.postsPerPage);
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
          <h3 className="page-title">Admins List</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="!#" onClick={(event) => event.preventDefault()}>
                  Users
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Users list
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
                        <th>User name</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Creation date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {" "}
                      {currentPosts.map((admins) => {
                        return (
                          <tr>
                            <td>{admins.username}</td>
                            <td>{admins.first_name}</td>
                            <td>{admins.last_name}</td>
                            <td>{admins.email}</td>
                            <td>{moment(admins.date_joined).format("DD/MM/YYYY")}</td>
                            <td>
                              <Link className="badge badge-success mr-2" to={`/user/updateuser/` + admins.id + `/`}><Trans>Update</Trans></Link>
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
                                      Are you sure you want to delete this user ?
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary" onClick={() => this.deleteRow(admins.id)}>Confirm delete</button>
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

export default Listuser;
