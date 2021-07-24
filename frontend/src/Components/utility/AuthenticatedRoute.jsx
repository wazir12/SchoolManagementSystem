import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from '../../Authentication/AuthenticationService'

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
           // if(this.props.component=='AdminDashboard}'){
               console.log(this.props.Component)
                return <Route {...this.props} />
           
        //return <Route {...this.props} />
           
           
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute