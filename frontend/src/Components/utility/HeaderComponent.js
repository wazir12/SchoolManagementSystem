import { Component } from "react";

import {Link} from 'react-router-dom'
import { withRouter } from 'react-router';
import AuthenticationService, { USER_ID, USER_ROLE } from "../../Authentication/AuthenticationService";
class HeaderComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            name:sessionStorage.getItem(USER_ID),
        }
    }
    render(){

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        {(sessionStorage.getItem("USER_ROLE") ==="ADMIN" && isUserLoggedIn )&&
                         <li><Link className="nav-link" to={`/admin/dashboard/${this.state.name}`}>Home</Link></li>}
                       {( sessionStorage.getItem("USER_ROLE") ==="ADMIN" && isUserLoggedIn) && <li><Link className="nav-link" to="/users">Users</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                       {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                       {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        );
    }

}
export default withRouter(HeaderComponent);