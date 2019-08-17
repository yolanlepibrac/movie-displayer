import React, { Component } from 'react';
import posed from 'react-pose';
import { listOfGenres } from '../API/TMDBAPI';

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";

const widthLikeBar = 200;
const heightRatio = 20;
const timerAnimation = 200;

function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
    connectedRedux:dispatch.connectedRedux,
  };
};


export class CardComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      like : "",
      dislike : "",
      heightBottomAnimation : 30,
      onHoverAnimation : false,
      hovered : false,
     }
  }



  displayMovieDetail = () => {
    this.props.changeFilmPopup(this.props.Movie);
  }

  onHoverCard = () => {
      this.setState({
        onHoverAnimation : true,
        hovered : true,
      })
  }

  onLeaveCard = () => {
      this.setState({
        onHoverAnimation : false,
        hovered : false,
    })
  }


  render() {
    return (
      <div style={{width:  this.props.WidthCard, height: this.props.HeightCard+20, backgroundColor:"rgba(0,0,0,0)", marginLeft:20}}
          onMouseLeave={this.onLeaveCard} onMouseEnter={this.onHoverCard} >
          <div style={{width:  this.props.WidthCard, height: this.props.HeightCard-30}}>
            <div style={{width:this.props.widthCard, marginLeft:0, cursor:'pointer', height:'100%', display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"rgba(250,250,250,1)"}} onClick={this.displayMovieDetail}>
                {this.props.Src != "https://image.tmdb.org/t/p/w300null" ?
                  <img src={this.props.Src} style={{width:this.props.WidthCard, height:'100%'}}/>
                  :
                  <img src="http://primusdatabase.com/images/4/49/Not_Available.png" style={{width:this.props.WidthCard/2, height:this.props.WidthCard/4}}/>
                }
            </div>

            <div  style={{width: '100%', height : 30,backgroundColor : '#EEEEEE',display : 'flex',  flexDirection : 'row',justifyContent : 'center',cursor:'pointer',paddingLeft : 0,position:"relative",  paddingRight : 0,}}>
              <div style={{height : "100%", overflow : 'hidden', fontSize:10, width:this.props.WidthCard, display : 'flex', justifyContent : 'center',textAlign:"center"}}><strong>{this.props.Title}</strong>
              </div>

            </div>
          </div>
      </div>
    )
  }
}

let styles = {

    buttunBottom :{
      width: 25,
      height:25,
      margin:0,
      marginRight :10,
      padding:0,
      borderRadius:'10px',
      overflow:'hidden',
      borderWidth:0,
      backgroundColor : '#EEEEEE',
      outline:0,
    },
    dislike:{
      marginLeft:10
    }
}


const mapStateToProps = (state) => {
  return {
    accountState:state.accountStateRedux,
    connected:state.connectedRedux,
  }
}

const Card = connect(mapStateToProps, mapDispatchToProps)(CardComponent);
export default Card;
