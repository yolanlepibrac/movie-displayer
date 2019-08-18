import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from '../Utils/API';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";
import { displayLoading } from "../Actions/index";


function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
    displayLoading: (boolean) => dispatch(displayLoading(boolean)),
  };
};


export class SignupComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            userName: "",
            password: "",
            cpassword: "",
            impossibleToConnect : false,
            messageError: "",
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }

    send = (event, context) => {
      console.log("begin");
        var email = this.state.email;
        var userName = this.state.userName;
        if(this.state.userName.length === 0){
          context.setState({
            impossibleToConnect : true,
            messageError : "Please choose a user name"
          })
            return;
        }
        if(this.state.email.length === 0){
          context.setState({
            impossibleToConnect : true,
            messageError : "Please fill your email"
          })
            return;
        }
        if(this.state.password.length === 0 || this.state.password !== this.state.cpassword){
            context.setState({
              impossibleToConnect : true,
              messageError : "Carefull, password and confirm password does not match or are invalid"
            })
            return;
        }
        var _send = {
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password
        }
        context.props.displayLoading(true)
        API.signup(_send, context).then(function(data){
          API.getUserData(context.state.email).then(function(data2){
            localStorage.setItem('userData', JSON.stringify(data2.data.userData));
            localStorage.setItem('email', context.state.email);
            localStorage.setItem('token', data.data.token);
            context.props.changeAccountState(data2.data.userData);
            context.props.displayLoading(false)
            context.props.connect()
          })
        },function(error){
            context.props.displayLoading(false)
            console.log(error);
            return;
        })
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {
        return(
            <div className="Login" style={{ marginTop:0}}>
                {this.state.impossibleToConnect ?
                  <div style={{color:"red", fontSize:13, margin:5, marginBottom:15}}>{this.state.messageError}
                  </div>
                  : null
                }
                <FormGroup controlId="userName" bsSize="small" >
                  <div>User Name</div>
                  <FormControl autoFocus type="userName" value={this.state.userName} onChange={this.handleChange} style={{width:"100%"}}/>
                </FormGroup>
                <FormGroup controlId="email" bsSize="small">
                  <div>Email</div>
                  <FormControl  type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="password" bsSize="small">
                  <div>Password</div>
                  <FormControl value={this.state.password} onChange={this.handleChange} type="password"/>
                </FormGroup>
                <FormGroup controlId="cpassword" bsSize="small">
                  <div>Confirm Password</div>
                  <FormControl value={this.state.cpassword} onChange={this.handleChange} type="password"/>
                </FormGroup>
                  <Button
                    onClick={(event) => this.send(event, this)}
                    block
                    bsSize="small"
                    type="submit"
                    style={{backgroundColor:"rgba(240,240,240,1)"}}
                    >
                    Inscription
                  </Button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
  return {
    accountState:state.accountStateRedux,
  }
}

const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
export default Signup;
