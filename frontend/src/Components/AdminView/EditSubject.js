import { Button} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import CourseService from '../../api/CourseService';
import SubjectService from '../../api/SubjectService';
import React,{ Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from "../../Authentication/AuthenticationService";
import { ContactlessOutlined } from '@material-ui/icons';
import CustomAlert from '../utility/Alerts/CustomAlerts';

export default class  EditSubject extends Component {
    constructor(props){
            super(props)
            this.state = {
                courseId:this.props.match.params.id,
                courseName:this.props.match.params.name,
                subId:this.props.match.params.subjectId,
                enteredSubjectName:'',
                subDesc :'',
                teacherID:'',
                teacherName:'',
                showError:false,
                errorMessage:''
            }

            this.onSubmit = this.onSubmit.bind(this)
            this.validate = this.validate.bind(this)
            this.onClose = this.onClose.bind(this)
            this.loadSubject = this.loadSubject.bind(this)

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
             
          this.loadSubject();
          
            
        }

        loadSubject()  {
            SubjectService.getSubjectDetailsByName(this.state.subId)
            .then(response=>{
               console.log('Response: '+response.data)

                    this.setState({
                        enteredSubjectName:response.data.subjectName,
                        subDesc: response.data.description==null?'No Description available':response.data.description,
                        teacherID: response.data.teacherId,
                        teacherName: `${response.data.teacher_firstName} ${response.data.teach_lastname}`

                    })
                    console.log(`In 1- description: ${this.state.subDesc} teacherID:${this.state.teacherID}`);  

            }).catch(error=>{console.log(error)});
            console.log(`Outside- description: ${this.state.subDesc} teacherID:${this.state.teacherID}`);
            
        }
        
       validate(values) {
        let errors = {}
            if (!values.subjectName) {
                errors.subjectName = 'Enter the Subject Name'
            } 
             if (!values.teacher) {
                errors.teacher = 'Select A Teacher'
            }
            if (!values.description) {
                errors.description = 'Enter the Description'
            } 
             if (!values.teacher) {
                errors.teacher = 'Select A Teacher'
            }

            return errors
    
        }

        
        onSubmit(values) {
            // let username = AuthenticationService.getLoggedInUserName()
     
           // console.log(values.subjectName+ ' '+values.description)
             let subjectDetails = {
                 subjectName: values.subjectName,
                 description:values.description
                 //targetDate: values.targetDate
             }

     
                console.log('Edit Subject Request: '+subjectDetails);
           
                SubjectService.editSubject(this.state.subId,subjectDetails).then(
                    response =>  {
                        console.log(response)
                        if(response.status==200){
                            this.onClose()
                        }
                        else{
                            this.setState({
                                showError:true,
                                errorMessage:'The Subject Could not be updated. Please try again!'
                            })
                        }
                            
                    }
                    
                ).catch(error =>  console.log(error))
            
     
           //  console.log(values);
         }
         
     onHide = () => {
            this.setState({
                    showError:false,
                    errorMessage:''
            })
    }
       
  
        render(){
        let courseName = this.state.courseName;
        let subjectName = this.state.enteredSubjectName;
        let description = this.state.subDesc;
        let teacher =this.state.teacherName;
        let teacherId = this.state.teacherID;
        console.log(teacher+ ' '+teacherId)
           return (

                <>       
                <center>
                         <div className="container">
                             
                             <h1>Edit Subjects</h1>
                             {this.state.showError &&  <CustomAlert errorMessage={this.state.errorMessage} severity='error' onCancel = {this.onHide}/>}
                            <Formik
                                enableReinitialize={true}
                                initialValues={{courseName,subjectName,description,teacher,teacherId}}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                
                            >
                            {
                            (props) => (
                                <Form>
                                    
                                    <ErrorMessage name="subjectName" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="teacher" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label style={{ display: 'flex',marginTop: 5,marginBottom:5 }}><b>Course Name:</b></label>
                                        <Field className="form-control" 
                                      //  value={this.state.courseName} 
                                        readOnly 
                                        type="text" 
                                        name="courseName" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label style={{ display: 'flex',marginTop: 5,marginBottom:5 }}><b>Subject Name:</b></label>
                                        <Field className="form-control" 
                                        //onChange={(event)=>this.setState({subjectName:event.target.value})} 
                                        //value={this.state.subId} 
                                        type="text" name="subjectName" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label style={{ display: 'flex',marginTop: 5,marginBottom:5 }}><b>Subject Description:</b></label>
                                        <Field className="form-control" 
                                        //onChange={(event)=>this.setState({subDesc:event.target.value})} 
                                        //value={this.state.subDesc==null?'No Description':this.state.subDesc} 
                                        type="text" name="description" />
                                    </fieldset>
                                    <fieldset>
                                        <label htmlFor="Teacher" style={{ display: 'flex',marginTop: 5,marginBottom:5 }}> <b>Lecturer Name:</b> </label>
                                        <Field className="form-control" 
                                        //value={this.state.teacherName} 
                                        readOnly type="text"   
                                        name="teacher" />
                                    </fieldset>
                                    <fieldset>
                                        <label htmlFor="Teacher ID" style={{ display: 'flex',marginTop: 5,marginBottom:5 }}> <b>Lecturer ID:</b> </label>
                                        <Field className="form-control" 
                                        //value={this.state.teacherID} 
                                        readOnly type="text" 
                                        name="teacherId" />
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
  