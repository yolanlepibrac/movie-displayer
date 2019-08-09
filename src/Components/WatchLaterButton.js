
import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import API from '../Utils/API';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";


function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
  };
};


export class WatchLaterButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          toWatchHover : false,
          watchLaterLogo : require('../Assets/images/watched.png'),
        }
    }

    togglePutInToWatchedList = () => {
      this.props.toggleInToWatchList(this.props.Movie)
    }

    enterWatchLater = () => {
      if(this.props.Movie.inToWatchList === false) {
        this.setState({
          watchLaterLogo : require('../Assets/images/watchedInvert.png'),
        })
        this.myTimer=setTimeout(()=>this.setState({ toWatchHover : true, }), 500)
      }

    }

    leaveWatchLater = () => {
      if(this.props.Movie.inToWatchList === false) {
        this.setState({
          watchLaterLogo : require('../Assets/images/watched.png'),
          toWatchHover : false,
        })
        clearTimeout(this.myTimer)
      }
    }

  render(){
    return(
      <div style={{height:30*this.props.Size, width:30*this.props.Size, position:"relative", }} onClick={this.togglePutInToWatchedList} onMouseEnter={this.enterWatchLater} onMouseLeave={this.leaveWatchLater}>
          {this.props.Movie.inToWatch ?
            <img src={require('../Assets/images/watchedActive.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
            :
            <img src={require('../Assets/images/watched.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
          }
          {this.state.toWatchHover ? <div style={{position :'absolute', top:30, left:0, width:90, paddingLeft : 5, paddingRight :5, fontSize : 12, backgroundColor : '#EFEFEF', color:'black', borderColor : 'black', borderWidth : 0.5, borderStyle:'solid'}}>Watch it later</div> : null }
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accountState:state.accountStateRedux,
  }
}

const WatchLaterButton = connect(mapStateToProps, mapDispatchToProps)(WatchLaterButtonComponent);
export default WatchLaterButton;
