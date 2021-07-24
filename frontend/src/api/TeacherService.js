import axios from "axios";

 class TeacherService {
   
    exportAllPupilTestRecords(testId){
       return axios.get(`http://localhost:9000/teacher/export/${testId}/pupils/grades/pdf`)
   
    }

    exportPupilListWithAverageGrade(subjectId){
        return axios.get(`http://localhost:9000/teacher/export/${subjectId}/grades/pdf`)
    }
    getAllPupilsWithGrades(subjectId){
        return axios.get(`http://localhost:9000/teacher/${subjectId}/pupils/grades`)
    }

    getAllActiveSubjectByTeacherID(id){
        return axios.get(`http://localhost:9000/teacher/${id}/active/subjects`)
    }

    getAllArchivedSubjectsByTeacherId(id){
        return axios.get(`http://localhost:9000/teacher/${id}/archived/subjects`) 
    }



    fetchAllTestsBySubjectName(subjectName){
        return axios.get(`http://localhost:9000/teacher/${subjectName}/tests`)
    }

    addTest(subjectName,test){
        return axios.post(`http://localhost:9000/teacher/${subjectName}/add/test`,test)
    }

    editTest(subjectId, testId, updatedTestName){
        let updatedTest={
            testname:updatedTestName
        }
        console.log(`In Edit Test : ${updatedTest} and ${testId}`)
        console.log(`http://localhost:9000/teacher/${subjectId}/edit/${testId}`);
        return axios.put(`http://localhost:9000/teacher/${subjectId}/edit/${testId}`,updatedTest);
    }
    deleteTest(testId){
        return axios.delete(`http://localhost:9000/teacher/${testId}/delete`)
    }

    fetchAllPupilsWithGradesByTestId(testId){
        return axios.get(`http://localhost:9000/test/${testId}/pupils`)
    }
    updateTestRecordGrade(testId,pupilId,newGrade){
        let body = {
            grade:newGrade
        }
        return axios.put(`http://localhost:9000/test/${testId}/${pupilId}`,body)
    }

  

}
export default new TeacherService()