import { Component } from "react";
import TeacherService from "../../api/TeacherService";
import UserService from "../../api/UserService";
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from "../../Authentication/AuthenticationService";
import CustomAlert from "../utility/Alerts/CustomAlerts";
 
 export default class PupilList extends  Component{

    constructor(props){
        super(props)
        this.state = {
            pupils:[],
            message:'',
            username:this.props.match.params.name,
            teacherDetails:{},
            error:false,
            success:false
        }

        this.loadTeacherIdByUsername = this.loadTeacherIdByUsername.bind(this);
        this.loadPupilsWithGrades = this.loadPupilsWithGrades.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentDidMount(){

        AuthenticationService.setupAxiosInterceptors(
            AuthenticationService.createJWTToken(
                localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
                )
        );
        this.loadTeacherIdByUsername();

      //  this.loadPupilsWithGrades();
    }
    loadTeacherIdByUsername(){

        UserService.fetchTeacherIDByUsername(this.state.username).then(
            response=>{
                    this.setState({
                        teacherDetails:response.data,
                    })
                    console.log(this.state.teacherDetails.teacherId)
                    this.loadPupilsWithGrades();
            }
        ).catch(error=>{
            console.log.apply(error)
        })

    }

    loadPupilsWithGrades(){
        let teacher_id =this.state.teacherDetails.teacherId;
        TeacherService.getAllPupilsWithGrades(teacher_id).then(
            response => {
           
            this.setState({
                pupils:response.data
            })
            console.log(this.state.pupils)

        })
}

    onHide(){
        this.setState({
            message:'',
            error:false,
            success:false
        })
    }

    render(){

        return (

            <div className="container"> 
            <h1>Pupils With Test Results:</h1> 
            {this.state.error &&  <CustomAlert errorMessage={this.state.message} severity='error' onCancel = {this.onHide}/>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Pupil Name</th>
                        <th>Subject Name</th>
                        <th>Avg Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.pupils.map(
                            pupil=> 
                            <tr>
                                <td>{`${pupil.pupilFirstName}  ${pupil.pupilLastName}`}</td>
                                <td>{pupil.subjectName}</td>
                                <td>{pupil.courseName}</td>
                                <td>{pupil.avgGrade}</td>  
                            </tr>
        
                        )
                    }
                  
                </tbody>
        
            </table>
        
        </div>
        
        );

    }
   
 }