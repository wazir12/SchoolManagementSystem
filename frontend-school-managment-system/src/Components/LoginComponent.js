
import React, {Component} from 'react'

export default class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            username:' ',
            password:'',
            hasLoginFailed:false,
            showSuccessMessage:false
        }
  //  this.handleUserNameChanged = this.handleUserNameChanged.bind(this);

  //      this.handlePasswordChanged= this.handlePasswordChanged.bind(this);

  this.handleFormFieldChanged = this.handleFormFieldChanged.bind(this);
  this.loginClicked = this.loginClicked.bind(this);

    }
    handleFormFieldChanged(event){
      //  console.log(this.state);
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    loginClicked(){
        if(this.state.username==='lalit' && this.state.password==='1234'){
                this.setState({
                    showSuccessMessage: true
                });

        }
        else{
            this.setState({
                hasLoginFailed:true
            });
        }
       // console.log(this.state);
    }
  
    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                  {  /*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                   {/* <ShowSuccessMessage hasLoginSuceeded={this.state.showSuccessMessage}/>*/}
                   {this.state.hasLoginFailed && <div>Login Failed:Invalid Credential!</div>}
                   {this.state.showSuccessMessage && <div>Login Succesfull!</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange = {this.handleFormFieldChanged} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleFormFieldChanged}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

function ShowInvalidCredentials(props){
    if(props.hasLoginFailed){
       return  <div>Login Failed:Invalid Credential!</div>
    }
    return null;
}
function ShowSuccessMessage(props){
    if(props.hasLoginSuceeded){
        return <div>Login Succesfull!</div>
    }
    return null;
}