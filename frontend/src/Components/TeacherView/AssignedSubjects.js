import { Component } from "react";
import TeacherService from "../../api/TeacherService";
import UserService from "../../api/UserService";
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from "../../Authentication/AuthenticationService";
import CustomAlert from "../utility/Alerts/CustomAlerts";
import { Button} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { CssBaseline } from '@material-ui/core';
 export default class AssignedSubjectsList extends  Component{

    constructor(props){
        super(props)
        this.state = {
            activesubjects:[],
            archivedSubjects:[],
            courseName:'',
            message:'',
            username:this.props.match.params.name,
            teacherName:'',
            teacherDetails:{},
            error:false,
            success:false
        }

        this.loadTeacherIdByUsername = this.loadTeacherIdByUsername.bind(this);
        this.loadAssignedSubjects = this.loadAssignedSubjects.bind(this);
        this.onHide = this.onHide.bind(this);
        this.showSubject = this.showSubject.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount(){

       this.refresh();

      //  this.loadPupilsWithGrades();
    }
    refresh(){
        AuthenticationService.setupAxiosInterceptors(
            AuthenticationService.createJWTToken(
                localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
                )
        );
        this.loadTeacherIdByUsername();
    }
    loadTeacherIdByUsername(){

        UserService.fetchTeacherIDByUsername(this.state.username).then(
            response=>{

                    this.setState({
                        teacherDetails:response.data,
                        teacherName:`${response.data.firstName}  ${response.data.lastName}`
                        
                    })
                    console.log(this.state.teacherName)
                    this.loadAssignedSubjects();
            }
        ).catch(error=>{
            console.log.apply(error)
        })

    }
    

    loadAssignedSubjects(){
        let teacher_id =this.state.teacherDetails.teacherId;

        TeacherService.getAllActiveSubjectByTeacherID(teacher_id)
        .then(
            response => {
           
            this.setState({
                activesubjects:response.data
            })
            console.log(this.state.activesubjects)

        }).catch(error=>console.log(error))
        TeacherService.getAllArchivedSubjectsByTeacherId(teacher_id)
        .then(response=>{
            this.setState({
                archivedSubjects:response.data
            })
            console.log(this.state.archivedSubjects)
        }).catch(error=>console.log(error))
}

    onHide(){
        this.setState({
            message:'',
            error:false,
            success:false
        })
    }
    showSubject(subjectName){
        this.props.history.push(`/teacher/${this.state.teacherName}/subjectDetails/${subjectName}`);
    }

    render(){

        return (

            <div className="root">
            <CssBaseline/>
            <Grid container spacing={3} direction="row"
                  justify="center"
                  alignItems="center"  >
                      <Grid item xs={12}>
                     <Paper elevation={2} className="paper">
                         <Box>
                             <h1>Active Subjects:</h1> 
                            {this.state.error &&  <CustomAlert errorMessage={this.state.message} severity='error' onCancel = {this.onHide}/>}
                             <table className="table">
                                <thead>
                                 <tr>
                                    <th>Course Name</th>
                                    <th>Subject Name</th>
                                 </tr>
                                </thead>
                             <tbody>
                            {
                                
                                this.state.activesubjects.map(
                                    subject=> 
                                        <tr>
                                            <td>{subject.courseName}</td>
                                            <td>{subject.subjectName}</td>
                                                <Button variant="secondary" onClick={()=>{this.showSubject(subject.subjectName)}}>
                                                    View Details
                                                </Button>
                                         </tr>
        
                                )
                            
                            }
                  
                        </tbody>
                    </table>
                    </Box>
                  </Paper> 
                </Grid>   
                <Grid item xs={12}>
                     <Paper elevation={2} className="paper">
                         <Box>
                             <h1>Archived Subjects:</h1> 
                            {this.state.error &&  <CustomAlert errorMessage={this.state.message} severity='error' onCancel = {this.onHide}/>}
                             <table className="table">
                                <thead>
                                 <tr>
                                    <th>Course Name</th>
                                    <th>Subject Name</th>
                                 </tr>
                                </thead>
                             <tbody>
                            {
                                this.state.archivedSubjects.length>0?
                                this.state.archivedSubjects.map(
                                    subject=> 
                                        <tr>
                                            {subject.courseName!=null &&<td>{subject.courseName}</td>}
                                            <td>{subject.subjectName}</td>
                                                <Button variant="secondary" onClick={()=>{this.showSubject(subject.subjectName)}}>
                                                    View Details
                                                </Button>
                                         </tr>
        
                                ):'No Archived Subjects!'
                            }
                  
                        </tbody>
                    </table>
                    </Box>
                  </Paper> 
                </Grid>       
            </Grid>
        </div>
        
        );

    }
   
 }