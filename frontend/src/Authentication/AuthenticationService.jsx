import axios from "axios";
import jwtDecode from "jwt-decode";

export const USER_TOKEN_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_ROLE = 'USER_ROLE'
export const USER_ID = 'USER_ID'
export let decodedToken=''
class AuthenticationService {  

    
    
    executeJWtAuthenticationService(username,password){
            return axios.post("http://localhost:9000/authenticate",{
                username,
                password
            });
    }
    registerSuccesfullLoginForJwt(username,token){
        localStorage.setItem(USER_TOKEN_ATTRIBUTE_NAME,token)
        sessionStorage.setItem(USER_ROLE,this.getRoleFromToken())
        sessionStorage.setItem(USER_ID,username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }
    createJWTToken(token) {
        return 'Bearer ' + token
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
   
    logout() {
        localStorage.removeItem(USER_TOKEN_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USER_ID);
        sessionStorage.removeItem(USER_ROLE)
    }
    isUserLoggedIn() {
        let user = localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME) 
        if (user === null) return false
        return true
    }

    getRoleFromToken(){
        let token = localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME);
     
        try{
            let role = JSON.stringify(jwtDecode(token)).split(",")[1].split(":")[2].split('"')[1]
            console.log(role)
            return role; 
        }catch(error){
            console.log('Error While Extracting  Role from Token: '+error)
        }
     
        
        
    }

   

    getExpiryDateFromToken(){
        let token = localStorage.getItem(USER_TOKEN_ATTRIBUTE_NAME); 
        try{
            let expiry_date= JSON.stringify(jwtDecode(token)).split(",")[2].split('"')[2].split(":")[1];
            //console.log(expiry_date);
            return expiry_date;
        }catch(error){
            console.log('Error While Extracting  Expiry Time from Token: '+error) 
        }
       
    }

    
}
export default new AuthenticationService()

