
import React, { Component } from 'react';
import posed from 'react-pose';

export default class SearchSelector extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      hover : false,
      backgroundColor:this.props.theme.bouton.element1.interior
    };
  }

  hover = () => {
    this.setState({
      hover : true,
      backgroundColor:this.props.theme.bouton.element2.interior
    })
  }
  blur = () => {
    this.setState({
      hover : false,
      backgroundColor:this.props.theme.bouton.element1.interior
    })
  }

  render(){
    return(

      <div onClick={this.props.ChooseCategory} onMouseEnter={this.hover} onMouseLeave={this.blur} style={{backgroundColor:this.state.backgroundColor, color:this.props.theme.bouton.element1.color}}>{
        this.props.Name
      }
      </div>
    )
  }



}
