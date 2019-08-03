import React, { Component } from 'react';
import posed from 'react-pose';
import MovieDetail from './MovieDetail';

const PopUpAnimation = posed.div({
    idle: {

      'height':'0%',
      'top':'0%',
      'left':'0%',
      transition: {
        duration: 1000,
        ease: 'linear'
      }
     },
    hovered: {

      'height':'80vh',
      'top':'10%',
      'left':'15vw',
      transition: {
        duration: 300,
        ease: 'easeOut'

      }
     },
});


class Popup extends React.Component {


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
    };
  }

  componentDidMount = () => {
    setTimeout(() => {this.setState({
      appear : true,
    })}, 0 );
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
    this.props.changeMovie(movie);
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
    var Quit = require('../Assets/images/quit.png')
    return (
      <div style={{position: 'fixed', zIndex : 10000, backgroundColor: 'rgba(155,155,155, 0)', 'top':'0%', 'left':'0%', 'height':'100%',}} >
        <button onClick={this.props.closePopup}  style={{"width":"100%", "height":"100%", position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto', backgroundColor: 'rgba(155,155,155, 0.8)'}}></button>
        <PopUpAnimation pose={this.state.appear ? "hovered" : "idle"} style={{background: 'white', position : 'fixed', width:'70vw', overflow:"hidden"}}>
          <div className='menu' style={{width:'100%', height:"5vh", color:'black', backgroundColor:'rgba(248,248,248,1)', display:'flex', justifyContent:'space-between'}}>
            <div style={{width:250, textAlign:'left', marginLeft:10, display:'flex', alignItems:'center', fontSize:22}}>
              <div onMouseEnter={this.deleteLikeEnter} onMouseLeave={this.deleteLikeLeave} onClick={this.toggleLikeCard} style={{width:30, height:30, top:5, right:5, borderRadius:"50%"}}>
              {this.props.Movie.inToFavourites ?
                <div  style={{width:30, height:30, borderWidth:1, borderStyle:"solid", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"50%", borderColor:"rgba(255,123,191,1)"}}>
                  <img src={this.state.likeLogo} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                </div>
                :
                <div  style={{width:30, height:30, borderWidth:1, borderStyle:"solid", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"50%", borderColor:"black"}}>
                  <img src={require('../Assets/images/heartB.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                </div>
              }
              </div>
              <div style={{height:30, width:30, display:"flex", justifyContent:"center", alignItems:"center", marginLeft:10 }} onClick={this.togglePutInToWatchedList} onMouseEnter={this.enterWatchLater} onMouseLeave={this.leaveWatchLater}>
                  {this.props.Movie.inToWatch ?
                    <img src={require('../Assets/images/watched2Active.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                    :
                    <img src={require('../Assets/images/watched2.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                  }
                  {this.state.toWatchHover ? <div style={{position :'absolute', top:30, left:0, width:90, paddingLeft : 5, paddingRight :5, fontSize : 12, backgroundColor : '#EFEFEF', color:'black', borderColor : 'black', borderWidth : 0.5, borderStyle:'solid'}}>Watch it later</div> : null }
              </div>
            </div>
            <div style={{fontSize:22}}>
              {this.props.Movie.title}
            </div>
            <div style={{display:'flex', flexDirection : 'row', alignItems : 'center', justifyContent : 'flex-end', width:250, }}>
               <div  onClick={this.props.closePopup} onMouseEnter={this.enter} onMouseLeave={this.leave} style={{ width:25, height:25,marginRight : 5, backgroundColor:this.state.backgroundColor, cursor:'pointer',  }}>
                  <button  style={{'outline':'none', margin : this.state.margin, width:this.state.size, height:this.state.size,  backgroundColor:'rgba(0,0,0,0)', backgroundImage: "url("+ Quit +")", cursor:'pointer', backgroundSize: 'cover', borderWidth:0, borderColor:'rgba(200,200,200,0)'}}>
                  </button>
                  {this.state.hover ? <div style={{position :'fixed', paddingLeft : 10, paddingRight :10, fontSize : 18, backgroundColor : '#EFEFEF', color:'black', borderColor : 'black', borderWidth : 1, borderStyle:'solid'}}>Quit</div> : null }
              </div>
            </div>
          </div>
          <div style={{width: '100%', marginLeft : '0%',  height:'100%', backgroundColor: 'rgba(255,255,255, 1)', overflowY: 'scroll', borderWidth:0, borderColor:'#00173d', borderStyle:'solid'}}>
              <MovieDetail Id={this.props.Movie.id} changeMovie={(movie)=>this.changeMovie(movie)}/>
          </div>
        </PopUpAnimation>
      </div>
    );
  }
}

let styles = {
    HomeMiddle: {
        backgroundColor : 'rgba(255,255,255,1)',

    },
}

export default Popup;
