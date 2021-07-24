import axios from "axios";

 class SubjectService {
    addSubject(courseId,subject){
        return axios.post(`http://localhost:9000/course/${courseId}/subject`,subject);
    }

    getAllTeachers(){
        return axios.get('http://localhost:9000/teachers');
    }

    getSubjectDetailsByName(subjectName){
        console.log(`Getting description: ${subjectName}`)
            return axios.get(`http://localhost:9000/subjects/${subjectName}/details`)
    }

    editSubject(subjectId,subject){
        console.log("subject Details: "+subject.subjectName);
        return axios.post(`http://localhost:9000/course/${subjectId}/edit/subject`,subject)
    }
    archiveSubject(requestBody){
        return axios.put('http://localhost:9000/subject/archive', requestBody)
    }

}
export default new SubjectService()