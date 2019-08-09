

import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


import Signup from './Signup';
import Login from './Login';

import { bounceInDown } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const bounceAnimation = keyframes`${bounceInDown}`;
const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;



export default class NoAccount extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      popupConnexion : false,
      popupSignUp : false,
      email : "",
      password :"",
      textEmailConnexion : "",
      textEPasswordConnexion : "",
      textEmailRegister : "",
      textEPasswordRegister : "",
      textEUserNameRegister : "",
      connexionComming : false,
      popUpComming : false,
      imageConnexion:require('../Assets/images/connect.png'),
      imageRegister:require('../Assets/images/register.png'),
    };
  }




  connexion = () => {
    if(this.state.connexionComming === false) {
      console.log(this.state.connexionComming)
      this.setState({
        popupConnexion : this.state.popupConnexion ? false : true,
        imageConnexion : this.state.popupConnexion ? require('../Assets/images/connect.png') : require('../Assets/images/connectActive.png'),
        imageRegister:require('../Assets/images/register.png'),
        popupSignUp : false,
        email: "",
        password : "",
      })
    }
  }



  popupSignUp = () => {
    if(this.state.popUpComming === false) {
      this.setState({
        popupSignUp : this.state.popupSignUp ? false : true,
        imageRegister : this.state.popupSignUp ? require('../Assets/images/register.png') : require('../Assets/images/registerActive.png'),
        imageConnexion:require('../Assets/images/connect.png'),
        popupConnexion : false,
        email: "",
        password : "",
      })
    }
  }




  render(){
    return(

        <div style={{display:"flex", flexDirection:"row", justifyContent:'space-evenly', marginTop:10}}>
          <div style={{display:"flex", flexDirection:"column", width:75, height:90,}}>
            Connexion
            <div onClick= {this.connexion} style={{ overflow:"hidden", width:75, height:75, minHeight:50, minWidth:50, borderRadius:10, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
              <div style={{ width:20, height:20, minHeight:50, minWidth:50, cursor:'pointer', backgroundImage: "url("+ this.state.imageConnexion +")", backgroundSize: 'cover', borderStyle:"solid", borderRadius:"50%", borderWidth:0.5,}}>
              </div>
            </div>

            {this.state.popupConnexion ?
              <div style={{ zZindex:1000, position:'absolute', top:15, right:0, width:300, height:200, marginTop:100, zIndex:10, marginRight:10,  display: 'flex', flexDirection: 'column',  borderStyle: 'solid', borderWidth: 0, borderColor: 'black', backgroundColor:'rgba(255,255,0,0)'}}>
                <BouncyDiv>
                <div style={{width:20, height:20, marginLeft:84, zIndex:10, backgroundImage:"url("+ require('../Assets/images/triangle.png') +")", backgroundSize:"cover"}}>
                </div>
                <div style={{borderStyle: 'solid', borderWidth: 0, marginTop:0, paddingBottom:30, borderColor: 'black',paddingLeft:30, paddingRight:30, backgroundColor:'rgba(230,230,230,1)', borderRadius:0, paddingTop:10}}>
                  <Login connect={this.props.connect}/>
                </div>
                </BouncyDiv>
              </div>
              : <div></div>}

          </div>
          <div style={{display:"flex", flexDirection:"column", width:75, height:90,}}>
            Register
            <div onClick= {this.popupSignUp} style={{ overflow:"hidden", width:75, height:75, minHeight:50, minWidth:50, borderRadius:10, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
              <div style={{ width:20, height:20, minHeight:50, minWidth:50, cursor:'pointer', backgroundImage: "url("+ this.state.imageRegister +")", backgroundSize: 'cover', borderStyle:"solid", borderRadius:"50%", borderWidth:0.5,}}>
              </div>
            </div>
            {this.state.popupSignUp ?
                <div style={{ zIndex:10,position:'absolute', top:15, right:0, width:300, marginTop:100, zIndex:10, marginRight:10,  display: 'flex', flexDirection: 'column',  borderStyle: 'solid', borderWidth: 0, borderColor: 'black', backgroundColor:'rgba(255,255,0,0)'}}>
                  <BouncyDiv>
                  <div style={{width:20, height:20, marginLeft:210, zIndex:10, backgroundImage:"url("+ require('../Assets/images/triangle.png') +")", backgroundSize:"cover"}}>
                  </div>
                  <div style={{  borderStyle: 'solid', borderWidth: 0, paddingBottom:30, borderColor: 'black',paddingLeft:30, paddingRight:30, backgroundColor:'rgba(230,230,230,1)', borderRadius:0, paddingTop:10}}>
                    <Signup connect={this.props.connect}/>
                  </div>
                  </BouncyDiv>
                </div>
               : <div></div>}

          </div>
        </div>
    )
  }
}
