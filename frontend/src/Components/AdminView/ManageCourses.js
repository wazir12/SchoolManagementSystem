import { ThreeSixtyOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React,{ Component } from "react"
import CourseService from "../../api/CourseService";
import "./courses.css";
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import NewCourse from './NewCourse';
import CustomAlert from "../utility/Alerts/CustomAlerts";
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from "../../Authentication/AuthenticationService";
import EditCourse from "./EditCourse";

export default class ManageCourses extends Component{

    constructor(props){
        super(props)
        this.state={
            courses:[],
            selectedCourseId:'',
            selectedCourse:'',
            showModal:false,
            showEditModal:false,
            message:null,
            errorMessage:null
        }
        this.clickHandler = this.clickHandler.bind(this)
        this.setModalShow = this.setModalShow.bind(this)
        this.addCourse = this.addCourse.bind(this)
        this.setEditModalShow = this.setEditModalShow.bind(this);
        this.onEditCourse = this.onEditCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        
        
    }
    

    addCourse(){
       this.setModalShow()
      //this.props.history.push('/editUser/-1')
    }
    onEditCourse(){
        this.setEditModalShow()
    }
    updateCourse(newCourseName){
        CourseService.editCourse(this.state.selectedCourseId,newCourseName).then(
            response=>{
                this.setEditModalShow();
            }
        ).catch(error=>console.log(error))
    }
    setEditModalShow(){
        if(this.state.showEditModal){
            this.setState({
                    showEditModal:false
            })
            this.refreshCoursesList();
       }
       else{
                this.setState({
                    showEditModal:true
                }) 
       }
    }

    
    componentDidMount(){
        this.refreshCoursesList();
    }
    refreshCoursesList= () => {
        AuthenticationService.setupAxiosInterceptors(
            AuthenticationService.createJWTToken(
                localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
                )
        );
        CourseService.executeRetrieveAllCoursesService()
        .then(
          response=>{
              console.log(response.data)
              this.setState({
                  courses:response.data
              })
          } 
        )

    }

   setModalShow(){
       if(this.state.showModal){
            this.setState({
                    showModal:false
            })
            this.refreshCoursesList();
       }
       else{
                this.setState({
                    showModal:true
                }) 
       }
       

   }

  onDelete = (id) => {
            
                CourseService.executeDeleteCourseById(id).then(response=>{
                  console.log(response.data); 
                  this.refreshCoursesList();

            }).catch(error => {
                    this.setState({
                        errorMessage:'The Course Can not be deleted!'
                    })
            });


   }

   onHide = () => {
       this.setState({
           errorMessage:null
       })
   }
        
    clickHandler(courseId,name){

        this.props.history.push(`/admin/courses/${courseId}/${name}`)

    }
   
    render(){
       
        return (
            <>
            {
                this.state.errorMessage!=null && 
                <CustomAlert errorMessage={this.state.errorMessage} severity='error' onCancel = {this.onHide}/>
                    
            }
         <NewCourse
            show={this.state.showModal}
            onHide={this.setModalShow}/>

            <EditCourse
            show={this.state.showEditModal}
            onHide={this.setEditModalShow}
            courseName={this.state.selectedCourse}
            onUpdate ={this.updateCourse}
            />
            <div className="container">
                <div className="scroller">
                     <table className="table">
                        <thead>
                            <tr>
                                <th>Course Id</th>
                                <th>Course Name</th>
                            </tr>
                         </thead>
                         <tbody>
                            {
                                this.state.courses.map(
                                    (course,index)=> 
                                    <tr key={index}>
                                        <td>{course.courseId}</td>
                                        <td>{course.courseName}</td>
                                        <td><button className="btn btn-warning" onClick= {()=>{this.onDelete(course.courseId)}}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick= {()=>{
                                            this.setState({
                                                selectedCourse:course.courseName,
                                                selectedCourseId:course.courseId
                                            },()=> this.onEditCourse())
                                           
                                            }} >Update</button></td>
                                        <td><button className="btn btn-success" onClick= {()=>{this.clickHandler(course.courseId,course.courseName)}} >View Details</button></td>   
                                    </tr>

                                )       
                            }
                        </tbody>

                    </table>
                    <button className="btn btn-success"  
                            style={{ position:"relative",left:5 ,marginRight:10}} 
                            onClick={this.addCourse}>
                                New Course
                    </button>
                </div>
            </div>
       </>


        );
    }
    

}