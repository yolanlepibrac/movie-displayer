import React, { Component } from 'react';
import posed from 'react-pose';
import { listOfGenres } from '../API/TMDBAPI'
import WatchLaterButton from './WatchLaterButton';
import FavouritesButton from './FavouritesButton';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { PrivateRoute } from './PrivateRoute';

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";
import {BrowserView,MobileView,isBrowser,isMobile} from "react-device-detect";

const widthLikeBar = 200;
const heightRatio = 20;
const timerAnimation = 200;
const timerAnimationBarRatio = 500;
const HEART = require('../Assets/images/heart.png')




const BottomCard = posed.div({
    idle: {
      height : 0,
      overflow:'hidden',
      width:"100%",
      backgroundColor:"rgba(235,235,235,0)",
      transition: {
        duration: timerAnimation,
        ease: 'backInOut',
      }
     },
    hovered: {
      height : "100%",
      position:"absolute",
      bottom : 0,
      left:0,
      backgroundColor:"rgba(235,235,235,1)",
      width:"100%",
      transition: {
        duration: timerAnimation,
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass : 0.9
      }
     },
});


const NumberOfLike = posed.div({
    idle: {
      width : 0,
      backgroundColor:'#AAEEAA',
      transition: {
        duration: timerAnimationBarRatio,
        ease: 'backInOut',
        delay: timerAnimation,
      }
     },
    hovered: {
      width:"100%",
      backgroundColor:'#AAEEAA',
      transition: {
        duration: timerAnimationBarRatio,
        ease: 'linear',
        delay: 500,
      }
     },
});

const NumberOfDislike = posed.div({
    idle: {
      width : widthLikeBar,
      backgroundColor:'#EEAAAA',
      transition: {
        duration: timerAnimationBarRatio,
        ease: 'backInOut',
        delay: timerAnimation,
      }
     },
    hovered: {
      width:"100%",
      backgroundColor:'#EEAAAA',
      transition: {
        duration: timerAnimationBarRatio,
        ease: 'linear',
        delay: 500,
      }
     },
});

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
      like : false,
      heightBottomAnimation : 30,
      onHoverAnimation : false,
      hovered : false,
      likeLogo:require('../Assets/images/heartLiked.png'),
      borderLiked : "white",

      mount:false,
     }
  }


  ComponentDidMount = () => {
    this.setState({
      likes: this.props.Likes,
      dislikes : this.props.Dislikes,
    })
  }


  displayMovieDetail = (e) => {
    this.props.onClick(e, this.props.Movie);
  }

  onHoverCard = () => {
      this.setState({
        onHoverAnimation : true,
        hovered : true,
        mount:true,
      })
  }

  onLeaveCard = () => {
      this.setState({
        onHoverAnimation : false,
        hovered : false,
    })
  }

  renderComputer = () => {

    return(
      <div style={{width:  this.props.WidthCard*this.props.Size, height:(this.props.HeightCard+20)*this.props.Size, backgroundColor:"rgba(0,0,0,0)", marginLeft:20}}
          onMouseLeave={this.onLeaveCard} onMouseEnter={this.onHoverCard} >
          <div style={{width:  (this.props.WidthCard)*this.props.Size, height: (this.props.HeightCard-30)*this.props.Size, position:"relative"}}>
            {this.props.connected ?
              <FavouritesButton Movie={this.props.Movie}
              toggleInToFavourites={this.props.toggleInToFavourites}
              Size={this.props.Size}/>
              :
              null
            }
            <div style={{width:this.props.widthCard*this.props.Size, marginLeft:0, cursor:'pointer', height:'100%', display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"rgba(250,250,250,1)"}} onClick={(e)=> this.displayMovieDetail(e)}>
                {this.props.Src != "https://image.tmdb.org/t/p/w300null" ?
                  <img src={this.props.Src} style={{width:this.props.WidthCard*this.props.Size, height:'100%'}}/>
                  :
                  <img src="http://primusdatabase.com/images/4/49/Not_Available.png" style={{width:this.props.WidthCard*this.props.Size/2, height:this.props.WidthCard*this.props.Size/4}}/>
                }
            </div>

            <div  style={{width: '100%',display : 'flex',flexDirection : 'row',justifyContent : 'space-between',cursor:'pointer',paddingLeft : 0,paddingRight : 0, backgroundColor:"rgba(210,210,210,1)",}}>
              <div style={{position:"absolute", width: "100%", bottom : 0, left:0, height:-(this.props.HeightCard-30-150), overflow:"hidden"}}>
                <BottomCard pose={this.state.hovered ? "hovered" : "idle"} onClick={(e)=> this.displayMovieDetail(e)}>
                  <div style={{width:"100%", height:150*this.props.Size}}>
                    <div style={{width:'100%', height:heightRatio*this.props.Size, marginBottom:10, overflow:'hidden', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                      <div style={{ width:widthLikeBar*this.props.Size, display:'flex', flexDirection:'row', marginLeft:5, height:heightRatio*this.props.Size/2, justifyContent:'center', overflow:'hidden', alignItems:'center' }}>
                        <NumberOfLike pose={this.state.mount ? "hovered" : "idle"}>
                          <div style={{width: widthLikeBar*this.props.Size*this.props.Movie.vote_average/10, height:heightRatio*this.props.Size/2, margin:0}}>
                          </div>
                        </NumberOfLike>
                        <NumberOfDislike pose={this.state.mount ? "hovered" : "idle"}>
                          <div style={{width: widthLikeBar*this.props.Size*(10-this.props.Movie.vote_average)/10, height:heightRatio*this.props.Size/2, margin:0}}>
                          </div>
                        </NumberOfDislike>
                      </div>
                      <span style={{marginLeft:5, marginRight:15, width:100, fontSize:9*this.props.Size}}>
                        {this.props.Movie.vote_count}<span> votes</span>
                      </span>
                    </div>
                    <div style={{textAlign:"left", fontSize:12*this.props.Size, margin:5, paddingBottom:10}}>
                      {this.props.Movie.overview ? this.props.Movie.overview : <div>No description available</div>}
                    </div>
                  </div>
                </BottomCard>
              </div>
              <div style={{height : 20, overflow : 'hidden', width:30 }}>
              </div>
              <div style={{height : 20*this.props.Size, overflow : 'hidden', fontSize:13*this.props.Size, overflow:"hidden", display:"flex", marginTop:5, justifyContent:"center"}}><strong>{this.props.Movie.title}</strong>
              </div>
              <div style={{height : 20, overflow : 'hidden', minWidth:30 }}>
                {this.props.connected ?
                  <WatchLaterButton Movie={this.props.Movie} toggleInToWatchList={this.props.toggleInToWatchList} Size={this.props.Size}/>
                  :null
                }
              </div>

            </div>
          </div>
      </div>
    )
  }

  renderMobile = () => {
    const factorMobile = 2
    return(
      <div style={{width:  this.props.WidthCard*this.props.Size, height:(this.props.HeightCard+20)*this.props.Size, backgroundColor:"rgba(0,0,0,0)", marginLeft:20}}
          onMouseLeave={this.onLeaveCard} onMouseEnter={this.onHoverCard} >
          <div style={{width:  (this.props.WidthCard)*this.props.Size, height: (this.props.HeightCard-30)*this.props.Size, position:"relative", display:"flex", flexDirection:"column", justifyContent:"center"}}>
            {this.props.connected ?
              <FavouritesButton Movie={this.props.Movie}
              toggleInToFavourites={this.props.toggleInToFavourites}
              Size={this.props.Size*factorMobile}/>
              :
              null
            }
            <div style={{width:this.props.widthCard*this.props.Size, marginLeft:0, cursor:'pointer', height:'100%', display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"rgba(250,250,250,1)"}} onClick={(e)=> this.displayMovieDetail(e)}>
                {this.props.Src != "https://image.tmdb.org/t/p/w300null" ?
                  <img src={this.props.Src} style={{width:this.props.WidthCard*this.props.Size, height:'100%'}}/>
                  :
                  <img src="http://primusdatabase.com/images/4/49/Not_Available.png" style={{width:this.props.WidthCard*this.props.Size/2, height:this.props.WidthCard*this.props.Size/4}}/>
                }
            </div>

            <div  style={{width: '100%',display : 'flex',flexDirection : 'row',justifyContent : 'space-between',cursor:'pointer',paddingLeft : 0,paddingRight : 0, backgroundColor:"rgba(210,210,210,1)",}}>
              <div style={{height : 20*factorMobile, overflow : 'hidden', width:30*factorMobile }}>
              </div>
              <div style={{width:"100%", height : 20*this.props.Size*factorMobile, overflow : 'hidden', fontSize:13*this.props.Size, overflow:"hidden", display:"flex", marginTop:5, justifyContent:"center"}}><strong>{this.props.Movie.title}</strong>
              </div>
              <div style={{height : 20*factorMobile,  width:30*factorMobile}}>
                {this.props.connected ?
                  <WatchLaterButton Movie={this.props.Movie} toggleInToWatchList={this.props.toggleInToWatchList} Size={this.props.Size*1.5}/>
                  :null
                }
              </div>

            </div>
          </div>
      </div>
    )
  }



  render() {


    if (isMobile) {
      return (this.renderMobile())
    }else{
      return (this.renderComputer())
    }
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
