import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          username: "",
          password: "",
          errors : {}
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors : nextProps.errors});
        }
        if(nextProps.security.validToken){
            this.props.history.push('/dashboard');
        }
    }
    
    onChange = event => {
        this.setState({[event.target.name] : event.target.value})
    }

    onSubmit = event => {
        event.preventDefault();
        const loginRequest = {
            username : this.state.username,
            password : this.state.password
        }

        this.props.login(loginRequest);
    }


    render() {
        return (
          <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email Address"
                        name="username"
                        onChange={this.onChange}
                        value = {this.state.username}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name="password"
                        onChange={this.onChange}
                        value = {this.state.password}
                      />
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

Login.propTypes = {
    login : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired,
    security : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors : state.errors,
    security : state.security
})

export default connect(mapStateToProps, {login}) (Login);