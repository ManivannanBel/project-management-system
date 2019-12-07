import React, { Component } from "react";
import {
  Container,
  Form,
  Table,
  FormLabel,
  FormControl,
  FormGroup,
  Button,
  Row,
  Col,
  Modal,
  ListGroup
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {
  getProfileDetails,
  updateFullname,
  updatePassword
} from "../../actions/profileActions";
import { clearErrors } from "../../actions/projectActions";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalText: "",
      modalValue: "",
      modalInputName: "",
      fullnameToChange: "",
      passwordToChange: "",
      confirmPassword: "",
      fullname: "",
      username: "",
      created_at: null,
      last_login: null,
      projects: [],
      errors: {},
      message: {}
    };
  }

  componentDidMount() {
    this.props.getProfileDetails();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      fullname,
      username,
      created_at,
      last_login,
      projects
    } = nextProps.userDetail;

    this.setState({ fullname, username, projects, created_at, last_login });
    //console.log(projects)
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleClose = () => {
    this.setState({
      show: false,
      fullnameToChange: "",
      passwordToChange: "",
      confirmPassword: "",
      modalInputName: "",
      modalValue: "",
      modalText: ""
    });
  };

  handleShow = (text, name) => {
    this.setState({ show: true, modalText: text, modalInputName: name });
    if (text === "password") this.setState({ changePassword: true });
  };

  onChange = event => {
    //console.log(event.target.name)
    if (event.target.name === "confirmPassword") {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        modalValue: event.target.value
      });
    }
  };

  updateDetail = inputType => {
    //console.log(this.state.email)
    this.props.clearErrors();
    if (inputType === "fullname") {
      const data = { fullname: this.state.fullnameToChange };
      this.props.updateFullname(data);
    } else if (inputType === "password") {
      const data = {
        password: this.state.passwordToChange,
        confirmPassword: this.state.confirmPassword
      };
      this.props.updatePassword(data);
    }
    this.handleClose();
  };

  render() {
    const { errors, message, projects } = this.state;

    const projectList = projects.map(project => (
        <Link to={`/projectBoard/${project.projectIdentifier}`}>
        <ListGroup.Item key={project.projectIdentifier}>
        <Row>
          <Col md={2}>{project.projectIdentifier}</Col>
          <Col md={10}>{project.projectName}</Col>
        </Row>
        </ListGroup.Item>
        </Link>
    ));

    return (
      <Container fluid={true}>
        {errors.error && (
          <div className="margin-top-20 alert alert-danger" role="alert">
            {errors.error}
          </div>
        )}
        {message.success && (
          <div className="margin-top-20 alert alert-success" role="alert">
            {message.success}
          </div>
        )}
        <h2 className="margin-top-50 text-align-center">Profile</h2>
        <Row className="margin-top-20">
          <Col className="text-right-align">Fullname</Col>
          <Col className="text-align-center">{this.state.fullname}</Col>
          <Col>
            <Button
              onClick={() => this.handleShow("fullname", "fullnameToChange")}
            >
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </Button>
          </Col>
        </Row>
        <Row className="margin-top-20">
          <Col className="text-right-align">Email</Col>
          <Col className="text-align-center">{this.state.username}</Col>
          <Col></Col>
        </Row>
        <Row className="margin-top-20">
          <Col className="text-right-align">Created </Col>
          <Col className="text-align-center">{this.state.created_at}</Col>
          <Col></Col>
        </Row>
        <Row className="margin-top-20">
          <Col className="text-right-align">Last login </Col>
          <Col className="text-align-center">{this.state.last_login}</Col>
          <Col></Col>
        </Row>
        <Button
          className="margin-top-20 bg-danger btn-danger button-center"
          onClick={() => this.handleShow("password", "passwordToChange")}
        >
          Change Password
        </Button>

        <h2 className="margin-top-50 text-align-center">Projects</h2>

        <ListGroup>{projectList}</ListGroup>

        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Change {this.state.modalText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>Enter new {this.state.modalText}</Form.Label>
              <Form.Control
                type={this.state.changePassword ? "password" : "text"}
                name={this.state.modalInputName}
                value={this.state.modalValue}
                onChange={this.onChange}
              />
              {this.state.changePassword && (
                <React.Fragment>
                  <Form.Label>Enter confirmation password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                </React.Fragment>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={() => this.updateDetail(this.state.modalText)}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

Profile.propTypes = {
  userDetail: PropTypes.object.isRequired,
  getProfileDetails: PropTypes.func.isRequired,
  updateFullname: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userDetail: state.userDetail,
  errors: state.errors,
  message: state.message
});

export default connect(mapStateToProps, {
  getProfileDetails,
  updateFullname,
  updatePassword,
  clearErrors
})(Profile);
