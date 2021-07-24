import axios from "axios"


class HelloWorldService{

    executeHelloWorldService(){
        console.log('Executed Hello World Service')
        return axios.get('http://localhost:8080/hello-world');
    }
    executeHelloWorldBeanService(){
        console.log('Executed Hello World Service')
        return axios.get('http://localhost:8080/hello-world-bean');
    }
    executeHelloWorldBeanPathVariableService(name){
        console.log('Executed Hello World Service')
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`);
    }
}
export default new HelloWorldService()