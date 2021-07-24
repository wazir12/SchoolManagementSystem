import { Component } from "react";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserService from "../../api/UserService";
import AuthenticationService, { USER_ID, USER_TOKEN_ATTRIBUTE_NAME } from "../../Authentication/AuthenticationService";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { CssBaseline } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import CustomAlert from "./Alerts/CustomAlerts";

export default class UserSettings extends Component{

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            firstName: '',
            lastName:'',
            username:'',
            password:'',
            role:'',
            showError:false,
            showSuccess:false,
            message:''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.retrieveUserDetails = this.retrieveUserDetails.bind(this)

    }

    componentDidMount() {

       
        AuthenticationService.setupAxiosInterceptors(
            AuthenticationService.createJWTToken(
                localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
                )
        );

        let username = sessionStorage.getItem(USER_ID);
        UserService.executeRetrieveUserIDByUsernameService(username).then(
            response=>{
                console.log('settings: '+response.data)
                this.setState({
                    id:response.data.userId
                },()=>this.retrieveUserDetails())
            }

        ).catch(error=>console.log('error-in retrieving userID'+error))

       // let username = AuthenticationService.getLoggedInUserName()
    }

    retrieveUserDetails(){
        console.log('in retrieve user')
        UserService.executeRetrieveUserByIdService(this.state.id)
        .then(response => {
            console.log(response.data)
            this.setState({
               username: response.data.username,
               firstName:response.data.firstName,
               lastName: response.data.lastName,
               role:response.data.role
             }) 
            }
        )
    }

    validate(values) {
        let errors = {}
        if (!values.firstName) {
            errors.firstName = 'Enter the First Name'
        } 
         if (!values.lastName) {
            errors.lastName = 'Enter the Last Name'
        }
        if(!values.username){
            errors.username = 'Enter a User Name'
        }

        /** if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        } */


       

        return errors

    }

    onSubmit(values) {
       // let username = AuthenticationService.getLoggedInUserName()

        let userDetails = {
            id: this.state.id,
            username: values.username,
            firstName: values.firstName,
            lastName:values.lastName,
            role:values.role,
            password:values.password,
            //targetDate: values.targetDate
        }

        console.log(this.state.id);
      
           UserService.updateUser(this.state.id, userDetails)
               .then(() => this.setState({
                   showSuccess:true,
                   message:'User is updated successfully'
               })
               
               ).catch((error=>this.setState({
                  showError:true,
                  message:'User Can not be updated!' 
               })));
        

        console.log(values);
    }


    render(){
        let { 
            firstName,
            lastName,
            role,
            username,
            password } = this.state
        return(

            <div className="root">
           
           {this.state.showError &&  <CustomAlert errorMessage={this.state.message} severity='error' onCancel = {()=>{
                   this.setState({
                       showError:false,
                       message:''
                   })
               }}/>}
                {this.state.showSuccess &&  <CustomAlert errorMessage={this.state.message} severity='success' onCancel = {()=>{
                   this.setState({
                       showError:false,
                       message:''
                   })
               }}/>}
           <CssBaseline/>
          
           <Grid container spacing={3} direction="row"
        
                  justify="center"
                  alignItems="center"  >
             <Grid item xs={8}>
               <Paper className="paper" elevation={2}> 
                 <Box padding='16px'>
                 <Formik
                        initialValues={{ firstName, lastName,role,username,password }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="firstName" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="lastName" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="username" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="role" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>First Name</label>
                                        <Field className="form-control" type="text" name="firstName" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Last Name</label>
                                        <Field className="form-control" type="text" name="lastName" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>User Name</label>
                                        <Field className="form-control" type="text" name="username" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Role</label>
                                        <Field className="form-control" type="text" readonly='true' name="role" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>New Password</label>
                                        <Field className="form-control" type="password" name="password" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                 </Box>
               </Paper>
             </Grid>
           </Grid>
         </div>
        );
    }
}