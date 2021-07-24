
import { Modal, ModalBody ,Button} from 'react-bootstrap';
import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { Alert } from '@material-ui/lab';
import CourseService from '../../api/CourseService';




export default function EditCourse(props) {
  const [enteredCourseName,setCourseName] = useState(props.courseName);
  const [showError,setShowError] = useState(false);
  const handleCourseNameFieldChanged = (event) => { 
    setCourseName(event.target.value);            
  }
 
  const submitHandler = () => {
  
    

    if(enteredCourseName.length<4)
    {
      setShowError(true);
      console.log(enteredCourseName);
      setCourseName('');
 
    }
    else{
      setShowError(false);
      let newCourseName=enteredCourseName;
       props.onUpdate(newCourseName);
    }
    
}
    return (

     <>
          <Modal show={props.show}
                onHide={props.onHide}
          >
            <Modal.Header closeButton> 
                Edit Course
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                  {showError && <Alert severity="error">Course Name should contain atleast 4 characters!</Alert>}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="courseName"
                    label="Course Name"
                    name="courseName"
                    value={enteredCourseName}
                    onChange={handleCourseNameFieldChanged}
                    autoComplete="username"
                    autoFocus
                  />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
              <Button variant="primary" onClick={submitHandler}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
     </>

    );
  }
  