import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from '../Utils/API';

export class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            userName: "",
            password: "",
            cpassword: ""
        }
        this.handleChange.bind(this);
        this.send.bind(this);
    }
    send = event => {
        var email = this.state.email;
        var userName = this.state.userName;
        if(this.state.email.length === 0){
            return;
        }
        if(this.state.userName.length === 0){
            return;
        }
        if(this.state.password.length === 0 || this.state.password !== this.state.cpassword){
            return;
        }
        var _send = {
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password
        }
        API.signup(_send).then(function(data){
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('userName', userName);
            localStorage.setItem('email', email);
            window.location = "/"+ "home"
        },function(error){
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
                <FormGroup controlId="email" bsSize="small">
                  <div>Email</div>
                  <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="userName" bsSize="small">
                  <div>User Name</div>
                  <FormControl autoFocus type="userName" value={this.state.userName} onChange={this.handleChange}/>
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
                onClick={this.send}
                block
                bsSize="small"
                type="submit"
                >
                Inscription
                </Button>
            </div>
        )
    }
}
