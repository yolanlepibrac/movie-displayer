import React, { Component } from 'react';
import posed from 'react-pose';
import { listOfGenres } from '../API/TMDBAPI'

const widthLikeBar = 200;
const heightRatio = 20;
const timerAnimation = 200;
const timerAnimationBarRatio = 500;


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


export default class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      like : false,
      heightBottomAnimation : 30,
      onHoverAnimation : false,
      hovered : false,
      likeLogo:require('../Assets/images/heartLiked.png'),
      borderLiked : "white",
      watchLaterLogo : require('../Assets/images/watched.png'),
      toWatchHover : false,
      mount:false,
     }
  }


  ComponentDidMount = () => {
    this.setState({
      likes: this.props.Likes,
      dislikes : this.props.Dislikes,
    })
  }


  displayMovieDetail = () => {
    this.props.onClick(this.props.Movie);
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


  render() {
    const HEART = require('../Assets/images/heart.png')

    return (
      <div style={{width:  this.props.WidthCard*this.props.Size, height:(this.props.HeightCard+20)*this.props.Size, backgroundColor:"rgba(0,0,0,0)", marginLeft:20}}
          onMouseLeave={this.onLeaveCard} onMouseEnter={this.onHoverCard} >
          <div style={{width:  (this.props.WidthCard)*this.props.Size, height: (this.props.HeightCard-30)*this.props.Size, position:"relative"}}>
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
            <div style={{width:this.props.widthCard*this.props.Size, marginLeft:0, cursor:'pointer', height:'100%', display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"rgba(250,250,250,1)"}} onClick={this.displayMovieDetail}>
                {this.props.Src != "https://image.tmdb.org/t/p/w300null" ?
                  <img src={this.props.Src} style={{width:this.props.WidthCard*this.props.Size, height:'100%'}}/>
                  :
                  <img src="http://primusdatabase.com/images/4/49/Not_Available.png" style={{width:this.props.WidthCard*this.props.Size/2, height:this.props.WidthCard*this.props.Size/4}}/>
                }
            </div>

            <div  style={{width: '100%',display : 'flex',flexDirection : 'row',justifyContent : 'space-between',cursor:'pointer',paddingLeft : 0,paddingRight : 0,}}>
              <div style={{position:"absolute", width: "100%", bottom : 0, left:0, height:-(this.props.HeightCard-30-150), overflow:"hidden"}}>
                <BottomCard pose={this.state.hovered ? "hovered" : "idle"} onClick={this.displayMovieDetail}>
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
              <div style={{height:30*this.props.Size, width:30*this.props.Size, position:"relative", }} onClick={this.togglePutInToWatchedList} onMouseEnter={this.enterWatchLater} onMouseLeave={this.leaveWatchLater}>
                  {this.props.Movie.inToWatch ?
                    <img src={require('../Assets/images/watchedActive.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                    :
                    <img src={require('../Assets/images/watched.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                  }

                  {this.state.toWatchHover ? <div style={{position :'absolute', top:30, left:0, width:90, paddingLeft : 5, paddingRight :5, fontSize : 12, backgroundColor : '#EFEFEF', color:'black', borderColor : 'black', borderWidth : 0.5, borderStyle:'solid'}}>Watch it later</div> : null }
              </div>
            </div>
          </div>
      </div>
    )
  }
}
