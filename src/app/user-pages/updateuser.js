import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment' 
export class UpdateUser extends Component {
    constructor(props) {
        super(props)

        // State
        this.state = {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            date_joined:null,
            password:'',
            is_superuser:null,
            is_staff:null,
            is_active:null
        }
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/auth/user/` + this.props.match.params.id + `/`).then(res => {
            this.setState({ username: res.data.username, first_name: res.data.first_name, last_name: res.data.last_name, email: res.data.email, date_joined: res.data.date_joined,password:res.data.password, is_superuser:res.data.is_superuser, is_staff:res.data.is_staff, is_active:res.data.is_active});
        }).catch((error) => {
            console.log(error);
        })
    }
    handleChangeuserInformations(event) {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }
    onSubmit = (e) => {
        e.preventDefault()

        const taskObject = {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            date_joined:this.state.date_joined,
            password:this.state.password,
            password:this.state.password,
            is_superuser:parseInt(this.state.is_superuser),
            is_staff: parseInt(this.state.is_staff),
            is_active: parseInt(this.state.is_active)
            
        };
        console.log(taskObject)
        axios.put(`http://127.0.0.1:8000/auth/user/` + this.props.match.params.id + `/`, taskObject).then((res) => {
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
                <div className="d-flex align-items-center auth px-0 h-100">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="card text-left py-5 px-4 px-sm-5">

                                <h4>Update user</h4>
                                <form className="pt-3" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" name="username" id="exampleInputUsername1" value={this.state.username} onChange={(e) => this.handleChangeuserInformations(e)} placeholder="User name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" name="first_name" id="exampleInputUsername1" value={this.state.first_name}  onChange={(e) => this.handleChangeuserInformations(e)}  placeholder="First name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-lg" name="last_name" id="exampleInputname" value={this.state.last_name}  onChange={(e) => this.handleChangeuserInformations(e)} placeholder="Last name" />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-lg" name="email" value={this.state.email}  onChange={(e) => this.handleChangeuserInformations(e)} id="exampleInputlastname" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" value={this.state.date_joined}  onChange={(e) => this.handleChangeuserInformations(e)} id="exampleInputEmail1" name="date_joined"/>
                                    </div>

                                    <div className="mt-3">
                                        <button type='submit' className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">Update</button>
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
