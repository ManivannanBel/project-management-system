import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {logout} from "../../actions/securityActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
 
class Header extends Component {

    logout = () => {
        this.props.logout();
        window.location.href = "/";
    }

    render() {

        const {validToken, user} = this.props.security;

        const userIsNotAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
            
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link " to="/register">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={this.logout} className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        )

        const userIsAuthenticated = (
            <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link " to="/dashboard">
                 {<FontAwesomeIcon icon={faUserCircle}/>
                 }
                  {` ${user.fullname}`}
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={this.logout} className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )

        let headerLinks;

        if(validToken && user){
            headerLinks = userIsAuthenticated
        }else{
            headerLinks = userIsNotAuthenticated
        }

        return (
          <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
              <div className="container">
                <Link className="navbar-brand" to="/">
                  Project Management Tool
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#mobile-nav"
                >
                  <span className="navbar-toggler-icon" />
                </button>

                {headerLinks}

              </div>
            </nav>
          </div>
        );
    }
}

Header.propTypes = {
    logout : PropTypes.func.isRequired,
    security : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    security : state.security
})

export default connect(mapStateToProps, {logout}) (Header);