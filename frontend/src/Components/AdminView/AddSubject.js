import { Button} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import CourseService from '../../api/CourseService';
import SubjectService from '../../api/SubjectService';
import React,{ Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from "../../Authentication/AuthenticationService";

export default class  AddSubject extends Component {

        constructor(props){
            super(props)

            this.state = {
                courseId:this.props.match.params.id,
                courseName:this.props.match.params.name,
                subId:this.props.match.params.subjectId,
                enteredDescription:'',
                enteredSubjectName: null,
                selectedTeacher:'',
                allTeachers :[]
            }

            this.onSubmit = this.onSubmit.bind(this)
            this.validate = this.validate.bind(this)
            this.onClose = this.onClose.bind(this)

        }

        onClose(){

            this.props.history.push(`/admin/courses/${this.state.courseId}/${this.state.courseName}`)

        }

        componentDidMount() {
            AuthenticationService.setupAxiosInterceptors(
                AuthenticationService.createJWTToken(
                    localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
                    )
            );
            if (this.state.subId === 'new') {           
                SubjectService.getAllTeachers().then(
                    (response)=>{
                        this.setState({
                            allTeachers:response.data
                        })
                        console.log(this.state.allTeachers)
                    }
                ).catch(error=>{
                console.log(error);
                })
            }
        }
        
       validate(values) {
        let errors = {}
            if (!values.subjectName) {
                errors.subjectName = 'Enter the Subject Name'
            } 
             if (!values.teacher) {
                errors.teacher = 'Select A Teacher'
            }
            return errors
    
        }

        
        onSubmit(values) {
            // let username = AuthenticationService.getLoggedInUserName()
     
             let subjectDetails = {
                 subjectName: values.subjectName,
                 subjectDescription:values.description,
                 teacherId:values.teacher
                 
                 //targetDate: values.targetDate
             }
     
                console.log(subjectDetails);
            if (this.state.subId == 'new') {
                SubjectService.addSubject(this.state.courseId,subjectDetails).then(
                    response => 
                        this.onClose()
                ).catch(error =>  console.log(error))
             } else {
                //UserService.updateUser(this.state.id, userDetails)
                  //  .then(() => this.props.history.push('/users'))
             }
     
             console.log(values);
         }
  
        render(){
            let { 
                subjectName,
                courseName

             } = this.state
            return (

                <>
                <center>
                         <div className="container">
                            <Formik
                                 initialValues={{ subjectName, courseName}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                            {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="subjectName" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="teacher" component="div"
                                        className="alert alert-warning" />
                                 
                                    <fieldset className="form-group">
                                        <label style={{ display: 'flex',marginTop: 5,marginBottom:5 }}><b>Subject Name:</b></label>
                                        <Field className="form-control"  type="text" name="subjectName" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label style={{ display: 'flex',marginTop: 5,marginBottom:5 }}><b>Course Name:</b></label>
                                        <Field className="form-control" readOnly type="text" name="courseName" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label style={{ display: 'flex',marginTop: 5,marginBottom:5 }}><b>Subject Description:</b></label>
                                        <Field className="form-control" 
                                        type="text" name="description" />
                                    </fieldset>
                                    <fieldset>
                                        <label htmlFor="Teacher" style={{ display: 'flex',marginTop: 5,marginBottom:5 }}> <b>Lecturers:</b> </label>
                                        <Field  as="select" className="form-control"  name="teacher" >
                                                <option value="" label="Select a Teacher" />
                                                {
                                                    this.state.allTeachers.map
                                                    ((item,index)=>
                                                           // console.log(index +' '+item)
                                                            <option 
                                                                value={item.teacherId} 
                                                                label={item.firstName +' ' +item.lastName} />
                                                )}
                                               
                                             
                                        </Field>
                                    </fieldset>
                                   
                                    <button className="btn btn-success" type="submit">Save</button>
                                    <Button variant="secondary" onClick={this.onClose}>
                                        Close
                                    </Button>
                                </Form>
                            )}   
                            </Formik>

                         </div>
                         </center>
                     
                </>
           
               );
        }
}
  