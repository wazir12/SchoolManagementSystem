import React,{Component} from 'react'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import { Button, InputBase, ListItem } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import TeacherService from '../../api/TeacherService';
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from '../../Authentication/AuthenticationService';
import PageviewSharpIcon from '@material-ui/icons/PageviewSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddOutlined, ArchiveRounded, ArrowRight, EditOutlined, PageviewOutlined, Refresh } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PupilService from '../../api/PupilService';

export default class PupilDashboard extends Component{

    constructor(props){
        super(props)
        this.state ={
           id:'',
            testRecords:[],
            username:this.props.match.params.name
            
        }
        this.loadPupilIdByUsername = this.loadPupilIdByUsername.bind(this);
        this.loadPupilSubjectsWithAvgGrades = this.loadPupilSubjectsWithAvgGrades.bind(this);
        this.refresh = this.refresh.bind(this);
        this.viewDetails = this.viewDetails.bind(this);
   
    }
    componentDidMount(){
        this.refresh()
    }

    refresh(){
        AuthenticationService.setupAxiosInterceptors(
            AuthenticationService.createJWTToken(
                localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
                )
        );
        this.loadPupilIdByUsername()
      //  this.loadPupilSubjectsWithAvgGrades()
    }

    loadPupilIdByUsername(){
        PupilService.fetchPupilDetailsByPupilUsername(this.state.username).then(
            response=>{
                this.setState({
                    id:response.data.pupilId
                },()=>this.loadPupilSubjectsWithAvgGrades())
                console.log(response.data.pupilId)
            }
        ).catch(error=>console.log(error))
    }

    loadPupilSubjectsWithAvgGrades(){
        console.log(this.state.id)
        PupilService.fetchAssignedSubjectWithAvgGrades(this.state.id).then(
            response=>{
                this.setState({
                    testRecords:response.data
                })
                console.log(this.state.testRecords)
            }
        )
    }
  
    viewDetails(subjectName){
         this.props.history.push(`/${this.state.id}/subjectView/${subjectName}`)   
    }

    render(){
        return (
            <div className="root">
              
              <CssBaseline/>
              <Grid container spacing={1} >
                <Grid item xs={12}>
                  <Paper elevation={2} className="paper">
                    <Box>
                    <table className="table">
                    <thead>
                      <tr>
                        <th>Subject Name</th>
                        <th>Average Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                       this.state.testRecords.map(
                            testRecord => 
                             <tr>
                                <td>{testRecord.subjectName}</td>
                                <td>{testRecord.grade==null?0:testRecord.grade}</td>
                                <td>
                                    <IconButton onClick={()=>this.viewDetails(testRecord.subjectName)}>
                                        <Tooltip title="Click To View Details..">
                                            <ArrowRight/> 
                                        </Tooltip>
                                    </IconButton>
                                </td>
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