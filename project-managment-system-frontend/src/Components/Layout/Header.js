import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {logout} from "../../actions/securityActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

class Header extends Component {

    logout = () => {
        this.props.logout();
        window.location.href = "/";
    }

    render() {

        const { validToken, user } = this.props.security;

        const userIsNotAuthenticated = (
          <React.Fragment>
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link>
              <Link className="nav-link " to="/register">
                Sign in
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </Nav.Link>
          </Nav>
          </React.Fragment>
        );

        const userIsAuthenticated = (
          <React.Fragment>
            <Nav className="mr-auto">
            <Nav.Link>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link>
              <Link className="nav-link " to="/dashboard">
                {<FontAwesomeIcon icon={faUserCircle} />}
                {` ${user.fullname}`}
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link onClick={this.logout} className="nav-link" to="/logout">
                Logout
              </Link>
            </Nav.Link>
          </Nav>
          </React.Fragment>
        );

        let headerLinks;

        if (validToken && user) {
          headerLinks = userIsAuthenticated;
        } else {
          headerLinks = userIsNotAuthenticated;
        }

        return (
          <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="/">Project Management Tool</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                {headerLinks}
              </Navbar.Collapse>
            </Navbar>
          </div>
        );
    }
}

Header.propTypes = {
    logout : PropTypes.func.isRequired,
    security : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security : state.security
})

export default connect(mapStateToProps, {logout}) (Header);