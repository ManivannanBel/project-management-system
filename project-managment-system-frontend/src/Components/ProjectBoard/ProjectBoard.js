import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Backlog from './Backlog';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getBacklog } from '../../actions/backlogActions';

class ProjectBoard extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             errors : {}
        }
    }

    componentWillReceiveProps(nextProp){
        if(nextProp.errors){
            this.setState({errors : nextProp.errors});
        }
    }    

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklog(id)
    }

    render() {
        const {id} = this.props.match.params;
        const {projectTasks} = this.props.backlog;
        const {errors} = this.state;

        let BoardContent;
        
        const boardValidator = (errors, projectTasks) => {
            if(projectTasks.length < 1){
                if(errors.projectNotFound){
                    return (
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.projectNotFound}
                        </div>
                    )
                } else {
                    return (
                        <div className="alert alert-info text-center" role="alert">
                            No tasks created for this project
                        </div>
                    )
                }
            } else {
                return (
                    <Backlog projectTasks={projectTasks}/>
                )
            }
        }

        BoardContent = boardValidator(errors, projectTasks)

        return (
          <div className="container">
            <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
              <i className="fas fa-plus-circle"> Create Project Task</i>
            </Link>
            <br />
            <hr />
            {BoardContent}
          </div>
        );
    }
}

ProjectBoard.protoTypes = {
    backlog : PropTypes.object.isRequired,
    getBacklog : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    backlog : state.backlog,
    errors : state.errors
})

export default connect(mapStateToProps, {getBacklog}) (ProjectBoard);
