import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class UpdateUser extends Component {
    render() {
        return (
            <div>
                <div className="d-flex align-items-center auth px-0 h-100">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="card text-left py-5 px-4 px-sm-5">

                                <h4>Update user</h4>
                                <form className="pt-3">
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="First name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" id="exampleInputname" placeholder="Last name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-lg" id="exampleInputlastname" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Password" />
                                    </div>

                                    <div className="mt-3">
                                        <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/dashboard">Update</Link>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateUser
