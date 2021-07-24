import axios from "axios";

 class PupilsService {
    fetchAssignedSubjectWithAvgGrades(pupilId){
        return axios.get(`http://localhost:9000/pupil/${pupilId}/AssignedSubjects`);

    }
    fetchPupilDetailsByPupilUsername(username){
        return axios.get(`http://localhost:9000/pupil/${username}/GetDetails`)
    }
    fetchAllTestsForSelectedSubject(pupilId,subjectName){
        return axios.get(`http://localhost:9000/pupil/${pupilId}/${subjectName}/tests`)
    }


}
export default new PupilsService()