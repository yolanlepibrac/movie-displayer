
import React, { Component } from 'react';
import posed from 'react-pose';

export default class CategorySelector extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      hover : false,
      backgroundColor:'rgba(1,1,1,0)',
    };
  }

  hover = () => {
    this.setState({
      hover : true,
      backgroundColor:'rgba(0,0,0,0.1)'
    })
  }
  blur = () => {
    this.setState({
      hover : false,
      backgroundColor:'rgba(1,1,1,0)'
    })
  }

  render(){
    return(

      <div onClick={this.props.ChooseCategory} onMouseEnter={this.hover} onMouseLeave={this.blur} style={{backgroundColor:this.state.backgroundColor}}>{
        this.props.Name
      }
      </div>
    )
  }



}
