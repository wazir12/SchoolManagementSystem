import React,{Component} from 'react';
import CustomAlert from "../utility/Alerts/CustomAlerts";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { Button, InputBase, ListItem } from '@material-ui/core';
import './css/grid.css';
import { CssBaseline } from '@material-ui/core';

import TeacherService from '../../api/TeacherService';
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from '../../Authentication/AuthenticationService';

import DeleteIcon from '@material-ui/icons/Delete';
import { AddOutlined, ArchiveRounded, EditOutlined, PageviewOutlined, ThreeSixty } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import UpdateGradeModal from './EditGradeModal';
import SubjectService from '../../api/SubjectService';

export default class TestItemDetailsView extends Component{

  constructor(props){
    super(props)
    this.state ={
        subjectName:this.props.match.params.subjectName,
        testRecords:[],
        isArchived:'',
        showModal:false,
        showError:false,
        message:'',
        selectedPupilId:'',
        testId:this.props.match.params.id,
        testName:this.props.match.params.name
     
    }

    this.addTokentoAuthenticatioHeader = this.addTokentoAuthenticatioHeader.bind(this);
    this.loadPupilsByTestId = this.loadPupilsByTestId.bind(this);
    this.refresh = this.refresh.bind(this);
    this.editGrade = this.editGrade.bind(this);
    this.onHide = this.onHide.bind(this);
   this.showEditModal = this.showEditModal.bind(this);
  }
  onHide(){
    this.setState({
      showModal:false,
      selectedPupilId:'',
      
    })
    this.refresh();
  }

  editGrade(newValue){
      console.log(`Enterred Grade: ${newValue}`)
      this.addTokentoAuthenticatioHeader();
      TeacherService.updateTestRecordGrade(this.state.testId,this.state.selectedPupilId,newValue)
      .then(
          response=>{
              this.onHide();
              this.refresh();
              
        }).catch(error=>{
            console.log(error)
            this.onHide();
            this.refresh();
            this.setState({
                showError:true,
                message:'Grade Could not be editted'
            })

        })
  }

 
  componentDidMount(){
      this.refresh();
  }

  showEditModal(){
      this.setState({
          showModal:true
      })
  }
  refresh(){
    this.addTokentoAuthenticatioHeader();
    this.loadSubjectDetails();
    this.loadPupilsByTestId();
    

  }
  loadSubjectDetails(){

    SubjectService.getSubjectDetailsByName(this.state.subjectName).then(
      response=>{
        this.setState({
          isArchived:response.data.is_archived
        })
        console.log(this.state.subjectDetails)
      }
     
    ).catch(error=>console.log(error))
    
  }
    loadPupilsByTestId(){
      TeacherService.fetchAllPupilsWithGradesByTestId(this.state.testId).then(
          response=>{

            this.setState({
                testRecords:response.data
            })
              //this.refresh();
          }
      ).catch(error=>console.log(error))
    }
    addTokentoAuthenticatioHeader(){
        AuthenticationService.setupAxiosInterceptors(
             AuthenticationService.createJWTToken(
                localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
            )
        );
    }


    render(){
        return (
            <div className="root">
               {this.state.showError &&  <CustomAlert errorMessage={this.state.message} severity='error' onCancel = {()=>{
                   this.setState({
                       showError:false,
                       message:''
                   })
               }}/>}
           
              <CssBaseline/>
              <UpdateGradeModal
                    show={this.state.showModal}
                    onHide ={this.onHide}
                    onSubmit={this.editGrade}
              />
              <Grid container spacing={3} >
                <Grid item xs={12}>
                  <Paper className="paper" elevation={2}> 
                    <Box>
                        <table className="table">
                        <thead>
                            <tr>
                                <th>Pupil Id</th>
                                <th>Pupil Name</th>
                                <th>Test Id</th>
                                <th>Test Name</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.testRecords.map(
                            testRecords=> 
                                <tr>
                                    <td>{testRecords.pupilId}</td>
                                    <td>{`${testRecords.firstName} ${testRecords.lastName}`}</td>
                                    <td>{`${testRecords.testId}`}</td>  
                                    <td>{`${this.state.testName}`}</td>  
                                    <td>{`${testRecords.grade==null?0:testRecords.grade}`}</td>  
                                    {!this.state.isArchived && <td>
                                        <IconButton  onClick={()=>{
                                            this.setState({
                                                    selectedPupilId:testRecords.pupilId
                                            })
                                            this.showEditModal();
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