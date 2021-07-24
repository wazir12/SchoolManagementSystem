import axios from "axios";

class CourseService{
    executeRetrieveAllCoursesService(){
        console.log('Executed Retrieved All Courses Service')
        return axios.get('http://localhost:9000/courses');
    }

    executeCourseById(id){
        console.log('Executed Retrieved All Courses Service')
        return axios.get(`http://localhost:9000/jpa/courses/${id}`); 
    }
    editCourse(courseId,newCourseName){
        let course = {
            courseName:  newCourseName
        }
        return axios.put(`http://localhost:9000/course/${courseId}`,course)
    }
    executeAddCourse(course){
        return axios.post('http://localhost:9000/course',course);

    }
    executeDeleteCourseById(id){
        return axios.delete(`http://localhost:9000/course/delete/${id}`);

    }
    executePupilAndTestCountBySubjectName(subjectName){
        return axios.get(`http://localhost:9000/subject/${subjectName}/pupilAndTest/count`)
    }
    executeAllPupilByCourseId(id){
        return axios.get(`http://localhost:9000/course/${id}/allPupils`)
    }
    deAssignPupil(courseId,pupilId){
        return axios.put(`http://localhost:9000/course/${courseId}/pupil/${pupilId}`);
    }
    assignPupil(courseId,pupilId){
        return axios.put(`http://localhost:9000/course/${courseId}/assign/pupil/${pupilId}`);
    }

    getAllPupils(){
        return axios.get('http://localhost:9000/pupil');
    }

    deleteSubjectbyId(courseId,subjectName){
        return axios.delete(`http://localhost:9000/course/${courseId}/subject/${subjectName}`);
    }

   

}
export default new CourseService()