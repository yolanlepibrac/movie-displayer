import React, { Component } from 'react';



import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
  };
};

class SliderSizeCardComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if(this.props.accountState.sizeCard){
      document.getElementById("formControlRange").value = this.props.accountState.sizeCard;
    }

  }

  render(){


    return(
      <div style={{display:"flex", flexDirection:"row", marginLeft:20}}>
        <div class="form-group" style={{width:200, display: 'flex', flexDirection: 'row', alignItems:"center", margin:0}}>
          <input type="range" class="form-control-range" id="formControlRange" onChange={this.props.setValue} min="0.5" max="1.5" step="0.01"/>
        </div>
        <button style={{width: 40, height:40, margin:0,marginLeft:30, display:"flex", flexDirection:"row", justifyContent:"center", textAlign:"center",  padding:0}} type="button" class="btn btn-secondary btn-lg" onClick={this.props.onClick}>OK</button>
      </div>
    )

    }
  }

  const mapStateToProps = (state) => {
    return {
      accountState:state.accountStateRedux,
    }
  }

  const SliderSizeCard = connect(mapStateToProps, mapDispatchToProps)(SliderSizeCardComponent);
  export default SliderSizeCard;
