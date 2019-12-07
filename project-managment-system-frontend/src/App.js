import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AddProject from './Components/Project/AddProject';
import Header from './Components/Layout/Header';
import { Provider } from 'react-redux';
import store from './store';
import UpdateProject from './Components/Project/UpdateProject';
import ProjectBoard from "./Components/ProjectBoard/ProjectBoard";
import AddProjectTask from './Components/ProjectBoard/ProjectTasks/AddProjectTask';
import Dashboard from './Components/Dashboard';
import UpdateProjectTask from './Components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './Components/Layout/Landing';
import Register from './Components/Authentication/Register';
import Login from './Components/Authentication/Login';
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecuredRoute";
import Profile from './Components/Profile/Profile';


const jwtToken = localStorage.jwtToken;
    console.log("wiilll update")
    if(jwtToken){
      setJWTToken(jwtToken);
      
      const decodedToken = jwt_decode(jwtToken);
      //console.log(decodedToken)
      store.dispatch({
        type : SET_CURRENT_USER,
        payload : decodedToken
      });
    
      const currentTime = Date.now()/1000;
      //once token is expired
      if(decodedToken.exp < currentTime){
        //handle logout
        //console.log("logout")
        store.dispatch(logout())
        window.location.href = "/";
      }
    
    }

class App extends Component {


  render(){
  return (
    <React.Fragment>
    <Provider store={store}>
    <Router>
      <div className="App">
        <Header/>
        {
          //Public routes
        }
        <Route exact path='/' component={Landing}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        {
          //Private routes
        }
        <Switch>
          <SecuredRoute exact path='/dashboard' component={Dashboard} />
          <SecuredRoute exact path='/addProject' component={AddProject} />
          <SecuredRoute exact path='/updateProject/:id' component={UpdateProject} />
          <SecuredRoute exact path='/projectBoard/:id' component={ProjectBoard} />
          <SecuredRoute exact path='/addProjectTask/:id' component={AddProjectTask}/>
          <SecuredRoute exact path='/updateProjectTask/:id/:ptId' component={UpdateProjectTask}/>
          <SecuredRoute exact path='/profile' component={Profile}/>
        </Switch>
      </div>
    </Router>
    </Provider>
    </React.Fragment>
  );
      }
}

export default App;
