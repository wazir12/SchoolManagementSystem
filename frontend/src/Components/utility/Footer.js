import { Component } from "react";

export default class FooterComponent extends Component{
    render(){
        return(
            <footer className="footer" style={{backgroundColor:'#060b26',height:40}}>
                 <span className="text-muted">All Rights Reserved 2021 @Lalit Wazir</span>
            </footer>
        );
    }

}