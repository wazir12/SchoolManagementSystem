import { Button, InputBase, ListItem } from '@material-ui/core';
import {Component} from 'react';
import CourseService from '../../api/CourseService';
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from '../../Authentication/AuthenticationService';
import ListCardItem from '../ListCardItem';
import SearchBar from '../utility/SearchBar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { CssBaseline } from '@material-ui/core';
import '../PupilList.css';
import SelectPupil from './SelectPupilModal';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddOutlined, ArchiveRounded, EditOutlined, PageviewOutlined } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArchiveIcon from '@material-ui/icons/Archive';

import AddSubject from './AddSubject';
import SubjectService from '../../api/SubjectService';
import CustomAlert from '../utility/Alerts/CustomAlerts';



export default class CourseDetails extends Component{

    
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            courseName:this.props.match.params.name,
            courseDetials:[],
            pupils:[],
            showModal:false,
            message:null,
            alertMessage:'',
            showSuccess:false,
            showError:false,
            showAddSubject:false
        }
        
    }
    componentDidMount(){
        this.refreshSubjects();
        
    }

   


    refreshSubjects = () => {

        AuthenticationService.setupAxiosInterceptors(
            AuthenticationService.createJWTToken(
                localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
                )
        );

        this.getAllPupilsByCourseId(this.state.id);

        CourseService.executeCourseById(this.state.id).then(
          response=>{
              console.log('Subjects: '+response.data)
            
              this.setState({
                  courseDetials:response.data,
                  
                  //subjects:response.data.subjects
              })
              console.log(this.state.courseDetials);
        });

    }

    setModalShow = ()=>{

        this.props.history.push(`/courses/${this.state.id}/${this.state.courseName}/pupils`);
       
    
    }

    getAllPupilsByCourseId = (courseId) => {

        CourseService.executeAllPupilByCourseId(courseId)
        .then(
            response => {
                    this.setState({
                        pupils:response.data,
                    })
                    console.log(this.state.pupils);
            }
        )

    }

    deAssignPupilFromCourse = (courseId,pupilId) =>{

        console.log("CourseId :"+courseId+" pupilId: "+pupilId);
        CourseService.deAssignPupil(courseId,pupilId).then(
            (response) => {
                console.log(response);
               // if(response.status==200){
                    this.refreshSubjects();
               // }
            }
        )

    } 

    deleteSubject = (courseId,subjectName)=>{
        console.log("deleteSubject");
            CourseService.deleteSubjectbyId(courseId,subjectName).then(
                (response) => {
                    console.log(response.data);
                    this.refreshSubjects();
                }
            ).catch(error=>{
                console.log(error);
            });
            

    }



    

    setShowAddSubject = () =>{
       
        const subId ='new'
        
        this.props.history.push(`/courses/${this.state.id}/${this.state.courseName}/add/${subId}`)
       
       
    }
    archiveSubject = (name)=>{
            let requestBody={
                archiveStatus:true,
                subjectName:name
            }

            SubjectService.archiveSubject(requestBody).then(
                response =>{
                    //console.log(response.statusText+' '+response.status)
                   
                    this.setState({
                        showSuccess: true,
                        alertMessage:'Subject is Archived!'
                    })

                    this.refreshSubjects();
                       
                    
                }
            ).catch(error=>{
                this.setState({
                    showError:true,
                    alertMessage:"This Subject Can not be Archived"
                })
            })
    }

   onHide = ()=>{
       this.setState({
           showError:false,
           showSuccess:false,
           alertMessage:''
    })
   }
    render(){
       
        return (
            <>
          
          <div className="root">
              <CssBaseline/>
              <Grid container spacing={3} direction="row"
                    justify="center"
                    alignItems="center"  >
                <div className="scroller">
                {this.state.showError && <CustomAlert errorMessage={this.state.alertMessage} severity='error' onCancel = {this.onHide}/>}
                {this.state.showSuccess && <CustomAlert errorMessage={this.state.alertMessage} severity='success' onCancel = {this.onHide}/>}
                    <Grid item xs={12}>
                     <Paper elevation={2} className="paper">
                         <Box>
                        <h2>{this.state.courseName}</h2>
                        
                        <div className="containter">
                            <Button 
                            style={{display:'flex',float:'right'}}  
                            startIcon={<AddOutlined />} color="primary" variant="contained"  
                            onClick={this.setModalShow}>Add Pupil</Button>
                        </div>
                        <ul className="pupilList">
                        {
                            
                            this.state.pupils.length==0?<h3>No Pupils Assigned Yet!!</h3>:
                            this.state.pupils.map(
                                (pupil,index)=>
                                <ListCardItem 
                                    key={index} 
                                    name={pupil.firstName +' '+pupil.lastName} 
                                    avgGrade ={pupil.avgGrade} 
                                    onDeAssign={()=>this.deAssignPupilFromCourse(this.state.id,pupil.pupilId)}/>
                            )
                        }
                        </ul>
                        </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Paper elevation={2} className="paper">
                         <Box>
                        <h3>List Of Subjects: </h3>
                            <table className="table">
                            <thead>
                                <tr>
                                    <th>Course Id</th>
                                    <th>Subject Name</th>
                                    <th>Is Archived</th>
                                    <th>Lecturer Name</th>
                                    <th className = "addSubject">
                                    <IconButton onClick = {this.setShowAddSubject}>
                                        <Tooltip title="Add New Subject">
                                          <AddOutlined/>
                                        </Tooltip>
                                    </IconButton>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                 {
                                    this.state.courseDetials.map(
                                        (c, index) => 
                                            <tr key= {index}>
                                                <td>{c.courseId}</td>
                                                <td>{c.subjectName}</td>
                                                <td>{c.archived?'Yes' :  
                                                <IconButton onClick={()=>this.archiveSubject(c.subjectName)}>
                                                    <Tooltip title="Archive Subject">
                                                        <ArchiveRounded/>
                                                    </Tooltip>
                                                </IconButton>  }
                                                </td> 
                                                <td>{c.teacherFirstName }  {c.teacherLastName}</td> 
                                            <td>
                                           {!c.archived && <IconButton onClick={()=>this.deleteSubject(c.courseId,c.subjectName)}>
                                                <Tooltip title="Delete">
                                                    <DeleteIcon/>
                                                </Tooltip>
                                            </IconButton> }
                                            </td>
                                            <td>
                                            {!c.archived && <IconButton onClick={()=>{this.props.history.push(`/course/${this.state.id}/${this.state.courseName}/edit/${c.subjectName}`)}}>
                                                <Tooltip title="Edit">
                                                    <EditOutlined/>
                                                </Tooltip>
                                            </IconButton> } 
                                            </td>
                                        
                                        </tr>

                                )       
                            }
                        </tbody>

                    </table>
                    </Box>
                    </Paper>
                </Grid>
               </div>
              </Grid> 
                
            </div>
            </>
   


        );
    }

}