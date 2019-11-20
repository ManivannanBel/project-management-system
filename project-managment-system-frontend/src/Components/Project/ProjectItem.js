import React, { Component } from 'react'
import {Link} from "react-router-dom";
import { deleteProject } from "../../actions/projectActions";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import '../../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered, faEdit, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

class ProjectItem extends Component {
    
    onDeleteClick = id => {
        this.props.deleteProject(id);
    }

    render() {
        const {project} = this.props;
        return (
            <div>
                <div className="container">
                            <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-3">
                                        <span className="mx-auto pid">{project.projectIdentifier}</span>
                                    </div>
                                    <div className="col-lg-6 col-md-4 col-8">
                                        <h3>{project.projectName}</h3>
                                        <p className="cool-text">{project.description}</p>
                                    </div>
                                    <div className="col-md-3 d-lg-block padding-override">
                                        <ul className="list-group">
                                            <Link to={`/projectBoard/${ project.projectIdentifier }`}>
                                                <li className="list-group-item board">
                                                    <i className="cool-text bold-text"> <FontAwesomeIcon icon={faFlagCheckered}/> Project Board </i>
                                                </li>
                                            </Link>
                                            <Link to={`/updateProject/${project.projectIdentifier}`}>
                                                <li className="list-group-item update">
                                                    <i className="cool-text bold-text"> <FontAwesomeIcon icon={faEdit}/> Update Project Info</i>
                                                </li>
                                            </Link>
                                                <li className="list-group-item delete" onClick={() => this.onDeleteClick(project.projectIdentifier)}>
                                                    <i className="cool-text bold-text"> <FontAwesomeIcon icon={faMinusCircle}/> Delete Project</i>
                                                </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        )
    }
}

ProjectItem.propTypes = {
    deleteProject : PropTypes.func.isRequired
}

export default connect(null, {deleteProject}) (ProjectItem);