
import { Modal, ModalBody ,Button} from 'react-bootstrap';
import React,{useState,useEffect, Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import CourseService from '../../api/CourseService';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import '../PupilList.css';
import AuthenticationService, { USER_TOKEN_ATTRIBUTE_NAME } from '../../Authentication/AuthenticationService';
import CustomAlert from "../utility/Alerts/CustomAlerts";
import CustomAlertWithTwoButtons from "../utility/Alerts/CustomAlertWithTwoButtons";



export default class SelectPupil extends Component  {


  constructor(props) {
    super(props)
    this.state = {
      showError :false,
      id:this.props.match.params.id,
      courseName:this.props.match.params.name,
      showWarning: false,
      message : null,
      showSuccess:false,
      pupils:[],
      checked : [0]

    }
  }
  //classes = useStyles();

  onClose= () => {

    this.props.history.push(`/admin/courses/${this.state.id}/${this.state.courseName}`)

}


  handleToggle = (value) => () => {
        //console.log("pressesd check box");
        const currentIndex = this.state.checked.indexOf(value);
        //console.log(currentIndex);
        const newChecked = [...this.state.checked];
       //console.log(newChecked);
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
       }
       this.setState({
         checked:newChecked
       }) 
    

  };
  onHide = () => {
    this.setState({
      message:null,
      showError:false,
      showWarning:false,
      showSuccess:false,

    })
  }
  onSave = () => {
    console.log(`OnSave - ${this.state.checked}`)
    this.state.checked.map((item,index)=>{
      if(index>0){
      if(item.courseId==null){
          CourseService.assignPupil(this.state.id,item.pupilId).then(
            (response)=>{
              if(response.status==200){
     //               setShowSuccess(true);
      //              setMessage(`The Pupil ${item.firstName} ${item.lastName} added to Course (id: ${item.courseId})`)
              }
             
            }
            
          ).catch(error=>{
            console.log(error);
           // setShowError(true);
            //setMessage(`Pupil Could not be added`);
     
          })
      }else{
          //setWarning(true);
         // setMessage('Pupil already assign to another course,Click agree to deassign from latter and assign to this course')
       
            CourseService.assignPupil(this.state.id,item.pupilId).then(
              (response)=>{
                
                if(response.status==200){
                    //  setShowSuccess(true);
                    //  setMessage(`The Pupil ${item.firstName} ${item.lastName} added to Course (id: ${item.courseId})`)

                }
                
               
              }
              
            ).catch(error=>{
              console.log(error);
       //       setShowError(true);
     //         setMessage(`Pupil Could not be added`);
       
            })
          
      }
    }
    
    });
   
  
    this.setState({
      checked:[0]
    })
    this.onHide();
   this.onClose();
    
  
   

  }

  toContinue = () => {

    this.setAgree(true);

  }

  componentDidMount() {
    
    this.setState({
      checked:[0]
    })
    AuthenticationService.setupAxiosInterceptors(
      AuthenticationService.createJWTToken(
          localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME)
          )
    );

    CourseService.getAllPupils()
        .then(
            response => {
    
            
              this.setState({
                pupils:response.data
              })
              
            console.log(this.state.pupils);
              
        });
  }

 
    
 
   render(){
    return (
     
          <div className="container">
          <h1>Select Pupil:</h1>
          {this.state.showSuccess && <CustomAlert errorMessage={this.state.message} severity='success' onCancel = {this.onHide}/>}
          {this.state.showError && <CustomAlert errorMessage={this.state.message} severity='error' onCancel = {this.onHide}/>}
          {this.state.showWarning && <CustomAlertWithTwoButtons errorMessage={this.state.message} severity='warning' 
          onAgree={this.toContinue} onCancel = {this.onHide}/>}
              <List>
               
       
                    {
                        this.state.pupils.map(
                            (pupil,index)=>{

                              if(pupil.courseId!=this.state.id){
                                const labelId = `checkbox-list-label-${pupil.pupilId}`;
                               return( 
                               <ListItem key={index} role={undefined} dense button onClick={this.handleToggle(pupil)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checked.indexOf(pupil) != -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={` ${pupil.firstName+' '+ pupil.lastName}`} />
                                
                                </ListItem>
                               )
                              }

                            }
                           
       
                                
                        )
                    }
                   
           
            </List>
          <div style={{display:'inline-block',float:'right',padding:10}}>
              <Button variant="secondary" style={{marginBottom:10,marginRight:10,padding:10,marginTop:10}} onClick={this.onClose}>
                Close
              </Button>
              <Button variant="primary" style={{marginBottom:10,marginRight:10,padding:10,marginTop:10}} onClick={this.onSave}>
                Save Changes
              </Button>
          </div>
      </div>
       
      
        
);


   }
    
  }