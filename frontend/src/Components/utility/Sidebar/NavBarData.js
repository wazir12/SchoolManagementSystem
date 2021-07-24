import React from 'react';
import {FaBars} from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { USER_ID, USER_ROLE } from '../../../Authentication/AuthenticationService';
import AdminDashboard from '../../AdminView/AdminDashBoard';

const name=sessionStorage.getItem(USER_ID);

export const SidebarData =[
    {
        title: 'Home',
        role:'ADMIN',
        description:'Dashboard',
        path:`/admin/dashboard/${sessionStorage.getItem(USER_ID)}`,
        icon:<AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Home',
        role:'TEACHER',
        description:'Dashboard',
        path:`/teacher/${sessionStorage.getItem(USER_ID)}/subjects`,
        icon:<AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Home',
        role:'PUPIL',
        description:'Dashboard',
        path:`/pupil/welcome/${sessionStorage.getItem(USER_ID)}`,
        icon:<AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title:'Settings',
        description:'User Settings',
        path:`/user/settings`,
        icon:<AiIcons.AiFillSetting/>,
        cName: 'nav-text'
    },
 
    
    {
        title: 'Logout',
        description:'Logout',
        path:'/logout',
        icon:<AiIcons.AiOutlineLogout/>,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        description:'Login',
        path:'/',
        icon:<AiIcons.AiOutlineLogin/>,
        cName: 'nav-text'
    },
    


]
