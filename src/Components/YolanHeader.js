
import React, { Component } from 'react';


export default class YolanHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      like : "",
      dislike : "",
     }
  }

  render(){
    return(
      <header  style={{zIndex: 100,
                        height: '5vh',
                        width : '100%',
                        backgroundColor: '#00173d',
                        boxShadow: '0px 5px 3px 0 rgba(0, 0, 0, 0.5)',
                        position: 'absolute',
                        position: 'fixed',
                        top:0,
                        left:0,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 'calc(10px + 2vmin)',
                        color: 'white',
                      }}>
          <div style={{fontFamily: 'codelight', marginLeft : 50, width : 200, textAlign :'left', fontSize:20}}>{this.state.pageName}
          </div>
          <a href="http://yolan-pibrac.com/home/" style={{ fontSize: 17, textDecoration:'none', color:'white'}}>
            yolan-pibrac.com
          </a>
          <div className="menu" style={{marginRight:50}} >

            <div style={{flex:1, width : 200}} >
            </div>
          </div>
      </header>
    )
  }
}
