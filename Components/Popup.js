import React, { Component } from 'react';
import posed from 'react-pose';
import MovieDetail from './MovieDetail';

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";
import {BrowserView,MobileView,isBrowser,isMobile} from "react-device-detect";
import { getImageFromApi } from '../API/TMDBAPI'
import { getVideoFromApi } from '../API/TMDBAPI'
import { getSimilarMoviesFromApi } from '../API/TMDBAPI'
import { getCreditsFromApi } from '../API/TMDBAPI'
import { getFilmDetailFromApi } from '../API/TMDBAPI';

const Quit = require('../Assets/images/quit.png')
var viewWidth = isMobile?'90vw':'70vw'
var viewMargin = isMobile?'5vw':'15vw'
var fontSize = isMobile?12:22

const PopUpAnimation = posed.div({
    idle: {
      height:'0%',
      left: ({x}) => (x),
      top:({y}) => (y),
      width:"0%",
      transition: {
        duration: 1000,
        ease: 'linear'
      }
    },
    hovered: {

      height:'80vh',
      top:'10vh',
      left:viewMargin,
      width:viewWidth,
      transition: {
        duration: 500,
        ease: 'backOut'

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



class PopupComponent extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      appear : false,
      size : 25,
      margin : 0,
      hover : false,
      backgroundColor:'rgba(248,248,248,1)',
      movie : this.props.Movie,
      likeLogo: this.props.Movie.inToFavourites ? require('../Assets/images/heartLiked.png') : require('../Assets/images/heartB.png'),
      borderLiked : "black",
      watchLaterLogo : require('../Assets/images/watched.png'),
      toWatchHover : false,
      tabOfFilmVisited:[this.props.Movie],
      filmDetail:undefined,
      isLoading:true,
      urlMovie:"",
      similarMovies:[],
      credits : [],
      allCredits:{},
      hoverPrevious : false,
    };
  }

  componentDidMount = () => {
    setTimeout(() => {this.setState({
      appear : true,
    })}, 0 );
    this.getMoviesData(this.props.Movie[0].id)


  }

  enter = () => {
    this.setState({
      size : 20,
      margin : 2.5,
      backgroundColor:'rgba(240,240,240,1)',
    })
    this.myTimer=setTimeout(()=>this.setState({ hover : true, }), 500)
  }
  leave = () => {
    this.setState({
      size : 25,
      margin : 0,
      hover : false,
      backgroundColor:'rgba(248,248,248,1)',
    })
    clearTimeout(this.myTimer)
  }

  changeMovie = (movie) => {
    this.getMoviesData(movie.id)
    this.props.changeMovie(movie);
  }

  previousMovie = () => {
    this.getMoviesData(this.props.Movie[1].id)
    this.props.previousMovie();
  }


  getMoviesData = (id) => {
    getFilmDetailFromApi(id).then(data => {
      console.log(data)
      this.setState({
        filmDetail: data,
        isLoading: false,
      })
    })
    getVideoFromApi(id).then(data => {
      if(data.results){
        if(data.results[0]){
          this.setState({
            urlMovie : 'https://www.youtube.com/embed/' + data.results[0].key,
          })
        }else{
          this.setState({
            urlMovie : 'https://www.youtube.com/embed/' + data.results.key,
          })
        }
      }
    })
    getSimilarMoviesFromApi(id).then(data => {
      this.setState({
        similarMovies : data.results,
      })
    })
    getCreditsFromApi(id).then(data => {
      let director = "";
      let scenarist = "";
      let producer = "";
      let photographyDirector = "";
      let artisticDirector = "";
      let animationDirector = "";
      let musicEditor = "";
      let musicComposer = "";
      for (var i = 0; i < data.crew.length;i++){
        if(data.crew[i].job == "Director"){
          director = data.crew[i].name
        }
        if(data.crew[i].job == "Screenplay"){
          scenarist = data.crew[i].name
        }
        if(data.crew[i].job == "Director of Photography"){
          photographyDirector = data.crew[i].name
        }
        if(data.crew[i].job == "Producer"){
          producer = data.crew[i].name
        }
        if(data.crew[i].job == "Art Direction"){
          artisticDirector = data.crew[i].name
        }
        if(data.crew[i].job == "Music Editor"){
          musicEditor = data.crew[i].name
        }
        if(data.crew[i].job == "Animation Director"){
          animationDirector = data.crew[i].name
        }
        if(data.crew[i].job == "Original Music Composer"){
          musicComposer = data.crew[i].name
        }
      }
      this.setState({
        allCredits : {
          credits : data,
          director : director,
          scenarist : scenarist,
          producer : producer,
          photographyDirector : photographyDirector,
          artisticDirector : artisticDirector,
          musicEditor : musicEditor,
          musicComposer : musicComposer,
        }
      })
    })
  }








  toggleLikeCard = () => {
    this.props.toggleInToFavourites(this.props.Movie[0])
  }

  deleteLikeEnter = () => {
    if(this.props.Movie[0].inToFavourites){
      this.setState({
        likeLogo: require('../Assets/images/quitLiked.png') ,
      })
    }
  }

  deleteLikeLeave = () => {
    if(this.props.Movie[0].inToFavourites){
      this.setState({
        likeLogo: require('../Assets/images/heartLiked.png') ,
      })
    }
  }

  togglePutInToWatchedList = () => {
    this.props.toggleInToWatchList(this.props.Movie[0])
  }

  enterWatchLater = () => {
    if(this.props.Movie[0].inToWatchList === false) {
      this.setState({
        watchLaterLogo : require('../Assets/images/watchedInvert.png'),
      })
      this.myTimer=setTimeout(()=>this.setState({ toWatchHover : true, }), 500)
    }

  }

  leaveWatchLater = () => {
    if(this.props.Movie[0].inToWatchList === false) {
      this.setState({
        watchLaterLogo : require('../Assets/images/watched.png'),
        toWatchHover : false,
      })
      clearTimeout(this.myTimer)
    }
  }

  enterPrevious = () => {
    this.setState({hoverPrevious:true})
  }

  leavePrevious = () => {
    this.setState({hoverPrevious:false})
  }



  render() {


      return (
        <div style={{position:"absolute", zIndex : 10000, backgroundColor: 'rgba(155,155,155, 0)', 'top':'0%', 'left':'0%', 'height':'100%',}} >
          <button onClick={(e) => this.props.closePopup(e)}  style={{"width":"100%", "height":"100%", position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto', backgroundColor: 'rgba(210,210,210, 0.8)'}}></button>
          <PopUpAnimation pose={this.state.appear ? "hovered" : "idle"} x={this.props.X} y={this.props.Y} style={{background: 'white', position : 'absolute', overflow:"hidden", boxShadow: '0px 5px 5px 0 rgba(0, 0, 0, 0.5)',padding:1}}>
            <div className='menu' style={{width:'100%', height:"5vh", color:'black', backgroundColor:'rgba(248,248,248,1)', display:'flex', justifyContent:'space-between'}}>
              <div style={{width:50, textAlign:'left', display:'flex',marginLeft:10,  alignItems:'center', fontSize:fontSize}}>
                {this.props.Movie.length>1?
                  <div style={{height:30, width:50, display:"flex", justifyContent:"center", alignItems:"center", marginRight:10, borderRadius:"50%", backgroundColor:this.state.hoverPrevious ? "rgba(100,100,100,0.3)" : "rgba(100,100,100,0)" }} onClick={this.previousMovie} onMouseEnter={this.enterPrevious} onMouseLeave={this.leavePrevious}>
                    <img src={require('../Assets/images/previous.png')} style={{justifyContent : 'center', height:30, cursor : 'pointer' }}/>
                  </div>
                  :null
                }
                {this.props.connected ?
                  <div style={{width:50, textAlign:'left', display:'flex', alignItems:'center', fontSize:fontSize}}>
                    <div onMouseEnter={this.deleteLikeEnter} onMouseLeave={this.deleteLikeLeave} onClick={this.toggleLikeCard} style={{width:30, height:30, top:5, right:5, borderRadius:"50%"}}>
                      {this.props.Movie[0].inToFavourites ?
                        <div style={{width:30, height:30, borderWidth:1, borderStyle:"solid", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"50%", borderColor:"rgba(255,123,191,1)"}}>
                          <img src={this.state.likeLogo} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                        </div>
                        :
                        <div  style={{width:30, height:30, borderWidth:1, borderStyle:"solid", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"50%", borderColor:"black"}}>
                          <img src={require('../Assets/images/heartB.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                        </div>
                      }
                    </div>
                    <div style={{height:30, width:30, display:"flex", justifyContent:"center", alignItems:"center", marginLeft:10 }} onClick={this.togglePutInToWatchedList} onMouseEnter={this.enterWatchLater} onMouseLeave={this.leaveWatchLater}>
                        {this.props.Movie[0].inToWatch ?
                          <img src={require('../Assets/images/watched2Active.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                          :
                          <img src={require('../Assets/images/watched2.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                        }
                        {this.state.toWatchHover ? <div style={{position :'absolute', top:30, left:0, width:90, paddingLeft : 5, paddingRight :5, fontSize : 12, backgroundColor : '#EFEFEF', color:'black', borderColor : 'black', borderWidth : 0.5, borderStyle:'solid'}}>Watch it later</div> : null }
                    </div>
                  </div>
                :null
                }
              </div>

              <div style={{fontSize:fontSize}}>
                {this.props.Movie[0].title}
              </div>
              <div style={{display:'flex', flexDirection : 'row', alignItems : 'center', justifyContent : 'flex-end', width:50, }}>
                 <div  onClick={(e) => this.props.closePopup(e)} onMouseEnter={this.enter} onMouseLeave={this.leave} style={{ width:25, height:25,marginRight : 5, backgroundColor:this.state.backgroundColor, cursor:'pointer',  }}>
                    <button  style={{'outline':'none', margin : this.state.margin, width:this.state.size, height:this.state.size,  backgroundColor:'rgba(0,0,0,0)', backgroundImage: "url("+ Quit +")", cursor:'pointer', backgroundSize: 'cover', borderWidth:0, borderColor:'rgba(200,200,200,0)'}}>
                    </button>
                    {this.state.hover ? <div style={{position :'fixed', paddingLeft : 10, paddingRight :10, fontSize : 18, backgroundColor : '#EFEFEF', color:'black', borderColor : 'black', borderWidth : 1, borderStyle:'solid'}}>Quit</div> : null }
                </div>
              </div>
            </div>
            <div style={{width: '100%', marginLeft : '0%',  height:'100%', backgroundColor: 'rgba(255,255,255, 1)', overflowY: 'hidden', borderWidth:0, borderColor:'#00173d', borderStyle:'solid'}}>
                <MovieDetail Id={this.props.Movie[0].id} changeMovie={(movie)=>this.changeMovie(movie)} filmDetail={this.state.filmDetail} isLoading={this.state.isLoading} urlMovie={this.state.urlMovie} similarMovies={this.state.similarMovies} allCredits={this.state.allCredits}/>
            </div>
          </PopUpAnimation>
        </div>
      )
  }
}

let styles = {
    HomeMiddle: {
        backgroundColor : 'rgba(255,255,255,1)',

    },
}

const mapStateToProps = (state) => {
  return {
    accountState:state.accountStateRedux,
    connected:state.connectedRedux,
  }
}

const Popup = connect(mapStateToProps, mapDispatchToProps)(PopupComponent);
export default Popup;
