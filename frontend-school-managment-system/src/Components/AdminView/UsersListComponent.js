import React,{ Component } from "react";

export default class UsersListComponent extends Component{

    constructor(props){
        super(props)
        this.state={
            users:[
                {id:1,name:'Lalit',role:'Admin',createdAt:new Date()},
                {id:2,name:'User 2',role:'Teacher',createdAt:new Date()},
                {id:3,name:'User 3',role:'Pupil',createdAt:new Date()}
            ]
        }
    }
    render(){
        return (
        <div>
            <h1>Users:</h1> 
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Role</th>
                        <th>Created At</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map(
                            user=> 
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.createdAt.toUTCString()}</td>
                            </tr>

                        )
                    }
                  
                </tbody>

            </table>
            
        </div>
        
        );
    }
}