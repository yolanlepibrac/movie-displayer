import React, { Component } from 'react';




export default class CastingCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayName : false
     }
  }

  displayName = () => {
    console.log("true")
    this.setState({
      displayName : true
    })
  }

  hideName = () => {
    console.log("false")
    this.setState({
      displayName : false
    })
  }

  render() {
    return (
      <div style={{width:  this.props.Width, height: this.props.Height, backgroundColor:"rgba(0,0,0,0)", marginRight:10, position:"relative", marginBottom:10, marginTop:10}}>

          {this.state.displayName ?
            <div style={{width:this.props.Width, height:this.props.Height, cursor:"pointer", textAlign:"left", fontSize:12, textAlign:"center", backgroundColor:'rgba(255,255,255,1)', display:"flex", flexDirection:"column", justifyContent:"left"}}
            onClick={this.hideName}>
              <strong>
                {this.props.Person ? this.props.Person.name : "no information"}
              </strong>
              <div>
                {this.props.Person ? this.props.Person.character : "about this character"}
              </div>
            </div>
            :
            <div style={{width:  this.props.Width, height: this.props.Height, cursor:"pointer"}} onClick={this.displayName}>
              <div style={{width:this.props.Width, marginLeft:0, height:'100%', display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"rgba(250,250,250,1)"}}>
                  {this.props.Person ?
                    <img src={"https://image.tmdb.org/t/p/w300" + this.props.Person.profile_path} style={{width:this.props.Width, height:'100%'}}/>
                    :
                    <img src="http://primusdatabase.com/images/4/49/Not_Available.png" style={{width:this.props.Width/2, height:this.props.Width/4}}/>
                  }
              </div>
            </div>
          }
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
