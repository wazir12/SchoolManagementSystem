import './App.css';
import LoginComponent from './Components/LoginComponent'
import React, { Component } from 'react';
import WelcomePage from './Components/Welcome'

import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom'
import ErrorComponent from './Components/utility/ErrorComponent';
import UsersListComponent from './Components/AdminView/UsersListComponent';
import HeaderComponent from './Components/utility/HeaderComponent';
import FooterComponent from './Components/utility/Footer';
import './bootstrap.css';
class App extends Component {
  render(){
    return (

      <div className="App">
          <Router>
            <>
             <HeaderComponent/>
              <Switch>
               
                <Route path="/" exact component={LoginComponent}/>
                <Route path="/login" component={LoginComponent}/>
                <Route path="/welcome/:name" component={WelcomePage}/>
                <Route path="/users" component={UsersListComponent}/>
                <Route component={ ErrorComponent }/>
                
              </Switch> 
              <FooterComponent/>
            </>
          </Router>

      </div>
    );
  }
}

export default App;
