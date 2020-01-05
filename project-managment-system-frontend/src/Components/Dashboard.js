import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects, clearErrors, getTeamProjects } from "../actions/projectActions";
import { Tabs, Tab } from "react-bootstrap";
import PropTypes from "prop-types";

class Dashboard extends Component {
  
    constructor(props) {
        super(props)
    
        this.state = {
             activeKey : "My Projects"
        }
    }
    

  componentDidMount() {
    this.props.clearErrors();
    this.props.getProjects();
    this.props.getTeamProjects();
  }

  toggleTab = (eventKey) => {
    this.setState({activeKey : eventKey})
  }

  render() {
    const { projects, teamProjects } = this.props.project;

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton/>
              <br />
              <hr />
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="My Projects" title="My Projects" className="mt-4" >{/*onClick={this.toggleTab("My Projects")}*/}
                  {projects.map(project => (
                    <ProjectItem key={project.id} project={project}/>
                  ))}
                </Tab>
                <Tab eventKey="Team Projects" title="Team Projects" className="mt-4" >{/*onClick={this.toggleTab("Team Projects")}*/}
                {teamProjects.map(project => (
                    <ProjectItem key={project.id} project={project} />
                  ))}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
  getTeamProjects: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.project,
  errors: state.errors
});

export default connect(mapStateToProps, { getProjects, clearErrors, getTeamProjects })(
  Dashboard
);
