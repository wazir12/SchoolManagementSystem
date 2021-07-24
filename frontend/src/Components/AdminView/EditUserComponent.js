import React,{ Component } from "react";
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserService from "../../api/UserService";
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from "../../Authentication/AuthenticationService";

export default class EditUserComponent extends Component{
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName:'',
            role:'',
            username:'',
            password:''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }
        AuthenticationService.setupAxiosInterceptors(
            AuthenticationService.createJWTToken(
                localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
                )
        );


       // let username = AuthenticationService.getLoggedInUserName()

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
        if (!values.role) {
            errors.role = 'Enter a User Role'
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
       if (this.state.id < 0) {
           UserService.createUser(userDetails)
               .then(() => this.props.history.push('/users'))
        } else {
           UserService.updateUser(this.state.id, userDetails)
               .then(() => this.props.history.push('/users'))
        }

        console.log(values);
    }

    render() {

        let { 
            firstName,
            lastName,
            role,
            username,
            password } = this.state
        //let targetDate = this.state.targetDate

        return (
            <div>
                {this.state.id==-1 && <h1>Add User</h1>}
                {this.state.id!=-1 && <h1>Edit User</h1>}
                <div className="container">
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
                                    <fieldset>
                                        <label htmlFor="Roles" style={{ display: 'flex' }}> User Role </label>
                                        <Field  as="select" className="form-control"  name="role" >
                                                <option value="" label="Select a Role" />
                                                <option value="TEACHER" label="Teacher" />
                                                <option value="PUPIL" label="PUPIL" />
                                                <option value="ADMIN" label="ADMIN" />
                                        </Field>
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

                </div>
            </div>
        )
    }
}