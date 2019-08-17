
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


export class FavouritesButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          likeLogo:require('../Assets/images/heartLiked.png'),
        }
    }

    toggleLikeCard = () => {
      this.props.toggleInToFavourites(this.props.Movie)
    }

    deleteLikeEnter = () => {
      if(this.props.Movie.inToFavourites){
        this.setState({
          likeLogo: require('../Assets/images/quitLiked.png') ,
        })
      }
    }

    deleteLikeLeave = () => {
      if(this.props.Movie.inToFavourites){
        this.setState({
          likeLogo: require('../Assets/images/heartLiked.png') ,
        })
      }
    }


  render(){
    return(
      <div onMouseEnter={this.deleteLikeEnter} onMouseLeave={this.deleteLikeLeave} onClick={this.toggleLikeCard} style={{width:30*this.props.Size, height:30*this.props.Size, top:5*this.props.Size, right:5*this.props.Size, position:"absolute",}}>
        {this.props.Movie.inToFavourites ?
          <div  style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:30*this.props.Size, height:30*this.props.Size, borderWidth:1, borderStyle:"solid",  borderRadius:"50%", borderColor:"rgba(255,123,191,1)"}}>
            <img src={this.state.likeLogo} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer', backgroundColor:"rgba(200,200,200,0.2)", borderRadius:"50%"}}/>
          </div>
          :
          <div  style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", width:30*this.props.Size, height:30*this.props.Size, borderWidth:1, borderStyle:"solid",  borderRadius:"50%", borderColor:"white"}}>
            <img src={require('../Assets/images/heart.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer', backgroundColor:"rgba(200,200,200,0.2)", borderRadius:"50%"}}/>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accountState:state.accountStateRedux,
  }
}

const FavouritesButton = connect(mapStateToProps, mapDispatchToProps)(FavouritesButtonComponent);
export default FavouritesButton;
