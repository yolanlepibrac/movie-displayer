import React, { Component } from 'react';
import Card from './Card';
import { getImageFromApi } from '../API/TMDBAPI'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ThemesItems from '../Utils/Themes';
import InputSettingValue from './InputSettingValue';


import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";
function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
  };
};


class ItemEditProfileComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modifiedUserName:false,
      userNameModified:"",
      value:this.props.value,
      backgroundModifyButton : false
    };
  }

  enterToSubmit = (event) => {
    if (event.keyCode  == 13) {
      this.setState({
        modifiedUserName: false,
        value: this.state.userNameModified,
      });
      this.props.onSubmit(this.state.userNameModified)
    }
    if(event.keyCode  == 27){
      this.quitModifiedUserName();
    }
  }

  validate = () => {
    if(this.state.userNameModified != ""){
      this.setState({
        modifiedUserName: false,
        value: this.state.userNameModified,
        backgroundModifyButton : false
      });
      this.props.onSubmit(this.state.userNameModified)
    }
  }

  handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
  }

  modifiedUserName = () => {
    this.setState({
      modifiedUserName : true
    })
  }

  quitModifiedUserName =() => {
    this.setState({
      modifiedUserName : false
    })
  }

  toggleBackgroundModifyButton = () => {
    this.setState({
      backgroundModifyButton : this.state.backgroundModifyButton ? false : true
    })
  }


  render(){
    var theme = this.props.accountState.theme ? ThemesItems[this.props.accountState.theme] : ThemesItems[0];
    return(
      <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", marginLeft:20, marginBottom:5, marginTop:5}}>
        <strong style={{width: 200, textAlign:"left", fontSize:13}}>{this.props.placeHolder}</strong>
        <div style={{width: 800, display: 'flex', flexDirection: 'row', alignItems:"center", marginBottom:5, marginTop:5, fontSize:15, justifyContent:"flex-start", marginLeft:0, marginRight:0,}}>
          <div style={{width: 200, height:30*this.props.heightSize, textAlign:"left", display: 'flex', flexDirection: 'column', justifyContent:"center", backgroundColor:theme.bouton.element1.interior, borderRadius:3, paddingLeft:20, marginRight:20, color:"black", borderWidth:1, borderStyle:"solid", borderColor:"rgba(150,150,150,1)"}}>
          {this.state.value}
        </div>
        {this.state.modifiedUserName ?
          <div style={{display:"flex", flexDirection:"row", width:300, height:30, justifyContent:"flex-start"}} createPlaceHolder={this.createPlaceHolder}>
            <div class="form-group col-md-6" style={{width: 150, height:30, marginLeft:30, padding:0}} >
              <InputSettingValue handleChange={this.handleChange} placeHolder={this.props.placeHolder} enterToSubmit={this.enterToSubmit}/>
            </div>
            <div style={{width: 100, height:30, display:"flex", flexDirection:'row', alignItems:"center"}} >
              <button style={{width: 30, height:28,  display:"flex", flexDirection:"row", justifyContent:"center", textAlign:"center",  margin:0, padding:0, marginRight:5, backgroundColor:theme.bouton.element3.interior}} type="button" class="btn btn-secondary " onClick={this.validate}>OK</button>
              <button style={{width: 30, height:28, display:"flex", flexDirection:"row", justifyContent:"center", textAlign:"center", margin:0, padding:0, backgroundColor:theme.bouton.element2.interior}} type="button" class="btn btn-secondary" onClick={this.quitModifiedUserName}>X</button>
            </div>
          </div>
          :
          <button onMouseEnter={this.toggleBackgroundModifyButton} onMouseLeave={this.toggleBackgroundModifyButton} style={{width: 150, height:30, fontSize:16, textAlign:"center", justifyContent:"flex-start", marginLeft:30, padding:0, backgroundColor:this.state.backgroundModifyButton ? theme.bouton.element3.interior : theme.bouton.element2.interior , color:theme.bouton.element2.color, borderWidth:0}} type="button" class="btn btn-secondary btn-lg" onClick={this.modifiedUserName}>Modifie</button>
          }
        </div>
      </div>
    )
  }


}


const mapStateToProps = (state) => {
  return {
    accountState:state.accountStateRedux,
  }
}

const ItemEditProfile = connect(mapStateToProps, mapDispatchToProps)(ItemEditProfileComponent);
export default ItemEditProfile;
