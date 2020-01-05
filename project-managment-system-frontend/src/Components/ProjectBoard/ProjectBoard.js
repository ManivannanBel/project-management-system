import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Backlog from './Backlog';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getBacklog } from '../../actions/backlogActions';
import { getUsersForSearchQuery, resetSearchedUsernames } from '../../actions/projectActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

class ProjectBoard extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             errors : {},
             showFindTeamMemberModel : false,
             searchQuery : "",
             suggestions : []
        }

        this.items=[
            'Mani',
            'Maxi',
            'Watson',
            'Ab deviliers',
            'control',
            'dummy'
        ]
    }

    componentWillReceiveProps(nextProp){
        if(nextProp.errors){
            this.setState({errors : nextProp.errors});
        }
        if(nextProp.userNames){
             this.setState(() => ({suggestions : nextProp.userNames}));
        }
    }    

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklog(id)
    }

    onSearchQueryChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
        /*let suggestions = [];
        if(event.target.value.length > 0){
            const regex = new RegExp(`^${event.target.value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }*/
        if(event.target.value.length > 0 && event.target.value.charAt(0) !== ' '){
            this.props.getUsersForSearchQuery(event.target.value);
        }else{
            this.setState(() => ({suggestions : []}));
            this.props.resetSearchedUsernames();
        }
        //console.log(this.props.userNames);
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;
        if(!suggestions || suggestions.length === 0){
            return null;
        }
        return (
            <ul>
                {suggestions.map((username) => <li>{username}</li>)}
            </ul>
        )
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
                } else if (errors.projectIdentifier) {
                    return (
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.projectIdentifier}
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
            <div>
          <div className="container">
            <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3  mt-3 ml-1">
              <i className="cool-text"> <FontAwesomeIcon icon={faPlusCircle} /> Create Project Task</i>
            </Link>
            <Button className="btn btn-success mb-3  mt-3 ml-1" onClick={() => this.setState({showFindTeamMemberModel : true})}>
              <i className="cool-text"> <FontAwesomeIcon icon={faPlusCircle} /> Add team members</i>
            </Button>
            <br />
            <hr />
            {BoardContent}
          </div>

            <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.showFindTeamMemberModel}
            >
            <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                Add team members
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>Search by username</h4>
            <div className="AutoCompleteText">
                <input type="text" name="searchQuery" value={this.state.searchQuery} onChange={this.onSearchQueryChange}/>
                <ul>
                    {
                        this.renderSuggestions()
                    }
                </ul>
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={() => this.setState({showFindTeamMemberModel : false})}>Close</Button>
            </Modal.Footer>
            </Modal>
            </div>
        );
    }
}

ProjectBoard.protoTypes = {
    backlog : PropTypes.object.isRequired,
    getBacklog : PropTypes.func.isRequired,
    getUsersForSearchQuery : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired,
    userNames : PropTypes.array.isRequired,
    resetSearchedUsernames : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    backlog : state.backlog,
    errors : state.errors,
    userNames : state.project.userNames
})

export default connect(mapStateToProps, {getBacklog, getUsersForSearchQuery, resetSearchedUsernames}) (ProjectBoard);
