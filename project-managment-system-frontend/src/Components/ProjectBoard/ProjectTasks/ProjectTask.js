import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { deleteProjectTask } from "../../../actions/backlogActions"
import PropTypes from 'prop-types';

class ProjectTask extends Component {

  onDeleteButtonClick = (backlogId, projectTaskSequence) => {
      this.props.deleteProjectTask(backlogId, projectTaskSequence);
    }

    render() {
        const { projectTask } = this.props

        let priorityString;
        let priorityClassName;

        if(projectTask.priority === 1){
          priorityClassName = "bg-danger text-light";
          priorityString = "HIGH";
        }

        if(projectTask.priority === 2){
          priorityClassName = "bg-warning text-light";
          priorityString = "MEDIUM";
        }

        if(projectTask.priority === 3){
          priorityClassName = "bg-info text-light";
          priorityString = "LOW";
        }

        return (
              <div className="card mb-1 bg-light">
                <div className={`card-header text-primary ${priorityClassName}`}>
                  ID: {projectTask.projectSequence} -- Priority: {priorityString}
                </div>
                <div className="card-body bg-light">
                  <h5 className="card-title">{projectTask.summary}</h5>
                  <p className="card-text text-truncate ">
                    {projectTask.acceptanceCriteria}
                  </p>
                  <Link to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`} className="btn btn-primary">
                    View / Update
                  </Link>
                  <button className="btn btn-danger ml-4" onClick={() => this.onDeleteButtonClick(projectTask.projectIdentifier, projectTask.projectSequence)}>Delete</button>
                </div>
              </div>
        )
    }
}

ProjectTask.propTypes = {
  deleteProjectTask : PropTypes.func.isRequired
}

export default connect(null, {deleteProjectTask}) (ProjectTask);