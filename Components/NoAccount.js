

import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";


import Signup from './Signup';
import Login from './Login';

import { bounceInDown } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import {BrowserView,MobileView,isBrowser,isMobile} from "react-device-detect";

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

  quitLoginAndSignUp = () =>{
    this.setState({
      popupConnexion : false,
      popupSignUp : false,
      imageConnexion:require('../Assets/images/connect.png'),
      imageRegister:require('../Assets/images/register.png'),
    })
  }

  renderComputer = () => {

    return(
      <div style={{display:"flex", flexDirection:"row", justifyContent:'space-evenly', marginTop:10}}>
        {this.state.popupConnexion || this.state.popupSignUp ?
          <div onClick={this.quitLoginAndSignUp} style={{width:"100vw", height:"100vh", position:"absolute", backgroundColor:"rgba(0,0,0,0)", top:0, left:0, zIndex:1}}>
          </div>
          :null
        }
        <div style={{display:"flex", flexDirection:"column", width:75, height:90, zIndex:10,}}>
          Connexion
          <div onClick= {this.connexion} style={{ overflow:"hidden", width:75, height:75, minHeight:50, minWidth:50, borderRadius:10, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <div style={{ width:20, height:20, minHeight:50, minWidth:50, cursor:'pointer', backgroundImage: "url("+ this.state.imageConnexion +")", backgroundSize: 'cover', borderStyle:"solid", borderRadius:"50%", borderWidth:0.5,}}>
            </div>
          </div>

          {this.state.popupConnexion ?
            <div style={{ zZindex:1000, position:'absolute', top:35, right:0, width:300, height:200, marginTop:100, zIndex:10, marginRight:10,  display: 'flex', flexDirection: 'column',  borderStyle: 'solid', borderWidth: 0, borderColor: 'black', backgroundColor:'rgba(255,255,0,0)'}}>
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
        <div style={{display:"flex", flexDirection:"column", width:75, height:90, zIndex:10,}}>
          Register
          <div onClick= {this.popupSignUp} style={{ overflow:"hidden", width:75, height:75, minHeight:50, minWidth:50, borderRadius:10, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <div style={{ width:20, height:20, minHeight:50, minWidth:50, cursor:'pointer', backgroundImage: "url("+ this.state.imageRegister +")", backgroundSize: 'cover', borderStyle:"solid", borderRadius:"50%", borderWidth:0.5,}}>
            </div>
          </div>
          {this.state.popupSignUp ?
              <div style={{ zIndex:10,position:'absolute', top:35, right:0, width:300, marginTop:100, zIndex:10, marginRight:10,  display: 'flex', flexDirection: 'column',  borderStyle: 'solid', borderWidth: 0, borderColor: 'black', backgroundColor:'rgba(255,255,0,0)'}}>
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


  renderMobile = () => {

    return(
      <div style={{display:"flex", flexDirection:"row", justifyContent:'space-evenly', marginTop:0}}>
        {this.state.popupConnexion || this.state.popupSignUp ?
          <div onClick={this.quitLoginAndSignUp} style={{width:"100vw", height:"100vh", position:"absolute", top:0, left:0, zIndex:1}}>
          </div>
          :null
        }
        <div style={{display:"flex", flexDirection:"column", width:50, height:50, zIndex:10,}}>
          <div onClick= {this.connexion} style={{ overflow:"hidden", width:50, height:50, minHeight:50, minWidth:50, borderRadius:10, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <div style={{ width:20, height:20, minHeight:50, minWidth:50, cursor:'pointer', backgroundImage: "url("+ this.state.imageConnexion +")", backgroundSize: 'cover', borderStyle:"solid", borderRadius:"50%", borderWidth:0.5,}}>
            </div>
          </div>

          {this.state.popupConnexion ?
            <div style={{ zZindex:1000, position:'absolute', top:35, right:"10%", width:"80%", height:200, marginTop:50, zIndex:10, marginRight:0,  display: 'flex', flexDirection: 'column',  borderStyle: 'solid', borderWidth: 0, borderColor: 'black', backgroundColor:'rgba(255,255,0,0)'}}>
              <BouncyDiv>
                <div style={{borderStyle: 'solid', borderWidth: 0, marginTop:0, paddingBottom:30, borderColor: 'black',paddingLeft:30, paddingRight:30, backgroundColor:'rgba(230,230,230,1)', borderRadius:0, paddingTop:10, borderRadius:20, borderStyle:"solid", borderWidth:1, borderColor:"rgba(0,0,0,0.2)"}}>
                  <Login connect={this.props.connect}/>
                </div>
              </BouncyDiv>
            </div>
            : <div></div>}

        </div>
        <div style={{display:"flex", flexDirection:"column", width:50, height:50, zIndex:10,}}>
          <div onClick= {this.popupSignUp} style={{ overflow:"hidden", width:50, height:50, minHeight:50, minWidth:50, borderRadius:10, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <div style={{ width:20, height:20, minHeight:50, minWidth:50, cursor:'pointer', backgroundImage: "url("+ this.state.imageRegister +")", backgroundSize: 'cover', borderStyle:"solid", borderRadius:"50%", borderWidth:0.5,}}>
            </div>
          </div>
          {this.state.popupSignUp ?
              <div style={{ zIndex:10,position:'absolute', top:35, right:"10%", width:"80%", marginTop:100, zIndex:10, marginRight:0,  display: 'flex', flexDirection: 'column',  borderStyle: 'solid', borderWidth: 0, borderColor: 'black', backgroundColor:'rgba(255,255,0,0)'}}>
                <BouncyDiv>
                  <div style={{  borderStyle: 'solid', borderWidth: 0, paddingBottom:30, borderColor: 'black',paddingLeft:30, paddingRight:30, backgroundColor:'rgba(230,230,230,1)', borderRadius:0, paddingTop:10, borderRadius:20, borderStyle:"solid", borderWidth:1, borderColor:"rgba(0,0,0,0.2)"}}>
                    <Signup connect={this.props.connect}/>
                  </div>
                </BouncyDiv>
              </div>
             : <div></div>}

        </div>
      </div>
    )
  }



  render(){
    if (isMobile) {
      return (this.renderMobile())
    }else{
      return (this.renderComputer())
    }
  }
}
