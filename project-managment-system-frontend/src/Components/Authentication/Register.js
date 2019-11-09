import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      fullname: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.createNewUser(newUser, this.props.history);
  };

  componentDidMount(){
    if(this.props.security.validToken){
        this.props.history.push("/dashboard");
    }
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
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
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.fullname
                    })}
                    placeholder="Name"
                    name="fullname"
                    onChange={this.onChange}
                    value={this.state.fullname}
                  />
                  {errors.fullname && (
                    <div className="invalid-feedback"> {errors.fullname} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.username
                    })}
                    placeholder="Email Address"
                    name="username"
                    onChange={this.onChange}
                    value={this.state.username}
                  />
                  {errors.username && (
                    <div className="invalid-feedback"> {errors.username} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                  {errors.password && (
                    <div className="invalid-feedback"> {errors.password} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.confirmPassword
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={this.onChange}
                    value={this.state.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {" "}
                      {errors.confirmPassword}{" "}
                    </div>
                  )}
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

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  createNewUser: PropTypes.func.isRequired,
  security : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security : state.security
});

export default connect(
  mapStateToProps,
  { createNewUser }
)(Register);
