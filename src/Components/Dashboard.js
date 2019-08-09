import React from 'react';
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";

import API from '../Utils/API';
import ThemesItems from '../Utils/Themes';




function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
    connectedRedux:dispatch.connectedRedux,
  };
};


export class DashboardComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file: '',
            userName:localStorage.userName,
            email:localStorage.email,
        }
    }





    disconnect = () => {
        API.logout();
        this.props.changeAccountState({});
        this.props.disconnect()
      //  window.location = "/movies-displayer";
    }

    _handleImageChange(e, context) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend  = () => {
        console.log("done")
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          border:0,
        });

        if(reader.result.length < 6500000){
          API.setUserInfo({"imageProfil" : reader.result}, localStorage.email).then(function(data){
            console.log(data.data.email)
            API.getUserData(data.data.email).then(function(data2){
                context.props.changeAccountState(data2.data.userData);
                console.log(data2.data.userData)
              })
          })
        }else{
          alert('Image too big, choose another one please')
        }



      }
      if(file){
        reader.readAsDataURL(file)
      }

      this.forceUpdate()
    }

    click = () =>{
      console.log(this.props)
    }



    componentDidMount() {
      window.$('[data-toggle="popover"]').popover();
      window.$('[data-toggle="tooltip"]').tooltip();
      window.$('[data-toggle="tooltip').on('click', function () {
        window.$(this).tooltip('hide');
        window.$("#DeleteUserModal").modal();
      });
  }




    render() {
        var theme = this.props.accountState.theme ? ThemesItems[this.props.accountState.theme] : ThemesItems[0];
        function FavouritesActive() {
            return <div data-toggle="tooltip" data-placement="bottom" title="Favourites" style={{ overflow:"hidden", width:40, height:40, backgroundColor:theme.bouton.element3.interior, backgroundImage: "url(" + require('../Assets/images/heartB.png')+ ")", cursor:'pointer', backgroundSize: 'cover', borderRadius:"50%", borderStyle:"solid", borderWidth:1, borderColor:"black"}}>
            </div>;
        }
        function FavouritesInactive() {
            return <div data-toggle="tooltip" data-placement="bottom" title="Favourites" style={{ overflow:"hidden", width:40, height:40, backgroundColor:theme.bouton.element4.interior,  backgroundImage: "url(" + require('../Assets/images/heartB.png')+ ")", cursor:'pointer', backgroundSize: 'cover', borderRadius:"50%", borderStyle:"solid", borderWidth:1, borderColor:"black"}}>
            </div>;
        }
        function WatchLaterActive() {
            return <div data-toggle="tooltip" data-placement="bottom" title="Watch Later" style={{ overflow:"hidden", width:40, height:40, backgroundColor:theme.bouton.element3.interior, backgroundImage: "url(" + require('../Assets/images/watched3.png')+ ")", cursor:'pointer', backgroundSize: 'cover', borderRadius:"50%", borderStyle:"solid", borderWidth:1, borderColor:"black"}}>
            </div>;
        }
        function WatchLaterInactive() {
            return <div data-toggle="tooltip" data-placement="bottom" title="Watch Later" style={{ overflow:"hidden", width:40, height:40, backgroundColor:theme.bouton.element4.interior,  backgroundImage: "url(" + require('../Assets/images/watched3.png')+ ")", cursor:'pointer', backgroundSize: 'cover', borderRadius:"50%", borderStyle:"solid", borderWidth:1, borderColor:"black"}}>
            </div>;
        }
        function SettingsActive() {
            return <div data-toggle="tooltip" data-placement="bottom" title="Settings" style={{ overflow:"hidden", width:40, height:40, backgroundColor:theme.bouton.element3.interior, backgroundImage: "url(" + require('../Assets/images/settings.png')+ ")", cursor:'pointer', backgroundSize: 'cover', borderRadius:"50%", borderStyle:"solid", borderWidth:1, borderColor:"black"}}>
            </div>
        }
        function SettingsInactive() {
            return <div data-toggle="tooltip" data-placement="bottom" title="Settings" style={{ overflow:"hidden", width:40, height:40, backgroundColor:theme.bouton.element4.interior, backgroundImage: "url(" + require('../Assets/images/settings.png')+ ")", cursor:'pointer', backgroundSize: 'cover', borderRadius:"50%", borderStyle:"solid", borderWidth:1, borderColor:"black"}}>
            </div>
        }
        return(
            <div className="Dashboard" style={{zIndex:1000, borderRadius:20, "box-shadow": "-2px 2px 5px rgba(100,100,100,1)" , color:theme.background.element3.color, backgroundColor:theme.background.element3.interior, height:"100%", marginRight:10, width:"20vw", paddingTop:10 ,paddingBottom:10, borderStyle:"solid", borderWidth:0.2, borderColor:theme.bouton.element4.interior}} onClick={this.click}>

              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height:"100%", alignItems:"center"}}>
                <div style={{display:"flex", flexDirection:"column", fontSize:12, textAlign:"left", height:"100%", justifyContent:"space-between"}}>
                  <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", width:"12vw", fontSize:12, alignItems:"center", textAlign:"center"}}>
                    <div style={{display:"flex", flexDirection:"row"}}>{this.props.accountState.email ? this.props.accountState.email : localStorage.email}
                    </div>
                    <strong>{this.props.accountState.userName}
                    </strong>
                  </div>

                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
                      <Link to="/movies-displayer/favourites">
                        <Route exact path='/movies-displayer/favourites' component={FavouritesActive} />
                        <Route exact path='/movies-displayer/watchLater' component={FavouritesInactive} />
                        <Route exact path='/movies-displayer/settings' component={FavouritesInactive} />
                        <Route exact path='/movies-displayer/welcome' component={FavouritesInactive} />
                      </Link>
                      <Link to="/movies-displayer/watchLater">
                        <Route exact path='/movies-displayer/favourites' component={WatchLaterInactive} />
                        <Route exact path='/movies-displayer/watchLater' component={WatchLaterActive} />
                        <Route exact path='/movies-displayer/settings' component={WatchLaterInactive} />
                        <Route exact path='/movies-displayer/welcome' component={WatchLaterInactive} />
                      </Link>
                      <Link to="/movies-displayer/settings">
                        <Route exact path='/movies-displayer/favourites' component={SettingsInactive} />
                        <Route exact path='/movies-displayer/watchLater' component={SettingsInactive} />
                        <Route exact path='/movies-displayer/settings' component={SettingsActive} />
                        <Route exact path='/movies-displayer/welcome' component={SettingsInactive} />
                      </Link>
                    </div>

                  </div>
                  <div style={{display:"flex", flexDirection:"column", fontSize:12, textAlign:"center",alignItems:"center", overflow:"hidden", width:"8vw", height:"100%"}}>
                    <div >
                      <label for="file-input">
                        {this.props.accountState.imageProfil ?
                          <img width="70" height="70" src={this.props.accountState.imageProfil} style={{cursor:"pointer", borderWidth:0, borderStyle:"solid", borderRadius:"10%"}}/>
                          :
                          <img width="70" height="70" src={require('../Assets/images/connectBig.png')} style={{cursor:"pointer", borderWidth:1, borderStyle:"solid", borderRadius:"10%"}}/>
                        }
                      </label>
                      <input id="file-input" type="file" onChange={(e)=>this._handleImageChange(e, this)} style={{display: "none"}}/>
                      <Link to="/movies-displayer">
                        <div onClick={this.disconnect}   style={{ overflow:"hidden", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", textAlign:"center", width:70, height:30, backgroundColor:theme.bouton.element2.interior, color:"white",cursor:'pointer', backgroundSize: 'cover', borderRadius:10}}>
                        Disconnect
                        </div>
                      </Link>
                    </div>
                  </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    accountState:state.accountStateRedux,
    connected:state.connectedRedux,
  }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
export default Dashboard;
