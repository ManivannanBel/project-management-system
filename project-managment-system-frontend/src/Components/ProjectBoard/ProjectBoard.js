import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Backlog from './Backlog';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getBacklog } from '../../actions/backlogActions';
import { getUsersForSearchQuery, resetSearchedUsernames, addUserToTeam, getProjectTeamMembers } from '../../actions/projectActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';

class ProjectBoard extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             errors : {},
             showFindTeamMemberModel : false,
             showTeamModel: false,
             searchQuery : "",
             suggestions : [],
             teamMembers : []
        }
    }

    componentWillReceiveProps(nextProp){
        if(nextProp.errors){
            this.setState({errors : nextProp.errors});
        }
        if(nextProp.userNames){
             this.setState(() => ({suggestions : nextProp.userNames}));
        }
        if(nextProp.teamMembers){
            this.setState(() => ({teamMembers : nextProp.teamMembers}));
        }
    }    

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getBacklog(id)
        this.props.getProjectTeamMembers(id);
    }

    componentWillUnmount(){
        this.props.resetSearchedUsernames();
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

    addUserToTeamOnClick = (username) => {
        const {id} = this.props.match.params;
        this.props.addUserToTeam( id, username);
        this.setState({showFindTeamMemberModel : false, searchQuery : ''})
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;
        if(!suggestions || suggestions.length === 0){
            return null;
        }
        return (
            <ul>
                {suggestions.map((username) => <li key={username} onClick={(e) => this.addUserToTeamOnClick(username)}>{username}</li>)}
            </ul>
        )
    }

    

    render() {
        const {id} = this.props.match.params;
        const {projectTasks} = this.props.backlog;
        const {errors, teamMembers} = this.state;

        let BoardContent;
        
        const renderTeamDetails = () => {
            
            //console.log(teamMembers)
            return (
              <div>
                {teamMembers.map(teamMember => (
                <ListGroup.Item key={teamMember.username} variant="light">
                  <Row >
                    <Col>{teamMember.fullname}</Col>
                    <Col>{teamMember.username}</Col>
                  </Row>
                </ListGroup.Item>
                ))}
              </div>
            );
        }

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
            <Button className="btn btn-info mb-3  mt-3 ml-1" onClick={() => this.setState({showTeamModel : true})}>
              <i className="cool-text"> <FontAwesomeIcon icon={faUsers} /> View team</i>
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
            <Button onClick={() => {this.setState({showFindTeamMemberModel : false, searchQuery: ''}); this.props.resetSearchedUsernames();}}>Close</Button>
            </Modal.Footer>
            </Modal>
            
            <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.showTeamModel}
            >
            <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
                {this.props.match.params.id} - Project team
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6><Row><Col></Col><Col></Col></Row></h6>
            <div>
                {
                    renderTeamDetails()
                }
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={() => {this.setState({showTeamModel : false})}}>Close</Button>
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
    resetSearchedUsernames : PropTypes.func.isRequired,
    addUserToTeam : PropTypes.func.isRequired,
    getProjectTeamMembers : PropTypes.func.isRequired,
    teamMembers : PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    backlog : state.backlog,
    errors : state.errors,
    userNames : state.project.userNames,
    teamMembers : state.project.teamMembers
})

export default connect(mapStateToProps, {getBacklog, getUsersForSearchQuery, resetSearchedUsernames, addUserToTeam, getProjectTeamMembers}) (ProjectBoard);
