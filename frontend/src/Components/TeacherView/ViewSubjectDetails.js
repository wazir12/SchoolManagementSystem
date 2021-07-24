import React,{Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { Button, InputBase, ListItem } from '@material-ui/core';
import './css/grid.css';
import { CssBaseline } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import TeacherService from '../../api/TeacherService';
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from '../../Authentication/AuthenticationService';
import PageviewSharpIcon from '@material-ui/icons/PageviewSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddOutlined, ArchiveRounded, EditOutlined, PageviewOutlined, PictureAsPdf } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import NewTest from './NewTest';
import EditTest from './EditTest';
import SubjectService from '../../api/SubjectService';

export default class SubjectDashboard extends Component{

  constructor(props){
    super(props)
    this.state ={
      test_name:'',
      test_id:'',
      showEditTestModal:false,
      subjectName:this.props.match.params.subjectName,
      teacherName:this.props.match.params.name,
      showModal:false,
      subjectDetails:{},
      pupils:[],
      tests:[]
    }
    this.loadPupilsBySubjectID = this.loadPupilsBySubjectID.bind(this);
    this.loadSubjectDetails = this.loadSubjectDetails.bind(this);
    this.addTokentoAuthenticatioHeader = this.addTokentoAuthenticatioHeader.bind(this);
    this.loadAllTestBySubjectName = this.loadAllTestBySubjectName.bind(this);
    this.onHide = this.onHide.bind(this);
    this.showNewTestModal = this.showNewTestModal.bind(this);
    this.refresh = this.refresh.bind(this);
    this.onHideEditTestModal = this.onHideEditTestModal.bind(this);
    this.delete = this.delete.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
    this.exportPdf = this.exportPdf.bind(this);
  }
  
  viewDetails(id,testName,subjectName){
    this.props.history.push(`/test/subject/${subjectName}/${id}/${testName}`);
  }
  onHide(){
    this.setState({
      showModal:false,
    })
    this.refresh();
  }

  showNewTestModal(){
    this.setState({
      showModal:true
    })
  }
  componentDidMount(){
      this.refresh();
  }
  refresh(){
    this.addTokentoAuthenticatioHeader();
    this.loadSubjectDetails();
    this.loadPupilsBySubjectID();
    this.loadAllTestBySubjectName();
    
  }
  addTokentoAuthenticatioHeader(){
    AuthenticationService.setupAxiosInterceptors(
      AuthenticationService.createJWTToken(
          localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
          )
  );
  }
  loadAllTestBySubjectName(){
    TeacherService.fetchAllTestsBySubjectName(this.state.subjectName)
    .then(response=>{
       this.setState({
         tests:response.data
       })

    })
    .catch(error=>console.log(error))
  }

  loadSubjectDetails(){

    SubjectService.getSubjectDetailsByName(this.state.subjectName).then(
      response=>{
        this.setState({
          subjectDetails:response.data
        })
        console.log(this.state.subjectDetails)
      }
     
    ).catch(error=>console.log(error))
    
  }

 delete(testId){

    console.log(`${testId}`);
    TeacherService.deleteTest(testId).then(
      response=>{
        this.refresh();
      }
    ).catch(error=>console.log(error))
 }

 

  loadPupilsBySubjectID(){
    TeacherService.getAllPupilsWithGrades(this.state.subjectName).then(response=>{
      this.setState({
      pupils:response.data
      })
    }).catch(error=>{
      console.log(error);
    })
  }

  onHideEditTestModal(){
      this.setState({
        showEditTestModal:false,
        test_name:''
      })
      this.refresh();
  }

  exportPdf(){
    TeacherService.exportPupilListWithAverageGrade(this.state.subjectName)
       .then(response => {
           console.log(response);
         const filename =   response.headers['content-disposition'].split('filename=')[1];
         console.log("FileName: "+filename);
         const blob = new Blob([response.data],{type:response.data.type});
         const url = window.URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.setAttribute('download', filename); //or any other extension
         document.body.appendChild(link);
         link.click();
         link.remove();
         window.URL.revokeObjectURL(url);

         
        
    });
   }

    render(){
        return (
            <div className="root">
              <NewTest
                  show={this.state.showModal}
                  subjectName={this.state.subjectName}
                  onHide={this.onHide}
              />
               <EditTest
                  show={this.state.showEditTestModal}
                  subjectName={this.state.subjectName}
                  onHide={this.onHideEditTestModal}
                  testId={this.state.test_id}
                  testName={this.state.test_name}
              />
              <CssBaseline/>
              <Grid container spacing={3} direction="row"
                    justify="center"
                    alignItems="center"  >
                <Grid item xs={4}>
                  <Paper elevation={3} className="paper">
                      <Box>
                          <Typography variant='h5' className="heading">{this.state.subjectName}</Typography>
                          <Typography variant ='subtitle1' className="subtext"><b>Tutor: </b>{this.state.teacherName}</Typography>
                          <Typography variant ='subtitle2' align="left" className="subtext"><b>Description: </b>
                          {this.state.subjectDetails.description==null?'No Description':this.state.subjectDetails.description}</Typography>
                          <Typography variant ='subtitle2' align="left" className="subtext"><b>Archived: </b>{this.state.subjectDetails.is_archived==true?'Yes':'No'}</Typography>
                          
                      </Box>

                  </Paper>
                </Grid>
                <Grid item xs={8}>
                  <Paper elevation={2} className="paper">
                    <Box>
                    <table className="table">
                    <thead>
                      <tr>
                        <th>Pupil Id</th>
                        <th>Pupil Name</th>
                        <th>Avg Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                    this.state.pupils.length==0?
                       
                            <Typography variant="h6" align="center">No Pupils are Assigned to this Subject!</Typography>   
                           
                            :
                        this.state.pupils.map(
                            pupil=> 
                            <tr>
                                <td>{pupil.pupilId}</td>
                                <td>{`${pupil.pupilFirstName}  ${pupil.pupilLastName}`}</td>
                                <td>{pupil.avgGrade==null?0:pupil.avgGrade}</td>  
                            </tr>
        
                        )
                    }
                    </tbody>
                    </table>
                   </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className="paper" elevation={2}>
           
                           {!this.state.subjectDetails.is_archived && <Button 
                            style={{float:'right',marginTop:10,marginRight:10,marginBottom:10,}}  
                            startIcon={<AddOutlined />} color="primary" variant="contained"  
                            onClick={this.showNewTestModal}
                            >
                              Add Test </Button>}
                      
                    <Box>
                    <table className="table">
                    <thead>
                      <tr>
                        <th>Test Id</th>
                        <th>Test Name</th>
                        <th>createdAt</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.tests.map(
                            test=> 
                            <tr>
                                <td>{test.id}</td>
                                <td>{`${test.testName}`}</td>
                                <td>{`${test.createdAt}`}</td> 
                                {!this.state.subjectDetails.is_archived && <td>
                                <IconButton  onClick={()=>this.delete(test.id)}>
                                    <Tooltip title="Delete Test">
                                        <DeleteIcon/>
                                    </Tooltip>
                                </IconButton>  
                                </td>}
                                <td>
                                <IconButton  onClick={()=>this.viewDetails(test.id,test.testName,this.state.subjectName)}>
                                    <Tooltip title="View Details of this test!">
                                        <PageviewSharpIcon/>
                                    </Tooltip>
                                </IconButton> 
                                </td>
                               {!this.state.subjectDetails.is_archived && <td>
                                   <IconButton  onClick={()=>{
                                  let id =test.id;
                                  let name= test.testName;
                                  console.log(`Icon Button:${id} ${name}`)
                                     this.setState({
                                      test_id: id,
                                      test_name: name
                                     },function(){
                                      console.log(`Icon Button: checking state: ${this.state.test_id} ${this.state.test_name}`)
                                        this.setState({
                                          showEditTestModal:true
                                        })
                                     })

                                }}>
                                    <Tooltip title="Edit">
                                        <EditOutlined/>
                                    </Tooltip>
                                </IconButton>
                                </td>}
                            </tr>
        
                        )
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