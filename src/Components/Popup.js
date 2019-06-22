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

      'height':'80%',
      'top':'10%',
      'left':'10%',
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



  render() {
    var Quit = require('../Assets/images/quit.png')
    return (
      <div style={{position: 'fixed', zIndex : 1000, backgroundColor: 'rgba(155,155,155, 0)', 'top':'0%', 'left':'0%', 'height':'100%',}} >
        <button onClick={this.props.closePopup}  style={{"width":"100%", "height":"100%", position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto', backgroundColor: 'rgba(155,155,155, 0.8)'}}></button>
        <PopUpAnimation pose={this.state.appear ? "hovered" : "idle"} style={{background: 'white', position : 'fixed', width:'80%'}}>
          <div className='menu' style={{width:'100%', height:25, color:'black', backgroundColor:'rgba(248,248,248,1)', display:'flex', justifyContent:'space-between'}}>
            <div style={{width:250, textAlign:'left', marginLeft:20, display:'flex', alignItems:'center', fontSize:22}}>{this.props.date}</div>
            <div style={{fontSize:22}}>
              {this.props.Title}
            </div>
            <div style={{display:'flex', flexDirection : 'row', alignItems : 'center', justifyContent : 'flex-end', width:250, }}>
               <div  onClick={this.props.closePopup} onMouseEnter={this.enter} onMouseLeave={this.leave} style={{ width:25, height:25,marginRight : 5, backgroundColor:this.state.backgroundColor, cursor:'pointer',  }}>
                <button  style={{'outline':'none', margin : this.state.margin, width:this.state.size, height:this.state.size,  backgroundColor:'rgba(0,0,0,0)', backgroundImage: "url("+ Quit +")", cursor:'pointer', backgroundSize: 'cover', borderWidth:0, borderColor:'rgba(200,200,200,0)'}}>
                </button>
                {this.state.hover ? <div style={{position :'fixed', paddingLeft : 10, paddingRight :10, fontSize : 18, backgroundColor : '#EFEFEF', color:'black', borderColor : 'black', borderWidth : 1, borderStyle:'solid'}}>Quit</div> : null }
              </div>
            </div>
          </div>
          <div style={{width: '100%', marginLeft : '0%',  height:'100%', backgroundColor: 'rgba(255,255,255, 1)', overflowY: 'scroll', borderWidth:1, borderColor:'#00173d', borderStyle:'solid'}}>
              <MovieDetail Id={this.props.Id}/>
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
