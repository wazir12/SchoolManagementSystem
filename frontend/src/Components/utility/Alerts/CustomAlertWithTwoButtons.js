import { ThreeSixtyOutlined } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import React,{ Component } from "react"
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

export default function CustomAlertWithTwoButtons(props){


  return  (     
            <Collapse in={props.errorMessage!=null}>
                <Alert severity={props.severity} 
                    action={
                        <>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                props.onCancel();
                            }}
                        >
                             <CloseIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            props.onAgree();
                        }}
                    >
                         AGREE
                    </IconButton>
                    </>
                         
                    }    
                >
                {props.errorMessage}
                </Alert>
            </Collapse>

  );
  
}