import React,{ Component } from "react";
import UsersListComponent from "./AdminView/UsersListComponent";
import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom'
import HelloWorldService from "../api/HelloWorldService";
import AuthenticationService from "../Authentication/AuthenticationService";
export default class WelcomePage extends Component
{

    constructor(props){
        super(props)
        this.retrieveHelloWorldBeanMessage = this.retrieveHelloWorldBeanMessage.bind(this)
        this.helloWorldSuccessMessage = this.helloWorldSuccessMessage.bind(this)
        this.retrieveHelloWorldBeanPathVariableMessage = this.retrieveHelloWorldBeanPathVariableMessage.bind(this)
        this.getExpiryDate = this.getExpiryDate.bind(this)

        this.state ={
           welcomeMessage : ''
        }

        
    }

    getExpiryDate(){

         return AuthenticationService.getExpiryDateFromToken();
    }
   

    
 

    render(){
        return (
        <>
           <h1>Welcome  {sessionStorage.getItem("USER_ROLE")} And Expiry Date is :{this.getExpiryDate()}!</h1> 
          { sessionStorage.getItem("USER_ROLE") == "ADMIN" && <div className="container">  {this.props.match.params.name}.You Can Manage all users <Link to="/users">here</Link> </div>}
           <div className="container"> 
            Click <button onClick={this.retrieveHelloWorldBeanPathVariableMessage} className="btn btn-success">here</button> to get a customized welcome message!
           </div>
           <div className="container"> 
                {this.state.welcomeMessage}
           </div>
   
        </>
        
        );
    }

    

    retrieveHelloWorldBeanMessage(){
        HelloWorldService.executeHelloWorldBeanService()
        .then(response => this.helloWorldSuccessMessage(response));
         
      }
      retrieveHelloWorldBeanPathVariableMessage(){
        HelloWorldService.executeHelloWorldBeanPathVariableService(this.props.match.params.name)
        .then(response => this.helloWorldSuccessMessage(response))
        .catch(error => this.helloWorldErrorMessage(error));
         
      }

    helloWorldSuccessMessage(response){

        console.log(response);
        this.setState({
              welcomeMessage:response.data.message         
        });
    }
    helloWorldErrorMessage(error){

        console.log(error.response);
        this.setState({
              welcomeMessage:error.response.data.details         
        });
    }
}