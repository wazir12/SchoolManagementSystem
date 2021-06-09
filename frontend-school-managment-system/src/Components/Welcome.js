import React,{ Component } from "react";
import UsersListComponent from "./AdminView/UsersListComponent";
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom'
export default class WelcomePage extends Component{

    
    render(){
        return (
        <div>
            Welcome {this.props.match.params.name}.You Can Manage all users <Link to="/users">here</Link>
           
            
        </div>
        
        );
    }
}