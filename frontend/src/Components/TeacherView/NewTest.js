
import { Modal, ModalBody ,Button} from 'react-bootstrap';
import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import { Component } from 'react';
import TeacherService from '../../api/TeacherService';




export default class NewTest extends Component {

    constructor(props){
        super(props)
        this.state={
            subjectName:props.subjectName,
            enterredTestName:'',
            showError:false
        }
        this.handleTestNameFieldChanged = this.handleTestNameFieldChanged.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.addTest = this.addTest.bind(this);
        console.log(`${this.state.enterredTestName}  ${this.state.testId}`);

    }
    componentDidMount(){
        console.log(`Initial Test Name: ${this.state.enterredTestName}`)
        this.setState({
            enterredTestName:this.props.selectTestName
        })
    }


  handleTestNameFieldChanged(event) { 
    this.setState({
        enterredTestName:event.target.value 
    }
        
    )          
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
      
            this.addTest();
        
    
    }
    
}

addTest(){

    let test = {
        testname:this.state.enterredTestName
    }
    TeacherService.addTest(this.state.subjectName,test)
                    .then(response=>{
                        this.setState({
                            showError:false,
                            enterredTestName:''
                        })
                        this.props.onHide();
                        console.log(response)
                    })
                    .catch(error=>console.log(error))

}
render(){
    return (

     <>
          <Modal show={this.props.show}
                onHide={this.props.onHide}
            
          >
            <Modal.Header closeButton> 
               New Test
            </Modal.Header>
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
  