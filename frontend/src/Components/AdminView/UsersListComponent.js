import { useMediaQuery } from "@material-ui/core";
import React,{ Component } from "react";
import UserService from "../../api/UserService";
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from "../../Authentication/AuthenticationService";
import CustomAlert from "../utility/Alerts/CustomAlerts";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';

import { CssBaseline } from '@material-ui/core';

export default class UsersListComponent extends Component{

    constructor(props){
        super(props)
        this.deleteUserById = this.deleteUserById.bind(this)
        this.refreshUsersList = this.refreshUsersList.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.exportPdf = this.exportPdf.bind(this)
        this.state={
            users:[
                //{id:1,name:'Lalit',role:'Admin',createdAt:new Date()},
              //  {id:2,name:'User 2',role:'Teacher',createdAt:new Date()},
              //  {id:3,name:'User 3',role:'Pupil',createdAt:new Date()}
            ],
            message:null,
            error:null
        }
        this.addUser = this.addUser.bind(this)
    }
    updateUser(id){ 

        console.log("update "+id);
        this.props.history.push(`/editUser/${id}`)

    }

    addUser(){
      this.props.history.push('/editUser/-1')
    }

    deleteUserById(id){ 
        UserService.executedeleteUserByIdService(id)
        .then(
              response=>{
                console.log(`delete user with id ${id}`)
                  console.log(response)
                  
                  this.setState({
                      message:`Deleted User With Id : ${id}`

                  })
                  
                  this.refreshUsersList();
                }
        ).catch(error=>{
            
           // console.log(error)
            this.setState({
                error:'User can not be deleted'
            })
                

        });
    }
    componentDidMount(){
        this.refreshUsersList();
    }
    refreshUsersList(){
        AuthenticationService.setupAxiosInterceptors(
            AuthenticationService.createJWTToken(
                localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
                )
        );

        UserService.executeRetrieveAllUsersService()
        .then(
          response=>{
              console.log(response.data)
              this.setState({
                  users:response.data
              })
          } 
        )

    }

   exportPdf(){
       UserService.executeExportUserToPDFService()
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
    onHide = () => {
            this.setState({
                error:null,
                message:null
            
            });
      }
      
    render(){
        return (
            <div className="root">
            <CssBaseline/>
            <Grid container spacing={3} direction="column"
            justify="center"
            alignItems="center"  >
            <Grid item xs={12}>
            <Paper elevation={3} className="paper">
                      <Box>
                <h1>Users:</h1> 
                {this.state.message && <CustomAlert errorMessage={this.state.message} severity='success' onCancel = {this.onHide}/>}
                 {this.state.error &&  <CustomAlert errorMessage={this.state.error} severity='error' onCancel = {this.onHide}/>}
                     <table className="table">
                     <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Delete</th>
                        <th>Update</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map(
                            user=> 
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.createdAt}</td>
                                <td><button className="btn btn-warning" onClick= {()=>{this.deleteUserById(user.id)}} >Delete</button></td>
                                <td><button className="btn btn-success" onClick= {()=>{this.updateUser(user.id)}} >Update</button></td>
                          
                            </tr>

                        )
                    }
                  
                </tbody>

            </table>
            <button className="btn btn-success"  style={{ position:"relative",left:5 ,marginRight:10}} onClick={this.addUser}>New User</button>
            <button className="btn btn-success"  style={{ position:"relative",right:5, marginLeft:10}} onClick={this.exportPdf}>Export</button>
            </Box>
            </Paper>
            </Grid>
           </Grid> 
        </div>
        
        );
    }
}