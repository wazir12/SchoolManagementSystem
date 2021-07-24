import { Modal, ModalBody ,Button} from 'react-bootstrap';
import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import { Component } from 'react';
import TeacherService from '../../api/TeacherService';

export default class UpdateGradeModal extends Component{
    constructor(props){
        super(props)
        this.state={
           enteredGrade:'',
           showError:false
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.handleGradeFieldChanged = this.handleGradeFieldChanged.bind(this);
    }

    componentDidMount(){
        this.setState({
            enteredGrade:'',
            showError:false
        })
    }

    handleGradeFieldChanged(event) { 
        this.setState({
            enteredGrade:event.target.value 
        })          
      }
      
      submitHandler(){
        if(this.state.enteredGrade.length==0)
        {         
            this.setState({
                showError:true
            })
     
        }
        else{
            let newGrade = this.state.enteredGrade;
            this.setState({
                enteredGrade:''
            })
           this.props.onSubmit(newGrade);
        }
        
    }

    render(){
        return(
            <>
            <Modal show={this.props.show}
                  onHide={this.props.onHide}
                  
            >
              <Modal.Header closeButton> 
                 Add / Edit Grade
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                    {this.state.showError && <Alert severity="error">Please Enter the grade!</Alert>}
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="grade"
                      label="grade"
                      name="grade"
                      value={this.state.enteredGrade}
                      onChange={this.handleGradeFieldChanged}
                      autoFocus
                    />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onHide}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.submitHandler}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
       </>

        );

    }
}