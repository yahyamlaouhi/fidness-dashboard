import React, {Component} from 'react';
import {
    Line,
    Bar,
    Doughnut,
    Pie,
    Scatter
} from 'react-chartjs-2';
import Partnercustomer from './visualization/customerpartner';
import Partnerage from './visualization/agepartner';
import PartnerSexe from './visualization/partnersexe';

export class ChartJs extends Component {


    render() {
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">
                        Partners Dashboard
                    </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="!#"
                                    onClick={
                                        event => event.preventDefault()
                                }>Partners
                                </a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                        </ol>
                    </nav>
                </div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Gender of customer per partner</h4>
                            <div className="table-responsive">
                                <PartnerSexe/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Number of customer per partner</h4>
                            <div className="table-responsive">
                                <Partnercustomer/>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Age of customer per partner</h4>
                            <div className="table-responsive">
                                <Partnerage/>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        )
    }
}

export default ChartJs
