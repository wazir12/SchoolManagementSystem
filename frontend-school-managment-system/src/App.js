import './App.css';
import LoginComponent from './Components/LoginComponent'
import React, { Component } from 'react';
import WelcomePage from './Components/Welcome'

import {BrowserRouter as Router,Route} from 'react-router-dom'
class App extends Component {
  render(){
    return (

      <div className="App">
          <Router>
            <>
                <Route path="/" exact component={LoginComponent}/>
                <Route path="/login" component={LoginComponent}/>
                <Route path="/welcome" component={WelcomePage}/>
            </>
          </Router>

      </div>
    );
  }
}

export default App;
