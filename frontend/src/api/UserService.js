import axios from "axios"
import { USER_ID } from "../Authentication/AuthenticationService";

class UserService{
    executeRetrieveUserIDByUsernameService(username){
        console.log('Executed Retrieved User Id for' +username)
        return axios.get(`http://localhost:9000/GetUserIDByName/${username}`);
    }

    executeRetrieveAllUsersService(){
        console.log('Executed Retrieved All Users Service')
        return axios.get('http://localhost:9000/users');
    }
    executedeleteUserByIdService(id){
        console.log('Executed Delete User by ID Service')
        return axios.delete(`http://localhost:9000/delete/${id}`);
    }
    executeExportUserToPDFService(){
        console.log('Executed  EXport to PDF')
        return axios.get('http://localhost:9000/users/export/pdf',{responseType: 'blob'});
    }
    executeRetrieveUserByIdService(id){
        return axios.get(`http://localhost:9000/users/${id}`);
    }

    createUser(user){

        console.log("inside create user")
        return axios.post('http://localhost:9000/addUser',user);
    }

    updateUser(id,user){
        console.log("inside update user")
        return axios.put(`http://localhost:9000/users/${id}`,user);

    }
    fetchTeacherIDByUsername(username){
        console.log("inside fetchTeacherIdByUsername")
        return axios.get(`http://localhost:9000/users/teacherId/${username}`);
    }
}

export default new UserService()