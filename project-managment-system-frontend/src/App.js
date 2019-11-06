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

function App() {
  return (
    <React.Fragment>
    <Provider store={store}>
    <Router>
      <div className="App">
        <Header/>
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
