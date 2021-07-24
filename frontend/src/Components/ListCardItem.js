import { PinDropSharp } from '@material-ui/icons';
import React from 'react';
import { Button } from 'react-bootstrap';
import './ListCardItem.css';
export default function ListCardItem(props){


   const onClickHandler = () =>{
       console.log("OnClickHandler");
        props.onDeAssign();
    }
    return (
        <li className ="listItem" key={props.key}>
            <div class="card">
                <div class="container">
                    <h4 className="pupilName"><b>{props.name}</b></h4> 
                    <Button className="button" onClick={onClickHandler}>De-Assign</Button>
                    
                </div>
            </div>
        </li>
    );

}
