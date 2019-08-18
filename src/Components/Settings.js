import React, { Component } from 'react';
import Card from './Card';
import Popup from './Popup';
import SliderSizeCard from './SliderSizeCard';
import BoutonTheme from './BoutonTheme';
import ItemEditProfile from './ItemEditProfile';
import { getImageFromApi } from '../API/TMDBAPI'
import { Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton  } from "react-bootstrap";
import { DropdownMenu, MenuItem, DropdownItem, DropdownToggle } from 'react-bootstrap-dropdown-menu';
import API from '../Utils/API';
import ThemesItems from '../Utils/Themes';
import { displayLoading } from "../Actions/index";
import {BrowserView,MobileView,isBrowser,isMobile} from "react-device-detect";

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";

let MovieExemple = {
  adult: false,
  backdrop_path: "/mMZRKb3NVo5ZeSPEIaNW9buLWQ0.jpg",
  belongs_to_collection: null,
  budget: 63000000,
  genres: [{id: 18, name: "Drame"}],
  homepage: "http://www.foxmovies.com/movies/fight-club",
  id: 550,
  imdb_id: "tt0137523",
  original_language: "en",
  original_title: "Fight Club",
  overview: "Le narrateur, sans identité précise, vit seul, travaille seul, dort seul, mange seul ses plateaux-repas pour une personne comme beaucoup d’autres personnes seules qui connaissent la misère humaine, morale et sexuelle. C’est pourquoi il va devenir membre du Fight club, un lieu clandestin où il va pouvoir retrouver sa virilité, l’échange et la communication. Ce club est dirigé par Tyler Durden, une sorte d’anarchiste entre gourou et philosophe qui prêche l’amour de son prochain.",
  popularity: 28.076,
  poster_path: "/zu1BxIKlhTXXIATPINnzg2rwy97.jpg",
  production_companies: [
    {id: 508,
    logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
    name: "Regency Enterprises",
    origin_country: "US"},
    {id: 711,
    logo_path: "/tEiIH5QesdheJmDAqQwvtN60727.png",
    name: "Fox 2000 Pictures",
    origin_country: "US"},
    {id: 20555,
    logo_path: "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
    name: "Taurus Film",
    origin_country: "DE"},
    {id: 54051,
    logo_path: null,
    name: "Atman Entertainment",
    origin_country: ""},
    {id: 54052,
    logo_path: null,
    name: "Knickerbocker Films",
    origin_country: "US"},
    {id: 25,
    logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
    name: "20th Century Fox",
    origin_country: "US"},
    {id: 4700,
    logo_path: "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
    name: "The Linson Company",
    origin_country: ""}
  ],
  production_countries: (2) [
    {iso_3166_1: "DE",
    name: "Germany"},
    {iso_3166_1: "US",
    name: "United States of America"}
  ],
  release_date: "1999-10-15",
  revenue: 100853753,
  runtime: 139,
  spoken_languages: [{iso_639_1: "en", name: "English"}],
  status: "Released",
  tagline: "Chaos. Confusion. Savon.",
  title: "Fight Club",
  video: false,
  vote_average: 8.4,
  vote_count: 16592,
}

const Months = [
  'janvier',
  'fevrier',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'aout',
  'septembre',
  'octobre',
  'novembre',
  'decembre',
]

const Days = [
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
]

const Themes = [
  {color1 : "black", bacgroundColor1:"white", color2:"black", backgroundColor2:"grey", id:1},
  {color1 : "rgba(0,0,0,1)", bacgroundColor1:"rgba(255,123,192,1)", color2:"rgba(255,255,255,1)", backgroundColor2:"rgba(200,200,200,1)", id:2},
  {color1 : "rgba(0,255,0,1)", bacgroundColor1:"rgba(255,255,192,1)", color2:"rgba(255,0,255,1)", backgroundColor2:"rgba(255,200,200,1)", id:3},
  {color1 : "rgba(0,0,0,1)", bacgroundColor1:"rgba(255,123,192,1)", color2:"rgba(10,20,30,1)", backgroundColor2:"rgba(200,200,200,1)", id:4},
  {color1 : "rgba(0,0,0,1)", bacgroundColor1:"rgba(29,210,177,1)", color2:"rgba(255,255,255,1)", backgroundColor2:"rgba(0,0,0,1)", id:5},
  {color1 : "rgba(0,0,0,1)", bacgroundColor1:"rgba(230,123,192,1)", color2:"rgba(155,155,155,1)", backgroundColor2:"rgba(200,200,200,1)", id:6},
  {color1 : "rgba(0,0,0,1)", bacgroundColor1:"rgba(156,25,25,1)", color2:"rgba(230,230,230,1)", backgroundColor2:"rgba(100,100,100,1)", id:7},
  {color1 : "rgba(0,0,0,1)", bacgroundColor1:"rgba(255,123,192,1)", color2:"rgba(255,0,110,1)", backgroundColor2:"rgba(130,255,211,1)", id:8},
  {color1 : "rgba(0,0,0,1)", bacgroundColor1:"rgba(28,156,0,1)", color2:"rgba(120,255,10,1)", backgroundColor2:"rgba(200,127,15,1)", id:9},
  {color1 : "rgba(0,0,0,1)", bacgroundColor1:"rgba(23,0,0,1)", color2:"rgba(255,255,255,1)", backgroundColor2:"rgba(10,10,100,1)", id:10},
]

function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
    displayLoading: (boolean) => dispatch(displayLoading(boolean)),
  };
};








class SettingsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sizeCard : this.props.accountState.sizeCard ? this.props.accountState.sizeCard : 1,
      month : "Month",
      year : "Year",
      day : "Day",
      tabOfDay : ["Choose Month"],
      sex:"",
      modifyingSizeCard : false,
      backgroundModifyButton : "rgba(100,100,100,1)",
      themeSelected : 1,
    };
  }

  componentDidMount(){

    if(this.props.accountState.sex){
      if(this.props.accountState.sex === "female"){
        window.$("#female").prop("checked", true)
      }else{
        window.$("#male").prop("checked", true)
      }
    }
  }

  modifieSizeCard = () => {
    this.setState({
      modifyingSizeCard : true
    })
  }

  validateSizeCard = () => {
    this.props.displayLoading(true)
    this.setToDatabase(this.state.sizeCard, "sizeCard", this);
    this.setState({
      modifyingSizeCard : false
    })
  }



  toggleBackgroundModifyButton = () => {
    this.setState({
      backgroundModifyButton : this.state.backgroundModifyButton === "rgba(100,100,100,1)" ? "rgba(100,100,100,0.5)" : "rgba(100,100,100,1)"
    })
  }



  setToDatabase = (value, key, context) => {
      if(key === "birthMonth"){
        this.putInState(value, key)
      }
      if(key === "email"){
        API.setUserInfo({[key] : value}, localStorage.email).then(function(data){
          API.getUserData(data.data.userData.email).then(function(data2){
              context.props.changeAccountState(data2.data.userData);
              console.log(data2.data.userData)
              context.props.displayLoading(false)
            })
          localStorage.setItem("email", value)
        })
      }else{
        API.setUserInfo({[key] : value}, localStorage.email).then(function(data){
          API.getUserData(data.data.email).then(function(data2){
              context.props.changeAccountState(data2.data.userData);
              localStorage.setItem("userData", JSON.stringify(data2.data.userData))
              context.props.displayLoading(false)
            })
        })
      }
  }

  setValue = (e) => {
    this.setState({
      sizeCard : e.target.value
    })
  }

  setSexFemale = (e) => {
    this.props.displayLoading(true)
    window.$("#female").prop("checked", true)
    this.setToDatabase("female", "sex", this)
  }

  setSexMale = (e) => {
    this.props.displayLoading(true)
    window.$("#male").prop("checked", true);
    this.setToDatabase("male", "sex", this)
  }

  toggleInToWatchList = () => {
    MovieExemple.inToWatch = MovieExemple.inToWatch ? false : true;
  }

  toggleInToFavourites = () => {
    MovieExemple.inToFavourites = MovieExemple.inToFavourites ? false : true;
  }

  returnItemList = (stateValue, stateKey) => {
    return <div style={{cursor:"pointer"}} class="dropdown-item" onClick={(context)=>this.setToDatabase(stateValue, stateKey, this)}>{stateValue}</div>
  }

  putInState = (stateValue, stateKey) => {
    console.log(stateValue)
    if(stateKey === "birthMonth"){
      this.setNumberOfDay(stateValue)

    }
    this.setState({
      [stateKey] : stateValue
    })
  }

  setNumberOfDay = (month) => {
    var numberDay = 0
    for (var i = 0; i < Months.length; i++) {
      if(month === Months[i] ){
        numberDay = Days[i]
      }
    }
    var tabDay = []
    for(var i=1;i<=numberDay;i++){
      tabDay.push(i)
    }
    this.setState({
      tabOfDay : tabDay,
    })

  }

  changePassword = () => {
    alert("not available now")
  }

  BoutonTheme = (theme) => {
    return null
  }

  chooseTheme = (id) => {
    this.props.displayLoading(true)
    this.setToDatabase(id, "theme", this);
  }


  renderComputer = () => {
    let listeOfDate = []
    var currentYear = new Date().getFullYear()
    for(var i=currentYear;i>1930;i--){
      listeOfDate.push(i)
    }
    var theme = this.props.accountState.theme ? ThemesItems[this.props.accountState.theme] : ThemesItems[0];
    return (
      <div style={{display:"flex", flexDirection:"column", backgroundColor:theme.background.element1.interior, alignItems:"center", paddingBottom:50, paddingTop:2, overflowY:"auto",}}>
        <div style={{height:"100%", width:"70%"}}>
          <h5>SETTINGS</h5>
          <div style={{paddingBottom:30, width: '100%', display: 'flex', flexDirection: 'column', flexWrap:'wrap', marginTop:10, marginBottom:10, alignItems:"flex-start", overflowX:"hidden", backgroundColor:theme.background.element2.interior, color:theme.background.element2.color}}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:"flex-start",  paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:"rgba(200,200,200,1)", borderBottomStyle:"solid"}}>
              <div style={{marginLeft:10}}>Profile</div>
            </div>
            <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"row"}}>
              <div style={{width:250, height:250, paddingTop:25, paddingLeft:20, display: 'flex', flexDirection: 'column', alignItems:"flex-start",}}>
                <strong style={{width: 200, textAlign:"left", fontSize:13, marginBottom:10}}>Profile Picture</strong>
                <label for="file-input">
                  {this.props.accountState.imageProfil ?
                    <img width="160" height="160" src={this.props.accountState.imageProfil} style={{cursor:"pointer", borderWidth:0, borderStyle:"solid", borderRadius:"10%"}}/>
                    :
                    <img width="160" height="160" src={require('../Assets/images/connectBig.png')} style={{cursor:"pointer", borderWidth:1, borderStyle:"solid", borderRadius:"10%"}}/>
                  }
                </label>
              </div>
              <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column", paddingTop:20, paddingLeft:20}}>
                <ItemEditProfile onSubmit={(value)=>this.setToDatabase(value, "name", this)} placeHolder={"name"} placeHolderValue={this.props.accountState.name ? this.props.accountState.name : ""} value={this.props.accountState.name}  heightSize={1}/>
                <ItemEditProfile onSubmit={(value)=>this.setToDatabase(value, "userName", this)} placeHolder={"user name"} placeHolderValue={this.props.accountState.userName ? this.props.accountState.userName : ""} value={this.props.accountState.userName}  heightSize={1}/>
                <div style={{width:"100%", display : "flex", flexDirection:"column", paddingLeft:20, marginBottom:20}}>
                  <strong style={{width: 200, textAlign:"left", fontSize:13}}>Birth</strong>
                  <div style={{width:"100%", display : "flex", flexDirection:"row"}}>
                    <div style={{marginRight:50}}>
                      <button style={{width:100, backgroundColor:"rgba(245,245,245,1)", color:"black", height:30, fontSize:15, padding:0, margin:0}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.props.accountState.birthYear ? this.props.accountState.birthYear : "Year"}
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{height:200, overflow:"auto"}}>
                        {listeOfDate.map((year)=>this.returnItemList(year, "birthYear"))}
                      </div>
                    </div>
                    <div style={{marginRight:50}}>
                      <button style={{width:100, backgroundColor:"rgba(245,245,245,1)", color:"black", height:30, fontSize:15, padding:0, margin:0}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.props.accountState.birthMonth ? this.props.accountState.birthMonth : "Month"}
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{height:200, overflow:"auto"}}>
                        {Months.map((month)=>this.returnItemList(month, "birthMonth"))}
                      </div>
                    </div >
                    <div style={{marginRight:50}}>
                      <button style={{width:100, backgroundColor:"rgba(245,245,245,1)", color:"black", height:30, fontSize:15, padding:0, margin:0}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.props.accountState.birthDay ? this.props.accountState.birthDay : "Day"}
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{height:200, overflow:"auto"}}>
                        {this.state.tabOfDay.map((day)=>this.returnItemList(day, "birthDay"))}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"row", marginLeft:20, fontSize:14}}>
                  <div class="custom-control custom-radio custom-control-inline" onClick={this.setSexFemale}>
                    <input type="radio" id="female" name="gender" class="custom-control-input"/>
                    <label class="custom-control-label" for="customRadioInline1" style={{cursor:"pointer"}}><strong>Female</strong></label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline" onClick={this.setSexMale}>
                    <input type="radio" id="male" name="gender" class="custom-control-input"/>
                    <label class="custom-control-label" for="customRadioInline2" style={{cursor:"pointer"}}><strong>Male</strong></label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{paddingBottom:30,width: '100%', display: 'flex', flexDirection: 'column', flexWrap:'wrap', marginTop:10, alignItems:"flex-start", overflowX:"hidden", overflowY:"auto", backgroundColor:theme.background.element2.interior, color:theme.background.element2.color}}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:"flex-start",  paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:"rgba(200,200,200,1)", borderBottomStyle:"solid"}}>
              <div style={{marginLeft:10}}>Contact</div>
            </div>
            <ItemEditProfile onSubmit={(value)=>this.setToDatabase(value, "email", this)} placeHolder={"email"} placeHolderValue={this.props.accountState.email ? this.props.accountState.email : ""} value={this.props.accountState.email} heightSize={1}/>
            <ItemEditProfile onSubmit={(value)=>this.setToDatabase(value, "phone", this)} placeHolder={"phone"} placeHolderValue={this.props.accountState.phone ? this.props.accountState.phone : ""} value={this.props.accountState.phone} heightSize={1}/>
            <ItemEditProfile onSubmit={(value)=>this.setToDatabase(value, "adresse", this)} placeHolder={"address"} placeHolderValue={this.props.accountState.adresse ? this.props.accountState.adresse : ""} value={this.props.accountState.adresse} heightSize={2}/>
          </div>

          <div style={{paddingBottom:30,width: '100%', display: 'flex', flexDirection: 'column', flexWrap:'wrap', marginTop:10, alignItems:"flex-start", overflowX:"hidden", overflowY:"auto", backgroundColor:theme.background.element2.interior, color:theme.background.element2.color}}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:"flex-start",  paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:"rgba(200,200,200,1)", borderBottomStyle:"solid"}}>
              <div style={{marginLeft:10}}>Security</div>
            </div>
            <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", marginLeft:20, marginBottom:5, marginTop:5}}>
              <strong style={{width: 200, textAlign:"left", fontSize:13}}>{"Password"}</strong>
              <div style={{width: 800, display: 'flex', flexDirection: 'row', alignItems:"center", marginBottom:5, marginTop:5, fontSize:15, justifyContent:"flex-start", marginLeft:0, marginRight:0,}}>
                <div style={{width: 200, height:30*this.props.heightSize, textAlign:"left", display: 'flex', flexDirection: 'column', justifyContent:"center", backgroundColor:"rgba(245,245,245,1)", borderRadius:3, paddingLeft:20, marginRight:20, color:"black", borderWidth:1, borderStyle:"solid", borderColor:"rgba(150,150,150,1)"}}>
                {"•••••••••"}
              </div>
              <button style={{width: 150, height:30, fontSize:16, textAlign:"center", justifyContent:"flex-start", marginLeft:30, padding:0, color:"white", borderWidth:0}} type="button" class="btn btn-secondary btn-lg" onClick={this.changePassword}>Modifie</button>
              </div>
            </div>
          </div>


          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexWrap:'wrap', marginTop:10, alignItems:"flex-start", overflowX:"hidden", overflowY:"auto", backgroundColor:theme.background.element2.interior, color:theme.background.element2.color}}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:"flex-start",  paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:"rgba(200,200,200,1)", borderBottomStyle:"solid"}}>
              <div style={{marginLeft:10}}>General</div>
            </div>

            <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
              <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems:"flex-start", marginLeft:50}}>
                <label style={{marginLeft:30}} for="formControlRange">CARDS SIZE</label>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems:"center", marginBottom:20}}>
                  {this.state.modifyingSizeCard ?
                    <SliderSizeCard setValue={this.setValue} onClick={this.validateSizeCard}/>
                    :
                    <div>
                      <button onClick={() => this.modifieSizeCard(this.setPositionOfCursorSizeCard)} onMouseEnter={this.toggleBackgroundModifyButton} onMouseLeave={this.toggleBackgroundModifyButton} style={{width: 200*this.props.accountState.sizeCard, height:30, fontSize:16, textAlign:"center", justifyContent:"flex-start", marginLeft:20, padding:0, backgroundColor:this.state.backgroundModifyButton, color:"white", borderWidth:0}} type="button" class="btn btn-secondary btn-lg" >Modifie</button>
                    </div>
                  }
                </div>
                <div style={{width: 400, height:500, overflow:"hidden"}}>
                  {this.state.popupIsActive ? <div><Popup closePopup={this.togglePopup} Id={this.state.currentMovieId} Title={this.state.currentMovieTitle}/></div> : <div></div>}
                  <Card
                    Movie = {MovieExemple}
                    Size = {this.state.sizeCard}
                    WidthCard = {200}
                    HeightCard = {300}
                    Src={getImageFromApi(MovieExemple.poster_path)}
                    onClick={this.props.togglePopup}
                    toggleInToWatchList = {this.toggleInToWatchList}
                    toggleInToFavourites = {this.toggleInToFavourites}
                    />

                </div>
              </div>
              <div>
                <label for="formControlRange">THEMES</label>
                <div style={{display:"flex", width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
                {ThemesItems.map((theme)=><BoutonTheme theme={theme} chooseTheme={this.chooseTheme} themeSelected={this.props.accountState.theme}/>)}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }



  renderMobile = () => {
    let listeOfDate = []
    var currentYear = new Date().getFullYear()
    for(var i=currentYear;i>1930;i--){
      listeOfDate.push(i)
    }
    var theme = this.props.accountState.theme ? ThemesItems[this.props.accountState.theme] : ThemesItems[0];
    return (
      <div style={{display:"flex", flexDirection:"column", backgroundColor:theme.background.element1.interior, alignItems:"center", paddingBottom:50, paddingTop:2, overflowY:"auto",}}>
        <div style={{height:"100%", width:"95%"}}>
          <h5>SETTINGS</h5>
          <div style={{paddingBottom:30, width: '100%', display: 'flex', flexDirection: 'column', flexWrap:'wrap', marginTop:10, marginBottom:10, alignItems:"flex-start", overflowX:"hidden", backgroundColor:theme.background.element2.interior, color:theme.background.element2.color}}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:"flex-start",  paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:"rgba(200,200,200,1)", borderBottomStyle:"solid"}}>
              <div style={{marginLeft:10}}>Profile</div>
            </div>


            <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column", paddingTop:20, paddingLeft:20}}>
              <div style={{width:250, height:250, paddingTop:25, paddingLeft:20, display: 'flex', flexDirection: 'column', alignItems:"flex-start",}}>
                <strong style={{width: 200, textAlign:"left", fontSize:13, marginBottom:10}}>Profile Picture</strong>
                <label for="file-input">
                  {this.props.accountState.imageProfil ?
                    <img width="160" height="160" src={this.props.accountState.imageProfil} style={{cursor:"pointer", borderWidth:0, borderStyle:"solid", borderRadius:"10%"}}/>
                    :
                    <img width="160" height="160" src={require('../Assets/images/connectBig.png')} style={{cursor:"pointer", borderWidth:1, borderStyle:"solid", borderRadius:"10%"}}/>
                  }
                </label>
              </div>
              <ItemEditProfile onSubmit={(value)=>this.setToDatabase(value, "name", this)} placeHolder={"name"} placeHolderValue={this.props.accountState.name ? this.props.accountState.name : ""} value={this.props.accountState.name}  heightSize={1}/>
              <ItemEditProfile onSubmit={(value)=>this.setToDatabase(value, "userName", this)} placeHolder={"user name"} placeHolderValue={this.props.accountState.userName ? this.props.accountState.userName : ""} value={this.props.accountState.userName}  heightSize={1}/>
              <div style={{width:"100%", display : "flex", flexDirection:"column", paddingLeft:20, marginBottom:20}}>
                <strong style={{width: 200, textAlign:"left", fontSize:13}}>Birth</strong>
                <div style={{width:"100%", display : "flex", flexDirection:"column", alignItems:"left"}}>
                    <button style={{width:100, backgroundColor:"rgba(245,245,245,1)", color:"black", height:30, fontSize:15, padding:0, margin:0}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {this.props.accountState.birthYear ? this.props.accountState.birthYear : "Year"}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{height:200, overflow:"auto"}}>
                      {listeOfDate.map((year)=>this.returnItemList(year, "birthYear"))}
                    </div>
                    <button style={{width:100, backgroundColor:"rgba(245,245,245,1)", color:"black", height:30, fontSize:15, padding:0, margin:0}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {this.props.accountState.birthMonth ? this.props.accountState.birthMonth : "Month"}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{height:200, overflow:"auto"}}>
                      {Months.map((month)=>this.returnItemList(month, "birthMonth"))}
                    </div>
                    <button style={{width:100, backgroundColor:"rgba(245,245,245,1)", color:"black", height:30, fontSize:15, padding:0, margin:0}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {this.props.accountState.birthDay ? this.props.accountState.birthDay : "Day"}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{height:200, overflow:"auto"}}>
                      {this.state.tabOfDay.map((day)=>this.returnItemList(day, "birthDay"))}
                    </div>
                </div>
              </div>
              <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"row", marginLeft:20, fontSize:14}}>
                <div class="custom-control custom-radio custom-control-inline" onClick={this.setSexFemale}>
                  <input type="radio" id="female" name="gender" class="custom-control-input"/>
                  <label class="custom-control-label" for="customRadioInline1" style={{cursor:"pointer"}}><strong>Female</strong></label>
                </div>
                <div class="custom-control custom-radio custom-control-inline" onClick={this.setSexMale}>
                  <input type="radio" id="male" name="gender" class="custom-control-input"/>
                  <label class="custom-control-label" for="customRadioInline2" style={{cursor:"pointer"}}><strong>Male</strong></label>
                </div>
              </div>
            </div>

          </div>

          <div style={{paddingBottom:30,width: '100%', display: 'flex', flexDirection: 'column', flexWrap:'wrap', marginTop:10, alignItems:"flex-start", overflowX:"hidden", overflowY:"auto", backgroundColor:theme.background.element2.interior, color:theme.background.element2.color}}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:"flex-start",  paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:"rgba(200,200,200,1)", borderBottomStyle:"solid"}}>
              <div style={{marginLeft:10}}>Contact</div>
            </div>
            <ItemEditProfile onSubmit={(value)=>this.setToDatabase(value, "email", this)} placeHolder={"email"} placeHolderValue={this.props.accountState.email ? this.props.accountState.email : ""} value={this.props.accountState.email} heightSize={1}/>
            <ItemEditProfile onSubmit={(value)=>this.setToDatabase(value, "phone", this)} placeHolder={"phone"} placeHolderValue={this.props.accountState.phone ? this.props.accountState.phone : ""} value={this.props.accountState.phone} heightSize={1}/>
            <ItemEditProfile onSubmit={(value)=>this.setToDatabase(value, "adresse", this)} placeHolder={"address"} placeHolderValue={this.props.accountState.adresse ? this.props.accountState.adresse : ""} value={this.props.accountState.adresse} heightSize={2}/>
          </div>

          <div style={{paddingBottom:30,width: '100%', display: 'flex', flexDirection: 'column', flexWrap:'wrap', marginTop:10, alignItems:"flex-start", overflowX:"hidden", overflowY:"auto", backgroundColor:theme.background.element2.interior, color:theme.background.element2.color}}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:"flex-start",  paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:"rgba(200,200,200,1)", borderBottomStyle:"solid"}}>
              <div style={{marginLeft:10}}>Security</div>
            </div>
            <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start", marginLeft:20, marginBottom:5, marginTop:5}}>
              <strong style={{width: 200, textAlign:"left", fontSize:13}}>{"Password"}</strong>
              <div style={{width: 800, display: 'flex', flexDirection: 'column', alignItems:"left", marginBottom:5, marginTop:5, fontSize:15, justifyContent:"flex-start", marginLeft:0, marginRight:0,}}>
                <div style={{width: 200, height:30*this.props.heightSize, textAlign:"left", display: 'flex', flexDirection: 'column', justifyContent:"center", backgroundColor:"rgba(245,245,245,1)", borderRadius:3, paddingLeft:20, marginRight:20, color:"black", borderWidth:1, borderStyle:"solid", borderColor:"rgba(150,150,150,1)"}}>
                {"•••••••••"}
              </div>
              <button style={{width: 200, height:30, fontSize:16, textAlign:"center", justifyContent:"flex-start", marginLeft:0, padding:0, color:"white", borderWidth:0}} type="button" class="btn btn-secondary btn-lg" onClick={this.changePassword}>Modifie</button>
              </div>
            </div>
          </div>


          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flexWrap:'wrap', marginTop:10, alignItems:"flex-start", overflowX:"hidden", overflowY:"auto", backgroundColor:theme.background.element2.interior, color:theme.background.element2.color}}>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems:"flex-start",  paddingTop:10, paddingBottom:10, borderBottomWidth:1, borderBottomColor:"rgba(200,200,200,1)", borderBottomStyle:"solid"}}>
              <div style={{marginLeft:10}}>General</div>
            </div>

            <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
              <div>
                <label for="formControlRange">THEMES</label>
                <div style={{display:"flex", width:"100%", flexDirection:"row", flexWrap:"wrap"}}>
                {ThemesItems.map((theme)=><BoutonTheme theme={theme} chooseTheme={this.chooseTheme} themeSelected={this.props.accountState.theme}/>)}
                </div>
              </div>

              <div style={{width: '50%', display: 'flex', flexDirection: 'column', alignItems:"flex-start", marginLeft:50}}>
                <label style={{marginLeft:30}} for="formControlRange">CARDS SIZE</label>
                <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems:"center", marginBottom:20}}>
                  {this.state.modifyingSizeCard ?
                    <SliderSizeCard setValue={this.setValue} onClick={this.validateSizeCard}/>
                    :
                    <div>
                      <button onClick={() => this.modifieSizeCard(this.setPositionOfCursorSizeCard)} onMouseEnter={this.toggleBackgroundModifyButton} onMouseLeave={this.toggleBackgroundModifyButton} style={{width: 200*this.props.accountState.sizeCard, height:30, fontSize:16, textAlign:"center", justifyContent:"flex-start", marginLeft:20, padding:0, backgroundColor:this.state.backgroundModifyButton, color:"white", borderWidth:0}} type="button" class="btn btn-secondary btn-lg" >Modifie</button>
                    </div>
                  }
                </div>
                <div style={{width: 400, height:500, overflow:"hidden"}}>
                  {this.state.popupIsActive ? <div><Popup closePopup={this.togglePopup} Id={this.state.currentMovieId} Title={this.state.currentMovieTitle}/></div> : <div></div>}
                  <Card
                    Movie = {MovieExemple}
                    Size = {this.state.sizeCard}
                    WidthCard = {200}
                    HeightCard = {300}
                    Src={getImageFromApi(MovieExemple.poster_path)}
                    onClick={this.props.togglePopup}
                    toggleInToWatchList = {this.toggleInToWatchList}
                    toggleInToFavourites = {this.toggleInToFavourites}
                    />

                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    )
  }


  render(){
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
  }
}

const Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
export default Settings;
