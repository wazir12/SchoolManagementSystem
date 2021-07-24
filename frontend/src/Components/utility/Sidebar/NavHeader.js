//import useState hook to create menu collapse state
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import {FaBars} from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData,sideBarDataPupil,sideBarDataTeacher } from "./NavBarData";
import './Navbar.css';
import AuthenticationService, { USER_ID, USER_ROLE } from "../../../Authentication/AuthenticationService";

export default class Header extends Component {
  
  // const [sidebar, role ,setSidebar,setRole] = useState(false,'');

   constructor(props){
     super(props);
     this.state={
        sidebar:false,
        role:localStorage.getItem(USER_ROLE),
        name:sessionStorage.getItem(USER_ID)

     }
   }


   componentDidMount(){
     //let extractedRole = AuthenticationService.getRoleFromToken();
     this.setState({
       role:sessionStorage.getItem(USER_ROLE),
       name:sessionStorage.getItem(USER_ID)
     })
   }


   setSidebar = () =>
   {

    let sidebar = this.state.sidebar
    this.setState(
      {
         sidebar:!sidebar
      }
    )

   }
   
   //showSidebar = () => this.setSidebar();

   clickHandler = (item)=>{
          this.setSidebar();
          if(item.title==='Logout'){
            AuthenticationService.logout();
          }
   }
   render(){
      return (
      <>
        <div className="navbar ">
          <Link to="#" className="nav-bars">
            <FaBars onClick={this.setSidebar}/>
          </Link>
          <Link to={sessionStorage.getItem(USER_ROLE)=='ADMIN'?`/admin/dashboard/${sessionStorage.getItem(USER_ID)}`:
          sessionStorage.getItem(USER_ROLE)=='TEACHER'?`/teacher/${sessionStorage.getItem(USER_ID)}/subjects`:
          `/pupil/welcome/${sessionStorage.getItem(USER_ID)}`} className="nav-link">
            Home
          </Link>
        </div>
        <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className="navbasr-toggle">
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose onClick={this.setSidebar}/>
              </Link>
            </li>
            { SidebarData.map((item,index)=>{
                
                  if(AuthenticationService.isUserLoggedIn()){
                    if(item.title!='Login'){
                      if(item.role==sessionStorage.getItem(USER_ROLE))  {
                        return(
                          <li key={index} className={item.cName}>
                            <Link to= {item.path} onClick={()=>this.clickHandler(item)}>
                            {item.icon}
                            <span>{item.title}</span>
                            </Link>
                          </li>
                        )
                      }else if(item.title=='Logout'){
                        return(
                          <li key={index} className={item.cName}>
                            <Link to= {item.path} onClick={()=>this.clickHandler(item)}>
                            {item.icon}
                            <span>{item.title}</span>
                            </Link>
                          </li>
                        )
                      }
                      else if(item.title=='Settings'){
                        return(
                          <li key={index} className={item.cName}>
                            <Link to= {item.path} onClick={()=>this.clickHandler(item)}>
                            {item.icon}
                            <span>{item.title}</span>
                            </Link>
                          </li>
                        )
                      }
                     
                    }
                 }else if(item.title==='Login'){
                        return(
                          <li key={index} className={item.cName}>
                            <Link to={item.path} onClick={()=>this.clickHandler(item)}>
                            {item.icon}
                            <span>{item.title}</span>
                            </Link>
                          </li>
                        )
                 }            
            })}
           
          </ul>
      </nav>
    </>
  );
          }
};

