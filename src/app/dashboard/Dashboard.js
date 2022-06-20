import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Slider from "react-slick";
import { TodoListComponent } from "../apps/TodoList";
import { VectorMap } from "react-jvectormap";
import TableauReact from "./visualisations/sexe";
import Age from "./visualisations/age";
import Pays from "./visualisations/Pays";
import Distribution from "./visualisations/distribution";
import Churn from "./visualisations/churn";
import Enter from "./visualisations/enter";
import Sexeage from "./visualisations/sexeage";
import axios from "axios";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      posts: [],
      partners: [],
      clientcard: [],
      loading: null,
      postsPerPage: 10,
    };
  }
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/dashboard/client/")
      .then(response => {
        const posts = response.data;
        this.setState({ posts });
      })
      .catch(error => console.log(error));

    axios
      .get("http://127.0.0.1:8000/dashboard/partner/")
      .then(response => {
        const partners = response.data;
        this.setState({ partners });
      })
      .catch(error => console.log(error));

    axios
      .get("http://127.0.0.1:8000/dashboard/clientcard/")
      .then(response => {
        const clientcard = response.data;
        this.setState({ clientcard });
      })
      .catch(error => console.log(error));
  }



  sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  toggleProBanner() {
    document.querySelector(".proBanner").classList.toggle("hide");
  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.posts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    // Implement page numbers
    const pageNumbers = [];

    for (let i = 1; i <= 30; i++) {
      pageNumbers.push(i);
    }
    let sumclient = 0;
    for (let j = 0; j <= this.state.posts.length; j++) {
      sumclient = j;
    }
    let sumpartner = 0;
    for (let k = 0; k <= this.state.partners.length; k++) {
      sumpartner = k;
    }
    let sumclientcard = 0;
    for (let c = 0; c <= this.state.clientcard.length; c++) {
      sumclientcard = c;
    }

    // Set current page
    const setPage = (pageNum) => {
      this.setState({ currentPage: pageNum });
    };
    return (
      <div>
        <div className="proBanner">
          <div></div>
        </div>
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card corona-gradient-card">
              <div className="card-body py-0 px-0 px-sm-3">
                <div className="row align-items-center"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">{sumclient}</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">
                  number of users
                </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">{sumpartner}</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">
                  number of Partners
                </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">{sumclientcard}</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success ">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">
                  Number of clients with card
                </h6>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-9">
                    <div className="d-flex align-items-center align-self-start">
                      <h3 className="mb-0">0</h3>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="icon icon-box-success">
                      <span className="mdi mdi-arrow-top-right icon-item"></span>
                    </div>
                  </div>
                </div>
                <h6 className="text-muted font-weight-normal">
                  Download number
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Gender per Population</h4>
                <TableauReact />
              </div>
            </div>
          </div>
          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Gender per Population</h4>
                <TableauReact />
              </div>
            </div>
          </div>

          <div className="col-md-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Age per population</h4>
                <Age />
              </div>
            </div>
          </div>
        </div>
        <div className="row ">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Client List</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Birth date</th>
                        <th>Tampon number</th>
                        <th>Pays</th>
                      </tr>
                    </thead>

                    <tbody>
                      {" "}
                      {currentPosts.map((post) => {
                        return (
                          <tr>
                            <td> {post.nom_prenom} </td>
                            <td> {post.sexe} </td>
                            <td> {post.age} </td>
                            <td> {post.date_naissance} </td>
                            <td> {post.nbre_total_tampon} </td>
                            <td> {post.pays} </td>
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
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Distribution</h4>
                <div className="table-responsive">
                  <Distribution />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Inscription per month</h4>
                <div className="table-responsive">
                  <Enter />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title">Churn</h4>
                </div>
                <div className="preview-list">
                  <Churn />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Portfolio Slide</h4>
                <Slider className="portfolio-slider" {...this.sliderSettings}>
                  <div className="item">
                    <img
                      src={require("../../assets/images/dashboard/Rectangle.jpg")}
                      alt="carousel-item"
                    />
                  </div>
                  <div className="item">
                    <img
                      src={require("../../assets/images/dashboard/Img_5.jpg")}
                      alt="carousel-item"
                    />
                  </div>
                  <div className="item">
                    <img
                      src={require("../../assets/images/dashboard/img_6.jpg")}
                      alt="carousel-item"
                    />
                  </div>
                </Slider>
                <div className="d-flex py-4">
                  <div className="preview-list w-100">
                    <div className="preview-item p-0">
                      <div className="preview-thumbnail">
                        <img
                          src={require("../../assets/images/faces/face12.jpg")}
                          className="rounded-circle"
                          alt="face"
                        />
                      </div>
                      <div className="preview-item-content d-flex flex-grow">
                        <div className="flex-grow">
                          <div className="d-flex d-md-block d-xl-flex justify-content-between">
                            <h6 className="preview-subject">CeeCee Bass</h6>
                            <p className="text-muted text-small">4 Hours Ago</p>
                          </div>
                          <p className="text-muted">
                            Well, it seems to be working now.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted">Well, it seems to be working now.</p>
                <div className="progress progress-md portfolio-progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "50%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-xl-4 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Sexe per age</h4>
                <Sexeage />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Region</h4>
                <div className="row">
                  <div className="col-md-5">
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-us"></i>
                            </td>
                            <td>USA</td>
                            <td className="text-right">1500</td>
                            <td className="text-right font-weight-medium">
                              56.35%
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-de"></i>
                            </td>
                            <td>Germany</td>
                            <td className="text-right">800</td>
                            <td className="text-right font-weight-medium">
                              33.25%
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-au"></i>
                            </td>
                            <td>Australia</td>
                            <td className="text-right">760</td>
                            <td className="text-right font-weight-medium">
                              15.45%
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-gb"></i>
                            </td>
                            <td>United Kingdom</td>
                            <td className="text-right">450</td>
                            <td className="text-right font-weight-medium">
                              25.00%
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-ro"></i>
                            </td>
                            <td>Romania</td>
                            <td className="text-right">620</td>
                            <td className="text-right font-weight-medium">
                              10.25%
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <i className="flag-icon flag-icon-br"></i>
                            </td>
                            <td>Brasil</td>
                            <td className="text-right">230</td>
                            <td className="text-right font-weight-medium">
                              75.00%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pays />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
