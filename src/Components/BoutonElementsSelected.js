
import React, { Component } from 'react';
import posed from 'react-pose';

export default class BoutonElementsSelected extends React.Component {


  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    const QUIT = require('../Assets/images/quit.png');
    return(

      <div style={{paddingLeft:5, paddingRight:5, marginLeft:5, marginRight:5, marginTop:5, marginBottom:5, height:25, fontSize:12, display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', borderRadius:5, color:this.props.theme.background.element3.color, backgroundColor:this.props.theme.background.element3.interior}}>
        {this.props.Name}
        <div style = {{width:20, height:20, backgroundColor:this.props.theme.bouton.element4.interior, backgroundImage: "url("+ QUIT +")", cursor:'pointer', backgroundSize: 'cover'}} onClick={this.props.DeleteCategory}>
        </div>
      </div>
    )
  }



}
