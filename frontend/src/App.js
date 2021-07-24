import './App.css';
import LoginComponent from './Components/LoginComponent'
import React, { Component } from 'react';
import WelcomePage from './Components/Welcome'

import {BrowserRouter as Router,Route, Switch, Link} from 'react-router-dom'
import ErrorComponent from './Components/utility/ErrorComponent';
import UsersListComponent from './Components/AdminView/UsersListComponent';
import LogoutComponent from './Components/utility/LogoutComponent'
import './bootstrap.css';
import AuthenticatedRoute from './Components/utility/AuthenticatedRoute';
import EditUserComponent from './Components/AdminView/EditUserComponent';
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from './Authentication/AuthenticationService';


import ManageCourses from './Components/AdminView/ManageCourses';
import CourseDetails from './Components/AdminView/CourseDetails';
import { Helmet } from 'react-helmet';
import AddSubject from './Components/AdminView/AddSubject';
import EditSubject from './Components/AdminView/EditSubject';
import SelectPupil from './Components/AdminView/SelectPupilModal';
import PupilList from './Components/TeacherView/PupilsList';
import AssignedSubjectsList from './Components/TeacherView/AssignedSubjects';
import SubjectDashboard from './Components/TeacherView/ViewSubjectDetails';
import TestItemDetailsView from './Components/TeacherView/TestItemDetailsView';
import clsx from 'clsx';
import PupilDashboard from './Components/PupilView/PupilDashBoard';
import PupilSubjectView from './Components/PupilView/SubjectView';
import AdminDashboard from './Components/AdminView/AdminDashBoard';
import FooterComponent from './Components/utility/Footer';
import Header from './Components/utility/Sidebar/NavHeader';
import UserSettings from './Components/utility/UserSetting';
class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      role:'',
    }
    this.extractRolefromToken= this.extractRolefromToken.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
    this.isPupil = this.isPupil.bind(this);
    this.isTeacher = this.isTeacher.bind(this);
    this.extractRolefromToken();
  }

  componentDidMount(){

    this.extractRolefromToken();
    AuthenticationService.setupAxiosInterceptors(
        AuthenticationService.createJWTToken(
          localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
        )
    );
  }
  extractRolefromToken(){
      let  userRole = AuthenticationService.getRoleFromToken();
      this.setState({
        role:userRole
      })
  }

  isAdmin(){
    return this.state.role=="ADMIN";
  }
  isTeacher(){
    return this.state.role=="TEACHER";
  }
  isPupil(){
    return this.state.role=="PUPIL";
  }
  

 
  render(){
    return (

      <div className="App">
         <Helmet>
          <title>School Mangement System</title>
          <meta name="description" content="School Management System" />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
         </Helmet>
          <Router>
            <>
            <Header/>
              <Switch>
                <Route path="/" exact component={LoginComponent}/>
                <Route path="/login" component={LoginComponent}/>
                { <AuthenticatedRoute path="/user/settings" component={UserSettings}/>}
               { <AuthenticatedRoute path="/admin/dashboard/:name" component={AdminDashboard}/>}
               { <AuthenticatedRoute path="/pupil/welcome/:name" component={PupilDashboard}/>}
               {<AuthenticatedRoute path="/teacher/:name/subjects" component={AssignedSubjectsList}/>}
               { <AuthenticatedRoute path="/teacher/:name/subjectDetails/:subjectName" component={SubjectDashboard}/>}
               { <AuthenticatedRoute path="/:pupilId/subjectView/:subjectName" component={PupilSubjectView}/>}
               { <AuthenticatedRoute path ="/teacher/:name/pupils" component={PupilList}/>}
               {<AuthenticatedRoute path="/users" component={UsersListComponent}/>}
               {<AuthenticatedRoute path="/test/subject/:subjectName/:id/:name" component={TestItemDetailsView}/>}
                <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
               { <AuthenticatedRoute path="/editUser/:id" component={EditUserComponent}/>}
               {<AuthenticatedRoute path="/admin/courses/:id/:name" component={CourseDetails}/>}
               { <AuthenticatedRoute path="/admin/manageCourses" component={ManageCourses}/>}
               { <AuthenticatedRoute path="/courses/:id/:name/pupils" component={SelectPupil}/>}
              {<AuthenticatedRoute path ="/courses/:id/:name/add/:subjectId" component={AddSubject}/>}
               { <AuthenticatedRoute path ="/course/:id/:name/edit/:subjectId" component={EditSubject}/>}
                <Route component={ ErrorComponent }/> 
              </Switch> 
           
            </>
          </Router>

      </div>
    );
  }
}

export default App;
