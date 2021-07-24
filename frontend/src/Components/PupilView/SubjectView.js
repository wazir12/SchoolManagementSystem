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

export default class PupilSubjectView extends Component{

    constructor(props){
        super(props)
        this.state ={
           id:'',
            tests:[],
            pupilId:this.props.match.params.pupilId,
            subjectName:this.props.match.params.subjectName
            
        }
        this.refresh = this.refresh.bind(this);
        this.loadTestsBySubjectId = this.loadTestsBySubjectId.bind(this);
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
        this.loadTestsBySubjectId();
    }

    loadTestsBySubjectId(){
        PupilService.fetchAllTestsForSelectedSubject(this.state.pupilId,this.state.subjectName).then(
            response=>{
                this.setState({
                    tests:response.data
                })
                console.log(response.data.pupilId)
            }
        ).catch(error=>console.log(error))
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
                        <th>Test Id</th>
                        <th>Test Name</th>
                        <th>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                       this.state.tests.map(
                            test => 
                             <tr>
                                <td>{this.state.subjectName}</td>
                                <td>{test.testId}</td>
                                <td>{test.testName}</td>
                                <td>{test.grade==null?0:test.grade}</td>
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