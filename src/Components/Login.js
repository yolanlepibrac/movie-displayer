import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from '../Utils/API';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import {browserHistory} from "react-router";
import PropTypes from 'prop-types'

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


export class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: "",
            impossibleToConnect : false,
        }
        this.handleChange.bind(this);
        this.send.bind(this);

    }



    send = (event, context) => {

        let email = this.state.email;
        if(this.state.email.length === 0){
            return;
        }
        if(this.state.password.length === 0){
            return;
        }
        context.props.displayLoading(true)
        API.login(this.state.email, this.state.password, context).then(function(data){

            API.getUserData(context.state.email).then(function(data2){
              localStorage.setItem('userData', JSON.stringify(data2.data.userData));
              localStorage.setItem('email', context.state.email);
              localStorage.setItem('token', data.data.token);
              context.props.changeAccountState(data2.data.userData);
              context.props.connect()
              context.props.displayLoading(false)
            })


        },function(error){
            console.log(error);
            context.setState({
              impossibleToConnect : true
            })
            context.props.displayLoading(false)
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
            <div className="Login"  style={{ marginTop:0}}>
              {this.state.impossibleToConnect ?
                <div style={{color:"red", fontSize:13, margin:5, marginBottom:15}}>Impossible to connect (password and email does not match).
                </div>
                : null
              }
                <FormGroup controlId="email" bsSize="small">
                  <div>Email</div>
                  <FormControl autoFocus type="email" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup controlId="password" bsSize="small">
                  <div>Password</div>
                  <FormControl  onChange={this.handleChange} type="password"/>
                </FormGroup>
                <Button
                  onClick={(event) => this.send(event, this)}
                  block
                  bsSize="small"
                  type="submit"
                >
                Connexion
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

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;
