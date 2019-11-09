import React, { Component } from 'react'
import { createNewUser } from "../../actions/securityActions"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {classnames} from "classnames";

class Register extends Component {

        constructor(props) {
            super(props)
        
            this.state = {
              username: "",
              fullname: "",
              password: "",
              confirmPassword: "",
              errors : {}
            };
        }

        onChange = event => {
            this.setState({[event.target.name] : event.target.value});
        }

        onSubmit = event => {

            event.preventDefault();

            const newUser = {
              username: this.state.username,
              fullname: this.state.fullname,
              password: this.state.password,
              confirmPassword: this.state.confirmPassword
            }

            this.props.createNewUser(newUser, this.props.history);
        }

        componentWillReceiveProps(nextProps){
            if(nextProps.errors){
                this.setState({errors : nextProps.errors});
            }
        }

    render() {
        return (
          <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your Account</p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Name"
                        name="fullname"
                        onChange={this.onChange}
                        value={this.state.fullname}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email Address"
                        name="username"
                        onChange={this.onChange}
                        value={this.state.username}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name="password"
                        onChange={this.onChange}
                        value={this.state.password}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={this.onChange}
                        value={this.state.confirmPassword}
                      />
                    </div>
                    <input
                      type="submit"
                      className="btn btn-info btn-block mt-4"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Register.propTypes = {
    errors : PropTypes.object.isRequired,
    createNewUser :PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors : state.errors
})

export default connect(mapStateToProps, {createNewUser}) (Register);