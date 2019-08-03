

import React, { Component } from 'react';
import Card from './Card';
import Popup from './Popup';
import YolanHeader from './YolanHeader';
import BoutonElementsSelected from './BoutonElementsSelected';
import MoviesListDisplayer from './MoviesListDisplayer';
import NoAccount from './NoAccount';
import SearchBy from './SearchBy';
import ResearchResults from './ResearchResults';
import Settings from './Settings';
import Movies from '../Assets/movies';
import Favourites from './Favourites';
import WatchLater from './WatchLater';
import { connect } from "react-redux";
import { addCategory } from "../Actions/index";
import { addKeyword } from "../Actions/index";
import { resetCategories } from "../Actions/index";
import { changeAccountState } from "../Actions/index";
import { getFilmsFromApiWithSearchedText } from '../API/TMDBAPI'
import { getFilmsFromApiWithSearchedCategory } from '../API/TMDBAPI'
import { getFilmsFromApiWithSearchedKeyWord } from '../API/TMDBAPI'
import { getKeyWordIdFromApiWithSearchedKeyWord } from '../API/TMDBAPI'
import { getFilmsFromApiWithSearchedFilter } from '../API/TMDBAPI'
import { getFilmDetailFromApi } from '../API/TMDBAPI'
import { getPopularFilmsFromApi } from '../API/TMDBAPI'
import { getRecentFilmsFromApi } from '../API/TMDBAPI'
import { getUpcomingFilmsFromApi } from '../API/TMDBAPI'
import { getTopRatedFilmsFromApi } from '../API/TMDBAPI'
import { getImageFromApi } from '../API/TMDBAPI'
import posed from 'react-pose';
import { listOfGenres } from '../API/TMDBAPI';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import API from '../Utils/API';
import ThemesItems from '../Utils/Themes';

import Dashboard from './Dashboard';
import Login from './Login';
import { Signup } from './Signup';
import { PrivateRoute } from './PrivateRoute';

import Carousel  from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';




function mapDispatchToProps(dispatch) {
  return {
    addCategory: (article) => dispatch(addCategory(article)),
    addKeyword: (article) => dispatch(addKeyword(article)),
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    //resetCategories: () => dispatch(resetCategories()),
    categorySelectedRedux:dispatch.categorySelectedRedux,
    keyWordSelectedRedux:dispatch.keyWordSelectedRedux,
    accountStateRedux:dispatch.accountStateRedux,
  };
};




class DisplayCard extends Component {
  constructor (props) {

    super(props)
    this.myRefDisplayCard = React.createRef()
    this.state = {
      movies: Movies,
      keyWord: "",
      tabKeyWord : [],
      moviesSelected : [],
      moviesPopular : [],
      moviesRecent : [],
      moviesUpcoming : [],
      moviesTopRated : [],
      currentReseachInAction : false,
      filmResearched : "",
      popupIsActive : false,
      popupContent : "",
      currentMovie : {},
      impossibleToFindMovie : false,
      impossibleToFindMovieWithFilter : false,
      keyWordsToSearch : [],
      listOfGenres : listOfGenres,
      colorOngletUpcoming : true,
      colorOngletPopular : true,
      colorOngletTopRated : true,
      colorOngletNowInCinemas : true,
      colorOngletHome : true,
      favouriteisDisplaying : false,
      emailOfUserConnected:"",
      pageLoadFilmsBySearch : 2,
      pageMoviesSelected : 2,
      pageMoviesPopular : 2,
      pageMoviesRecent : 2,
      pageMoviesUpcoming : 2,
      pageMoviesTopRated : 2,
    }
  }

  componentWillMount = () => {

    getPopularFilmsFromApi(1).then(data => {
      if(data){
        this.setState({
          moviesPopular : data.results,
        })
      }
    })
    getRecentFilmsFromApi(1).then(data => {
      if(data){
        this.setState({
          moviesRecent : data.results,
        })
      }
    })
    getUpcomingFilmsFromApi(1).then(data => {
      if(data){
        this.setState({
          moviesUpcoming : data.results,
        })
      }
    })
    getTopRatedFilmsFromApi(1).then(data => {
      if(data){
        this.setState({
          moviesTopRated : data.results,
        })
      }
    })
    var onChange = () => { this.searchNowInCinemas() }
    this.changeAccountState(onChange)
    console.log("forceUpdate")

  }

  changeAccountState = (throwsearchNowInCinemas) => {

    var userData = localStorage.userData
    console.log(userData)
    if(userData && userData!="[object Object]"){
      this.props.changeAccountState(JSON.parse(localStorage.userData));
    }
    throwsearchNowInCinemas()
  }






  togglePopup = (moovie) => {
    this.setState({
      currentMovie : moovie,
    });
    if(this.state.popupIsActive === true){
      this.setState({popupIsActive : false})
    }else{
      this.setState({popupIsActive : true})
    }
  }





  handleChangeSearch = (event) => {
    this.setState({
      filmResearched: event.target.value
    });
  }

  enterToSubmit = (event) => {
    if (event.keyCode  == 13) {
      this.setState({
        filmResearched: event.target.value
      });
      this.loadFilmsBySearch();
    }
  }

  loadFilmsBySearch = () => {
    if (this.state.filmResearched.length > 0) { // Seulement si le texte recherché n'est pas vide
      getFilmsFromApiWithSearchedText(this.state.filmResearched, 1).then(data => {
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        this.setState({
          currentReseachInAction : true,
          moviesSelected : data.results,
          impossibleToFindMovie : data.results.length === 0 ? true : false,
          impossibleToFindMovieWithFilter : false,
          colorOngletUpcoming : true,
          colorOngletPopular : true,
          colorOngletTopRated : true,
          colorOngletNowInCinemas : true,
          colorOngletHome : true,
          favouriteisDisplaying : false,
        })
      })
    }
  }

  extendResearch = () => {

    if(this.state.colorOngletUpcoming === false){
      getUpcomingFilmsFromApi(this.state.pageMoviesUpcoming).then(data => {
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        if(data.results.length>0){
          this.setState({
            moviesSelected : this.state.moviesSelected.concat(data.results),
            pageMoviesUpcoming:this.state.pageMoviesUpcoming+1
          })
        }
      })
    }else if(this.state.colorOngletPopular === false){
      getPopularFilmsFromApi(this.state.pageMoviesPopular).then(data => {
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        if(data.results.length>0){
          this.setState({
            moviesSelected : this.state.moviesSelected.concat(data.results),
            pageMoviesPopular:this.state.pageMoviesPopular+1
          })
        }
      })
    }else if(this.state.colorOngletTopRated === false){
      getTopRatedFilmsFromApi(this.state.pageMoviesTopRated).then(data => {
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        if(data.results.length>0){
          this.setState({
            moviesSelected : this.state.moviesSelected.concat(data.results),
            pageMoviesTopRated:this.state.pageMoviesTopRated+1
          })
        }
      })
    }else if(this.state.colorOngletNowInCinemas === false){
      getRecentFilmsFromApi(this.state.pageMoviesRecent).then(data => {
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        if(data.results.length>0){
          this.setState({
            moviesSelected : this.state.moviesSelected.concat(data.results),
            pageMoviesRecent:this.state.pageMoviesRecent+1
          })
        }
      })
    }else if(this.state.colorOngletHome === false){
      console.log("home")
    }else{
      getFilmsFromApiWithSearchedText(this.state.filmResearched, this.state.pageLoadFilmsBySearch).then(data => {
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        if(data.results.length>0){
          this.setState({
            moviesSelected : this.state.moviesSelected.concat(data.results),
            pageLoadFilmsBySearch:this.state.pageLoadFilmsBySearch+1
          })
        }
      })
    }


  }

  loadFilmsByFilter = () => {
    let url = "";
    var runResearch = false;
    if(this.props.categorySelected.length > 0){
      runResearch = true;
      url =  url + '&with_genres=' + this.writeMoviesSearchAsString(this.props.categorySelected, this.state.listOfGenres)
    }
    if(this.props.keywordSelected.length > 0){
      runResearch = true;
      url =  url + '&with_keywords=' + this.writeMoviesSearchAsString(this.props.keywordSelected, this.state.keyWordsToSearch)
    }
    if(runResearch){
      console.log(url)
      getFilmsFromApiWithSearchedFilter(url).then(data => {
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        if(data.results.length>0){
          this.changedListOfMoviesResearch(data.results)
          this.setState({
            impossibleToFindMovieWithFilter: false,
            impossibleToFindMovie : false,
          })
        }else{
          this.setState({
            moviesSelected : [],
            impossibleToFindMovieWithFilter: true,
            impossibleToFindMovie : false,
          })
        }
      })
    }
  }

  writeMoviesSearchAsString = (tabOfElements, objectOfElementsToSearchIdName) => {
    var listOfElementsSelected = "";
    for (var i = 0; i < tabOfElements.length; i++) {
      listOfElementsSelected = listOfElementsSelected + objectOfElementsToSearchIdName.find(x=>x.name ===  tabOfElements[i]).id + ","
    }
    return listOfElementsSelected
  }

  changedListOfMoviesResearch = (dataResults) =>{
    this.setState({
      currentReseachInAction : true,
      moviesSelected : dataResults,
      impossibleToFindCategory : dataResults.length === 0 ? true : false,
      filmResearched : "",
      colorOngletUpcoming : true,
      colorOngletPopular : true,
      colorOngletTopRated : true,
      colorOngletNowInCinemas : true,
      colorOngletHome : true,
      favouriteisDisplaying : false,
    })
  }

  getListOfIdKeyword = (stringSearched) => {
    if(stringSearched != ""){
      getKeyWordIdFromApiWithSearchedKeyWord(stringSearched).then(data => {
        return data.results
      })
    }else return []
  }

  keyWordsToSearch = (keyWord) => {
    getKeyWordIdFromApiWithSearchedKeyWord(keyWord).then(data => {
      if(data.results){
        this.setState({
          keyWordsToSearch : this.state.keyWordsToSearch.concat(data.results),
        })
      }
    })
  }



  addCategorytoReduxStore = (category) => {
    this.props.addCategory({ category });
  }

  addKeyWordtoReduxStore= (keyword) => {
    this.props.addKeyword({ keyword });
  }



  checkIfListIsFavouriteOrToWatch = (data) => {

    var favouritesStock
    var watchLaterStock
    if(this.props.accountState.watchLater){
      watchLaterStock = this.props.accountState.watchLater
    }else{
      watchLaterStock = []
    }
    if(this.props.accountState.favourites){
      favouritesStock = this.props.accountState.favourites
    }else{
      favouritesStock = []
    }


    var listOfIdFavourite = {};
    var listOfIdToWatch = {};
    for(var i = 0;i<favouritesStock.length;i++){
      listOfIdFavourite[favouritesStock[i].id] = i
    }
    for(var i = 0;i<watchLaterStock.length;i++){
      listOfIdToWatch[watchLaterStock[i].id] = i
    }
    for(var j=0;j<data.length;j++){
      if(listOfIdFavourite[data[j].id]>=0){
        data[j].inToFavourites = true
      }
      if(listOfIdToWatch[data[j].id]>=0){
        data[j].inToWatch = true
      }
    }
    return data
  }

  setSectionRef = (el) => {
    this.sectionRef = el
  }

  setScrollToTop = () => {
    if (this.sectionRef) {
      this.sectionRef.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }


  searchPopular = () => {
    this.setScrollToTop();
    getPopularFilmsFromApi(1).then(data => {
      if(data){
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        this.setState({
          currentReseachInAction : true,
          moviesSelected : data.results,
          colorOngletUpcoming : true,
          colorOngletPopular : false,
          colorOngletTopRated : true,
          colorOngletNowInCinemas : true,
          colorOngletHome : true,
          favouriteisDisplaying : false,
        })
      }
    })

  }
  searchNowInCinemas = () => {
    this.setScrollToTop();
    getRecentFilmsFromApi(1).then(data => {
      if(data){
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        this.setState({
          currentReseachInAction : true,
          moviesSelected : data.results,
          colorOngletUpcoming : true,
          colorOngletPopular : true,
          colorOngletTopRated : true,
          colorOngletNowInCinemas : false,
          colorOngletHome : true,
          favouriteisDisplaying : false,
        })
      }
    })
  }
  searchTopRated = () => {
    this.setScrollToTop();
    getTopRatedFilmsFromApi(1).then(data => {
      if(data){
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        this.setState({
          currentReseachInAction : true,
          moviesSelected : data.results,
          colorOngletUpcoming : true,
          colorOngletPopular : true,
          colorOngletTopRated : false,
          colorOngletNowInCinemas : true,
          colorOngletHome : true,
          favouriteisDisplaying : false,
        })
      }
    })
  }
  searchUpcoming = () => {
    this.setScrollToTop();
    getUpcomingFilmsFromApi(1).then(data => {
      if(data){
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        this.setState({
          currentReseachInAction : true,
          moviesSelected : data.results,
          colorOngletUpcoming : false,
          colorOngletPopular : true,
          colorOngletTopRated : true,
          colorOngletNowInCinemas : true,
          colorOngletHome : true,
          favouriteisDisplaying : false,
        })
      }
    })
  }
  searchFavourites = () => {
      this.setScrollToTop();
      var data = {}
      if(this.props.accountState.favourites){
        data.results = this.props.accountState.favourites
        //data.results = JSON.parse(localStorage.favourites)
      }else{
        data.results = []
      }
      this.setState({
        currentReseachInAction : true,
        moviesSelected : data.results,
        colorOngletUpcoming : "rgba(255,123,191,1)",
        colorOngletPopular : true,
        colorOngletTopRated : true,
        colorOngletNowInCinemas : true,
        colorOngletHome : true,
        favouriteisDisplaying : true,
      })
  }

  goHome = () => {
    this.setScrollToTop();
    this.setState({
      currentReseachInAction : false,
      moviesSelected : [],
      colorOngletUpcoming : true,
      colorOngletPopular : true,
      colorOngletTopRated :true,
      colorOngletNowInCinemas : true,
      colorOngletHome : false,
    })
    getPopularFilmsFromApi(1).then(data => {
      if(data){
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        this.setState({
          moviesPopular : data.results,
        })
      }
    })
    getRecentFilmsFromApi(1).then(data => {
      if(data){
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        this.setState({
          moviesRecent : data.results,
        })
      }
    })
    getUpcomingFilmsFromApi(1).then(data => {
      if(data){
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        this.setState({
          moviesUpcoming : data.results,
        })
      }
    })
    getTopRatedFilmsFromApi(1).then(data => {
      if(data){
        data.results = this.checkIfListIsFavouriteOrToWatch(data.results)
        this.setState({
          moviesTopRated : data.results,
        })
      }
    })
  }


  changeMovie = (newMovie) => {
    var listOfFavourite = this.props.accountState.favourites ? this.props.accountState.favourites : []
    var listOfToWatch  = this.props.accountState.watchLater ? this.props.accountState.watchLater : []

    for(var i = 0; i<listOfFavourite.length;i++){
      if(listOfFavourite[i].id === newMovie.id){
        newMovie.inToFavourites = true;
      }
    }
    for(var i = 0; i<listOfToWatch.length;i++){
      if(listOfToWatch[i].id === newMovie.id){
        newMovie.inToWatch = true;
      }
    }

    this.setState({
      currentMovie : newMovie,
    })
  }

  toggleInToFavourites = (movieCurrent, context) => {

    var listOfFavourite = this.props.accountState.favourites ? this.props.accountState.favourites : []
    var listOfToWatch  = this.props.accountState.watchLater ? this.props.accountState.watchLater : []

    if(movieCurrent.inToFavourites === true){
      movieCurrent.inToFavourites = false;
    }else{
      movieCurrent.inToFavourites = true;
    }


    var alreadyFavourite = false
    for(var i = 0; i<listOfFavourite.length;i++){
      if(listOfFavourite[i].id === movieCurrent.id){
        alreadyFavourite = true
        var copy = listOfFavourite.splice(i, 1)
      }
    }
    if(alreadyFavourite === false){
        listOfFavourite.push(movieCurrent)
        //console.log(listOfFavourite)
    }



    for(var i = 0; i<listOfToWatch.length;i++){
      if(listOfToWatch[i].id === movieCurrent.id){
        listOfToWatch[i] = movieCurrent
      }
    }

    API.setMoovieList({
      "favourites" : listOfFavourite,
      "watchLater" : listOfToWatch,
    }, localStorage.email).then(function(data){
      //console.log(listOfFavourite)
      API.getUserData(data.data.email).then(function(data){
          context.props.changeAccountState(data.data.userData);
          //console.log(data.data.userData.favourites)
        })
    })
    localStorage.setItem('favourites', JSON.stringify(listOfFavourite));
    localStorage.setItem('watchLater', JSON.stringify(listOfToWatch));

    if(this.state.favouriteisDisplaying){
      var data = {}
      if(this.props.accountState.favourites){
        data.results = this.props.accountState.favourites
      }else{
        data.results = []
      }
      this.setState({
        currentReseachInAction : true,
        moviesSelected : data.results,
        colorOngletUpcoming : "rgba(255,123,191,1)",
        colorOngletPopular : true,
        colorOngletTopRated : true,
        colorOngletNowInCinemas : true,
        colorOngletHome : true,
      })
    }

    this.forceUpdate()
  }



  toggleInToWatchList = (movieCurrent, context) => {


    var listOfFavourite = this.props.accountState.favourites ? this.props.accountState.favourites : []
    var listOfToWatch  = this.props.accountState.watchLater ? this.props.accountState.watchLater : []
      //console.log(movieCurrent)

    if(movieCurrent.inToWatch === true){
      movieCurrent.inToWatch = false;
    }else{
      movieCurrent.inToWatch = true;
    }

    console.log(movieCurrent)



    var alreadyToWatch = false
    for(var i = 0; i<listOfToWatch.length;i++){
      if(listOfToWatch[i].id === movieCurrent.id){
        alreadyToWatch = true
        var copy = listOfToWatch.splice(i, 1)
      }
    }
    if(alreadyToWatch === false){
        listOfToWatch.push(movieCurrent)
    }


    for(var i = 0; i<listOfFavourite.length;i++){
      if(listOfFavourite[i].id === movieCurrent.id){
        listOfFavourite[i] = movieCurrent
      }
    }

    API.setMoovieList({
      "favourites" : listOfFavourite,
      "watchLater" : listOfToWatch,
    }, localStorage.email).then(function(data){
      API.getUserData(data.data.email).then(function(data2){
          context.props.changeAccountState(data2.data.userData);
          //console.log(data2.data.userData)
        })
    })

    localStorage.setItem('watchLater', JSON.stringify(listOfToWatch));
    localStorage.setItem('favourites', JSON.stringify(listOfFavourite));
    this.forceUpdate()
  }







  render() {
    var tabOfCategories = [];
    var categories = {};
    const SEARCH = require('../Assets/images/search.png');
    const MOVIEACTION = require('../Assets/images/movieAction.png');
    var theme = this.props.accountState.theme ? ThemesItems[this.props.accountState.theme] : ThemesItems[0];

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
          slidesToSlide: 2, // optional, default to 1.
          paritialVisibilityGutter: -5 // this is needed to tell the amount of px that should be visible.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1, // optional, default to 1.
        },
      };



    return (
      <div>
        <YolanHeader/>
        <Router style={{display:'flex', flexDirection:'row', width:"100%", height:"100%"}}>
          <div  style={{display:'flex', flexDirection:'row',borderStyle: 'solid',borderWidth: 0,borderColor: 'black',  height:"95vh",overflow:'hidden',marginTop:'5vh'}}>
              <div style={{display:'flex',  flexDirection:'column',width:'25vw',  maxWidth:'25vw',  minWidth:'25vw', marginTop:0,alignItems:'center', backgroundColor:theme.background.element3.interior}}>
                <a class="Home"  href=""  onClick={this.goHome} style={{marginBottom:50,textDecoration: 'none' ,color:'black',cursor : 'pointer',width:'100%', display:'flex',flexDirection:'row',alignItems:'center',ustifyContent:'space-evenly'}}>
                    <div style={{width:"50%", marginLeft:"25%", height:100, marginTop:50, backgroundColor:theme.bouton.element4.interior, display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                      <div style={{width:50, height:50, backgroundImage: "url("+ MOVIEACTION +")", cursor:'pointer', backgroundSize: 'cover'}}></div>
                      <div style={{marginTop:50, marginBottom:50, fontSize:20}}>A MOVIE DISPLAYER</div>
                    </div>
                </a>
                {/*Reaserch_byName*/}
                <Link to="/home" style={{ textDecoration: 'none', width:"90%", marginLeft:"15%" }} draggable="false">
                  <div class="Reaserch_Film" style={{width:'85%', height : 35, borderRadius:4, color:theme.bouton.element1.color, backgroundColor:theme.bouton.element1.interior, display:'flex', flexDirection:'row', borderStyle: 'solid', borderColor:'rgba(18,137,54)', borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', justifyContent:'space-between'}}>
                    <input style={{width:'100%', border: 0, marginLeft:15, boxShadow: 'none', outline:'none', color:theme.background.element2.color, backgroundColor:'rgba(0,0,0,0)'}} type="text" name="name" value={this.state.filmResearched} onChange={this.handleChangeSearch} onKeyDown={this.enterToSubmit} placeholder = "Search Movie"/>
                    <div  onClick={this.loadFilmsBySearch} style={{paddingRight:5, width:30, height:30, overflow:'hidden', backgroundImage: "url("+ SEARCH +")", cursor:'pointer', backgroundSize: 'cover',}}>
                    </div>
                  </div>

                  <SearchBy PlaceHolder={"Categories"}
                    ReduxStoreOfElements = {this.props.categorySelected}
                    addtoReduxStore = {this.addCategorytoReduxStore}
                    objectOfElementsToSearchIdName = {this.state.listOfGenres}
                    loadFilmsByFilter = {this.loadFilmsByFilter}
                    theme = {theme}
                  />
                  <SearchBy PlaceHolder={"key words"}
                    ReduxStoreOfElements = {this.props.keywordSelected}
                    addtoReduxStore = {this.addKeyWordtoReduxStore}
                    objectOfElementsToSearchIdName = {this.state.keyWordsToSearch}
                    loadFilmsByFilter = {this.loadFilmsByFilter}
                    StateListOfChlid = {this.keyWordsToSearch}
                    theme = {theme}
                  />

                </Link>
              </div>
              {this.state.popupIsActive ? <div><Popup
                changeMovie = {this.changeMovie}
                toggleInToFavourites={(movie)=> this.toggleInToFavourites(movie, this)}
                toggleInToWatchList={(movie) => this.toggleInToWatchList(movie, this)}
                closePopup={this.togglePopup}
                Movie={this.state.currentMovie}/></div>
                : <div></div>
              }

              <div style={{display:'flex', flexDirection:'column', width:'75vw', maxWidth:'75vw', backgroundColor:theme.background.element1.interior}}>
                <div style={{display:'flex', flexDirection:'row', width:'100%', height:"100%"}}>
                  <div style={{display:'flex', flexDirection:'column', width:'100%',  overflowY:"auto"}} >
                    <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                      <div style={{display:'flex', flexDirection:'column', width:'55vw'}} >
                        <div tabIndex={0} style={{height:'16vh', width:'100%', overflowX:'hidden', color:theme.background.element1.color, backgroundColor:theme.background.element1.interior, display:'flex', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                          Welcome to MOVIE DISPLAYER, a simple engine to store your favourites movies.<br/>
                          This website is based on The Moovie Database API. You will find this API on https://www.themoviedb.org/
                        </div>
                      </div>
                      <div style={{ width:"20vw", height:0, marginTop:0, marginRight:0,  display: 'flex', flexDirection: 'column',  borderStyle: 'solid', borderWidth: 0, borderColor: 'black', backgroundColor:'rgba(0,0,0,0)'}}>
                        <div style={{ width:'100%', height:'100%', marginTop:0,  display: 'flex', flexDirection: 'row',justifyContent:'center',justifyContent:'space-between'}}>
                          <div style={{ width:"100%", minWidth:150, height:'16vh', marginTop:0,  display: 'flex', flexDirection: 'column', justifyContent:'space-between', backgroundColor:'rgba(0,0,0,0)'}}>
                            <Route exact path="/" component={NoAccount}/>
                            <PrivateRoute path='/favourites' component={Dashboard} />
                            <PrivateRoute path='/home' component={Dashboard}/>
                            <PrivateRoute path='/watchLater' component={Dashboard}/>
                            <PrivateRoute path='/settings' component={Dashboard}/>
                          </div>
                        </div>
                      </div>

                    </div>
                      <Link to="/home" style={{ textDecoration: 'none' }}>
                        <div style={{width:"100%", height:50, display:"flex", flexDirection:'row', justifyContent:"space-between",alignItems:"center", fontSize:23, marginTop:0, color:theme.background.element1.color, backgroundColor:theme.background.element1.interior}}>
                          <div onClick={this.goHome} style={{marginLeft:20, marginRight:40, width:"100%", textAlign: "center", cursor:"pointer", color:this.state.colorOngletHome?theme.bouton.element5.interior:theme.bouton.element5.color, borderRadius:10, borderStyle:"solid", borderWidth:1, borderColor:this.state.colorOngletHome?theme.bouton.element5.interior:theme.bouton.element5.color, backgroundColor:theme.bouton.element4.interior}}>Home
                          </div>
                          <div onClick={this.searchNowInCinemas} style={{marginLeft:40, marginRight:40,  textAlign: "center", width:"100%", cursor:"pointer", color:this.state.colorOngletNowInCinemas?theme.bouton.element5.interior:theme.bouton.element5.color, borderRadius:10, borderStyle:"solid",borderWidth:1, borderColor:this.state.colorOngletNowInCinemas?theme.bouton.element5.interior:theme.bouton.element5.color, backgroundColor:theme.bouton.element4.interior}}>Playing Now
                          </div>
                          <div onClick={this.searchTopRated} style={{marginLeft:40, marginRight:40, textAlign: "center", width:"100%", cursor:"pointer", color:this.state.colorOngletTopRated?theme.bouton.element5.interior:theme.bouton.element5.color, borderRadius:10, borderStyle:"solid", borderWidth:1, borderColor:this.state.colorOngletTopRated?theme.bouton.element5.interior:theme.bouton.element5.color, backgroundColor:theme.bouton.element4.interior}}>Top Rated
                          </div>
                          <div onClick={this.searchPopular} style={{marginLeft:40, marginRight:40, textAlign: "center", width:"100%", cursor:"pointer", color:this.state.colorOngletPopular?theme.bouton.element5.interior:theme.bouton.element5.color, borderRadius:10, borderStyle:"solid", borderWidth:1, borderColor:this.state.colorOngletPopular?theme.bouton.element5.interior:theme.bouton.element5.color, backgroundColor:theme.bouton.element4.interior}}>Popular
                          </div>
                          <div onClick={this.searchUpcoming} style={{marginLeft:40, marginRight:40, textAlign: "center", width:"100%", cursor:"pointer", color:this.state.colorOngletUpcoming?theme.bouton.element5.interior:theme.bouton.element5.color, borderRadius:10, borderStyle:"solid", borderWidth:1, borderColor:this.state.colorOngletUpcoming?theme.bouton.element5.interior:theme.bouton.element5.color, backgroundColor:theme.bouton.element4.interior}}>Coming Soon
                          </div>
                        </div>
                      </Link>

                      <Route exact path="/"
                        render={(props) => <ResearchResults {...props}
                        id="researchResult1"
                        currentReseachInAction={this.state.currentReseachInAction}
                        moviesPopular = {this.state.moviesPopular}
                        moviesRecent = {this.state.moviesRecent}
                        moviesUpcoming = {this.state.moviesUpcoming}
                        moviesTopRated = {this.state.moviesTopRated}
                        moviesSelected = {this.state.moviesSelected}
                        impossibleToFindMovie = {this.state.impossibleToFindMovie}
                        impossibleToFindMovieWithFilter = {this.state.impossibleToFindMovieWithFilter}
                        filmResearched = {this.state.filmResearched}
                        toggleInToFavourites = {(movie)=> this.toggleInToFavourites(movie, this)}
                        toggleInToWatchList = {(movie) => this.toggleInToWatchList(movie, this)}
                        togglePopup = {this.togglePopup}
                        setSectionRef = {this.setSectionRef}
                        extendResearch={this.extendResearch}
                        />}
                      />
                      <Route path='/home'
                        render={(props) => <ResearchResults {...props}
                        id="researchResult2"
                        currentReseachInAction={this.state.currentReseachInAction}
                        moviesPopular = {this.state.moviesPopular}
                        moviesRecent = {this.state.moviesRecent}
                        moviesUpcoming = {this.state.moviesUpcoming}
                        moviesTopRated = {this.state.moviesTopRated}
                        moviesSelected = {this.state.moviesSelected}
                        impossibleToFindMovie = {this.state.impossibleToFindMovie}
                        impossibleToFindMovieWithFilter = {this.state.impossibleToFindMovieWithFilter}
                        filmResearched = {this.state.filmResearched}
                        toggleInToFavourites = {(movie)=> this.toggleInToFavourites(movie, this)}
                        toggleInToWatchList = {(movie) => this.toggleInToWatchList(movie, this)}
                        togglePopup = {this.togglePopup}
                        setSectionRef = {this.setSectionRef}
                        extendResearch={this.extendResearch}
                        />}
                      />
                      <Route exact path='/settings'
                      render={(props) => <Settings {...props}
                      toggleInToFavourites={(movie)=> this.toggleInToFavourites(movie, this)}
                      toggleInToWatchList={(movie) => this.toggleInToWatchList(movie, this)}
                      togglePopup={this.togglePopup}/>}
                      />


                      {this.props.accountState.favourites ?
                        <Route exact path='/favourites'
                          render={(props) => <Favourites {...props}
                          toggleInToFavourites={(movie)=> this.toggleInToFavourites(movie, this)}
                          toggleInToWatchList={(movie) => this.toggleInToWatchList(movie, this)}
                          togglePopup={this.togglePopup}
                          />}
                        />
                        : null
                      }
                      {this.props.accountState.watchLater ?
                        <Route exact path='/watchLater'
                          render={(props) => <WatchLater {...props}
                          toggleInToFavourites={(movie)=> this.toggleInToFavourites(movie, this)}
                          toggleInToWatchList={(movie) => this.toggleInToWatchList(movie, this)}
                          togglePopup={this.togglePopup}
                          />}
                        />
                        : null
                      }
                  </div>
                </div>
              </div>
            </div>
        </Router>
      </div>
    )
  }
}

let styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
    },

}

const mapStateToProps = (state) => {
  return {
    categorySelected:state.categorySelectedRedux,
    keywordSelected:state.keyWordSelectedRedux,
    accountState:state.accountStateRedux,
  }
}

const Display = connect(mapStateToProps, mapDispatchToProps)(DisplayCard);
export default Display;
