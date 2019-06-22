import React, { Component } from 'react';
import posed from 'react-pose';
import { listOfGenres } from '../API/TMDBAPI'

const widthLikeBar = 200;
const widthCard = 250;
const heightCard = 400;
const heightRatio = 20;
const timerAnimation = 200;

const BottomCard = posed.div({
    idle: {
      height : 30,
      transition: {
        duration: timerAnimation,
        ease: 'linear',
      }
     },
    hovered: {
      height : 150,
      transition: {
        duration: timerAnimation,
        ease: 'linear',
      }
     },
});

const TopCard = posed.div({
    idle: {
      height : heightCard-30,
      transition: {
        duration: timerAnimation,
        ease: 'linear',
      }
     },
    hovered: {
      height : heightCard-150,
      transition: {
        duration: timerAnimation,
        ease: 'linear',
      }
     },
});

const ImageHeight = posed.div({
    idle: {
      height : heightCard-120,
      marginTop:0,
      transition: {
        duration: timerAnimation,
        ease: 'linear',
      }
     },
    hovered: {
      height : 0,
      marginTop:0,
      transition: {
        duration: timerAnimation,
        ease: 'linear',
      }
     },
});

const DescriptionHeight = posed.div({
    idle: {
      height : 0,
      marginTop:0,
      transition: {
        duration: timerAnimation,
        ease: 'linear',
      }
     },
    hovered: {
      height : heightCard-120,
      marginTop:0,
      transition: {
        duration: timerAnimation,
        ease: 'linear',
      }
     },
});

const WidthImage = posed.div({
    idle: {
      widthCardAnimation : widthCard,
      transition: {
        duration: timerAnimation,
        ease: 'linear',
      }
     },
    hovered: {
      widthCardAnimation : 0,
      transition: {
        duration: timerAnimation,
        ease: 'linear',
      }
     },
});
export default class Card extends Component {
  constructor (props) {
    super(props)
    this.state = {
      like : "",
      dislike : "",
      widthCardAnimation : widthCard,
      heightBottomAnimation : 30,
      onHoverAnimation : false,
      hovered : false,
     }
  }


  ComponentDidMount = () => {
    this.setState({
      likes: this.props.Likes,
      dislikes : this.props.Dislikes,
    })
  }


  like = () => {

    if(this.state.like === true){
      this.props.deletelike(this.props.Id);
      this.setState({
        like : false ,
      });
    }else if(this.state.dislike === true){
      this.props.addlike(this.props.Id);
      this.props.deletedislike(this.props.Id);
      this.setState({
        dislike:false,
        like:true,
      });
    }else{
      this.props.addlike(this.props.Id);
      this.setState({
        likes : this.state.likes+1,
        like:true,
      })
    }
  }

  dislike = () => {
    if(this.state.dislike === true){
      this.props.deletedislike(this.props.Id);
      this.setState({
        dislike : false ,
      })
    }else if(this.state.like === true){
      this.props.deletelike(this.props.Id);
      this.props.adddislike(this.props.Id);
      this.setState({
        like:false,
        dislike:true,
      })
    }else{
      this.props.adddislike(this.props.Id);
      this.setState({
        dislike:true,
      })
    }
  }

  displayMovieDetail = () => {
    this.props.displayMovieDetail(this.props.Id, this.props.Title);
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
      <div className="container" style={styles.card} onMouseEnter={this.onHoverCard} onMouseLeave={this.onLeaveCard}>
        <TopCard pose={this.state.hovered ? "hovered" : "idle"}>
          <div onClick={this.displayMovieDetail} style={{cursor:'pointer', height:'100%'}}>
            <div style={{height : 20, overflow : 'hidden'}}><strong>{this.props.Title}</strong>
            </div>
            <div style={{height : 15, marginBottom:5, marginTop:10, marginRight:10,marginLeft:10, fontSize:12, display:"flex", width:'100%', overflow:'hidden', flexDirection:'row'}}>
              {this.props.Category ?
                this.props.Category.map((nomCategory) => <div style={{padding : 0, marginLeft:5,marginRight:5, backgroundColor:'rgba(200,224,255,1)', borderRadius:5}}>{listOfGenres[nomCategory]}</div>):
                <div></div>
            }
            </div>
            <div style={{width:'100%', height:heightRatio, marginBottom:10, overflow:'hidden', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
              <div style={{ width:widthLikeBar, display:'flex', flexDirection:'row', marginLeft:15, height:heightRatio/2, borderRadius:heightRatio/2, justifyContent:'center', overflow:'hidden', alignItems:'center' }}>
                <div style={{width: widthLikeBar*this.props.Likes/(this.props.Likes+this.props.Dislikes), backgroundColor:'#AAEEAA', height:heightRatio/2}}>
                </div>
                <div style={{width: widthLikeBar*this.props.Dislikes/(this.props.Likes+this.props.Dislikes), backgroundColor:'#EEAAAA', height:heightRatio/2}}>
                </div>
              </div>
              <span style={{marginLeft:5, marginRight:15, width:100, fontSize:12}}>
                {this.props.NumberOfVotes}<span> votes</span>
              </span>
            </div>
            <div style={{width:90*this.state.widthCardAnimation/100, marginLeft:'5%'}}>
              <ImageHeight pose={this.state.hovered ? "hovered" : "idle"}>
                {this.props.Src != "https://image.tmdb.org/t/p/w300null" ?
                  <img src={this.props.Src} style={{width:90*this.state.widthCardAnimation/100, height:'100%'}}/>
                  :
                  <img src={require('../Assets/images/notAvailable.jpg')} style={{width:90*this.state.widthCardAnimation/100, height:'100%'}}/>
                }
              </ImageHeight >
              <DescriptionHeight pose={this.state.hovered ? "hovered" : "idle"} >
                <div style={{width:'100%', backgroundColor:'rgba(100,100,100,1)', height:'100%'}}>
                </div>
              </DescriptionHeight>
            </div>
          </div>

          <BottomCard pose={this.state.hovered ? "hovered" : "idle"}>
            <div  style={{width: '90%',
                          height : '100%',
                          backgroundColor : '#EEEEEE',
                          display : 'flex',
                          flexDirection : 'row',
                          justifyContent : 'space-between',
                          paddingLeft : '5%',
                          paddingRight : '5%',}}>
              <button style={styles.buttunBottom} onClick={this.favourite} onMouseEnter={this.onHoverFavourite} onMouseLeave={this.leaveFavourite}>
                <img src={require('../Assets/images/quit.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
              </button>
              <div>
                <button style={styles.buttunBottom} onClick={this.like} onMouseEnter={this.onHoverLike} onMouseLeave={this.leaveLike}>
                  {(this.state.like === true) ?
                    <img src={require('../Assets/images/likeActive.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                    :
                    <img src={require('../Assets/images/like.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                  }
                </button>
                <button style={styles.buttunBottom} onClick={this.dislike} onMouseEnter={this.onHoverDislike} onMouseLeave={this.leaveDislike}>
                  {(this.state.dislike === true)  ?
                    <img src={require('../Assets/images/dislikeActive.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                    :
                    <img src={require('../Assets/images/dislike.png')} style={{justifyContent : 'center', 'height':'100%', cursor : 'pointer'}}/>
                  }
                </button>
              </div>
            </div>
          </BottomCard>
        </TopCard>
      </div>
    )
  }
}

let styles = {
    card:{
      width:  widthCard,
      height: heightCard,
      margin : '10px',
      backgroundColor:'#F5F5F5'
    },
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
