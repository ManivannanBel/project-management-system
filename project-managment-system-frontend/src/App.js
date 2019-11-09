import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
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

const jwtToken = localStorage.jwtToken;

if(jwtToken){
  setJWTToken(jwtToken);
  
  const decodedToken = jwt_decode(jwtToken);
  
  store.dispatch({
    type : SET_CURRENT_USER,
    payload : decodedToken
  });

  const currentTime = Date.now()/1000;
  if(decodedToken.exp < currentTime){
    //handle logout

    //window.location.href = "/";
  }

}

function App() {
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
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/addProject' component={AddProject} />
        <Route exact path='/updateProject/:id' component={UpdateProject} />
        <Route exact path='/projectBoard/:id' component={ProjectBoard} />
        <Route exact path='/addProjectTask/:id' component={AddProjectTask}/>
        <Route exact path='/updateProjectTask/:id/:ptId' component={UpdateProjectTask}/>
      </div>
    </Router>
    </Provider>
    </React.Fragment>
  );
}

export default App;
