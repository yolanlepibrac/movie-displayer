import React, { Component } from 'react';
import Card from './Card';
import { getImageFromApi } from '../API/TMDBAPI'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ThemesItems from '../Utils/Themes';


import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";
function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
  };
};


class InputSettingValueComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    document.getElementById("userNameModified").defaultValue = this.props.placeHolder;
  }

  render(){
    return(<input style={{height:30, margin:0, padding:0, paddingLeft:10, width: this.props.length}} onChange={this.props.handleChange} id="userNameModified" class="form-control" placeholder={this.props.placeHolder} onKeyDown={this.props.enterToSubmit}/>)
  }

}


const mapStateToProps = (state) => {
  return {
    accountState:state.accountStateRedux,
  }
}

const InputSettingValue = connect(mapStateToProps, mapDispatchToProps)(InputSettingValueComponent);
export default InputSettingValue;
