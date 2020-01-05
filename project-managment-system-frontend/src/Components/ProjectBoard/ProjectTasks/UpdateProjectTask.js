import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import classnames from 'classnames'
import { connect } from "react-redux";
import { getProjectTask, updateProjectTask } from "../../../actions/backlogActions";
import { clearErrors } from "../../../actions/projectActions";
import  PropTypes from "prop-types";

class UpdateProjectTask extends Component {

    constructor(props) {
        super(props);
    
        const { id } = this.props.match.params;
    
        this.state = {
            id:"",
          summary: "",
          acceptanceCriteria: "",
          status: "",
          priority: 0,
          dueDate: null,
          projectIdentifier: id,
          errors: {},
          createdBy: ""
        };
      }

    componentDidMount(){
        const {id, ptId} = this.props.match.params;
        this.props.getProjectTask(id, ptId);
    }

    componentWillUnmount(){
        this.props.clearErrors();
    }

    componentWillReceiveProps(nextProps) {

        const {
            id, 
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            createdBy
        } = nextProps.projectTask;

        this.setState({
            id,
            summary,
            acceptanceCriteria,
            status,
            priority,
            dueDate,
            createdBy
        })

        if(nextProps.errors){
            this.setState({errors : nextProps.errors})
        }

    }


    onChange = event => {
        this.setState({[event.target.name] : event.target.value});
    }

    onSubmit = event => {
        event.preventDefault();

        const updatedTask = {
            id : this.state.id,
            summary : this.state.summary,
            acceptanceCriteria : this.state.acceptanceCriteria,
            status : this.state.status,
            priority : this.state.priority,
            dueDate : this.state.dueDate, 
        }

        const {id, ptId} = this.props.match.params;
        this.props.updateProjectTask(id, ptId, updatedTask, this.props.history)

    }

    render() {

        const {projectIdentifier, errors} = this.state;

        return (
            <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${projectIdentifier}`} className="btn btn-info mt-3">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
        <p className="lead text-center">Task created by: {this.state.createdBy}</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                        "is-invalid" : errors.summary
                      })}
                    name="summary"
                    placeholder="Project Task summary"  
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate || ''}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="ON_REVIEW">ON REVIEW</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
        )
    }
}

UpdateProjectTask.propTypes = {
    projectTask : PropTypes.object.isRequired,
    getProjectTask : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired,
    updateProjectTask : PropTypes.func.isRequired,
    clearErrors : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    projectTask : state.backlog.projectTask,
    errors : state.errors    
})

export default connect(mapStateToProps, {getProjectTask, updateProjectTask, clearErrors}) (UpdateProjectTask); 