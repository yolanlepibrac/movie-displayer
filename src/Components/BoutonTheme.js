import React, { Component } from 'react';
import ThemesItems from '../Utils/Themes';


import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
  };
};

class BoutonThemeComponent extends React.Component {


  render(){
    var theme = this.props.accountState.theme ? ThemesItems[this.props.accountState.theme] : ThemesItems[0];

    return(
      <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:20, width:70, overflow:"hidden", marginLeft:20, cursor:"pointer", padding:5, borderRadius:10, borderStyle:"solid", borderColor:theme.background.element2.color, borderWidth:this.props.themeSelected===this.props.theme.id ? 1:0}} onClick={() => this.props.chooseTheme(this.props.theme.id)}>
        {this.props.theme.name}
        <div style={{display:"flex", flexDirection:"row", margin:0, padding:0, backgroundColor:"white", width:40}}>
          <div style={{width:20, height:20, backgroundColor:this.props.theme.background.element1.interior}}>
          </div>
          <div style={{width:20, height:20, backgroundColor:this.props.theme.background.element2.interior}}>
          </div>
          <div style={{width:20, height:20, backgroundColor:this.props.theme.background.element3.interior}}>
          </div>
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

  const BoutonTheme = connect(mapStateToProps, mapDispatchToProps)(BoutonThemeComponent);
  export default BoutonTheme;
