
import { Modal, ModalBody ,Button} from 'react-bootstrap';
import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import { Component } from 'react';
import TeacherService from '../../api/TeacherService';




export default class EditTest extends Component {

    constructor(props){
        super(props)
        this.state={
            subjectName: props.subjectName,
            enterredTestName: this.props.testName,
            showError: false,
            id: props.testId
        }
        this.handleTestNameFieldChanged = this.handleTestNameFieldChanged.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.editTest = this.editTest.bind(this);
        console.log(`Initiial Vallues:  ${this.state.enterredTestName}  ${this.state.id}`);

    }
    editTest(){
            console.log(`Props:   ${this.props.testName}, ${this.props.testId}`)
       console.log(`Inside Edit Test :  ${this.state.id} ${this.state.enterredTestName} ${this.state.subjectName}`)
        TeacherService.editTest(this.state.subjectName,this.props.testId,this.state.enterredTestName).then(
            response=>{
               
                this.props.onHide();
            }
        ).catch(error=>console.log(error))

    }

    handleTestNameFieldChanged(event) { 
        this.setState({
            enterredTestName:event.target.value 
        })          
    }
      
    
    submitHandler(){
        if(this.state.enterredTestName.length<4)
        {
            this.setState({
                showError:true
            })
            console.log(this.state.enterredTestName);
            this.setState({
                enterredTestName:''
            })
        }
        else{
            this.editTest();
        }
    
    }


    render(){
        return (
            <>
                <Modal show={this.props.show}
                onHide={this.props.onHide}>
                    <Modal.Header closeButton> Edit Test</Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            {this.state.showError && <Alert severity="error">Test Name should contain atleast 4 characters!</Alert>}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="testName"
                                label="Test Name"
                                name="testName"
                                value={this.state.enterredTestName}
                                onChange={this.handleTestNameFieldChanged}
                                autoFocus
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{
                            this.setState({
                                enterredTestName:''
                            },function(){
                                this.props.onHide();
                            })
                            
                            }}>
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