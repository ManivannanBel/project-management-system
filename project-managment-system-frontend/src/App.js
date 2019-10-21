import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AddProject from './Components/Project/AddProject';
import Header from './Components/Layout/Header';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Header/>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/addProject' component={AddProject} />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
