

import React, { Component } from 'react';
import Card from './Card';
import Popup from './Popup';
import YolanHeader from './YolanHeader';
import BoutonElementsSelected from './BoutonElementsSelected';
import MoviesListDisplayer from './MoviesListDisplayer';
import ConnetionAccount from './ConnetionAccount';
import SearchBy from './SearchBy';
import Movies from '../Assets/movies';
import { connect } from "react-redux";
import { addCategory } from "../Actions/index";
import { resetCategories } from "../Actions/index";
import { getFilmsFromApiWithSearchedText } from '../API/TMDBAPI'
import { getFilmsFromApiWithSearchedCategory } from '../API/TMDBAPI'
import { getFilmsFromApiWithSearchedKeyWord } from '../API/TMDBAPI'
import { getKeyWordIdFromApiWithSearchedKeyWord } from '../API/TMDBAPI'
import { getFilmsFromApiWithSearchedFilter } from '../API/TMDBAPI'
import { getFilmDetailFromApi } from '../API/TMDBAPI'
import { getPopularFilmsFromApi } from '../API/TMDBAPI'
import { getRecentFilmsFromApi } from '../API/TMDBAPI'
import { getImageFromApi } from '../API/TMDBAPI'
import posed from 'react-pose';
import { listOfGenres } from '../API/TMDBAPI'

function mapDispatchToProps(dispatch) {
  return {
    addCategory: (article) => dispatch(addCategory(article)),
    resetCategories: () => dispatch(resetCategories()),
    categorySelectedRedux:dispatch.categorySelectedRedux,
  };
};

const timerAnimation = 400;

const ResearchImpossible = posed.div({
    idle: {
      height : 0,
      transition: {
        duration: timerAnimation,
        ease: 'backInOut',
      }
     },
    hovered: {
      height : 200,
      transition: {
        duration: timerAnimation,
        ease: 'backInOut',
      }
     },
});


class DisplayCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: Movies,
      categorySelected : [],
      keyWord: "",
      tabKeyWord : [],
      moviesSelected : [],
      moviesPopular : [],
      moviesRecent : [],
      currentReseachInAction : false,
      filmResearched : "",
      popupIsActive : false,
      popupContent : "",
      currentMovieId : "",
      currentMovieTitle : "",
      impossibleToFindMovie : false,
      impossibleToFindCategory : false,
      impossibleToFindKeyWord : false,
      keyWord : "",
    }
  }

  componentWillMount = () => {
    getPopularFilmsFromApi().then(data => {
      this.setState({
        moviesPopular : data.results,
      })
    })
    getRecentFilmsFromApi().then(data => {
      this.setState({
        moviesRecent : data.results,
      })
    })

  }

  favourite = (id) => {
    for(var i=0;i<this.state.movies.length;i++){
      if(this.state.movies[i].id===id){
        var newMovies = this.state.movies;
        newMovies.splice(i,1);
        this.setState({movies : newMovies})
      }
    }
  }

  addlike = (id) => {
    for(var i=0;i<this.state.movies.length;i++){
      if(this.state.movies[i].id===id){
        var newMovies = this.state.movies;
        newMovies[i].likes++;
        this.setState({movies : newMovies})
      }
    }
  }

  deletelike = (id) => {
    for(var i=0;i<this.state.movies.length;i++){
      if(this.state.movies[i].id===id){
        var newMovies = this.state.movies;
        newMovies[i].likes--;
        this.setState({movies : newMovies})
      }
    }
  }

  adddislike = (id) => {
    for(var i=0;i<this.state.movies.length;i++){
      if(this.state.movies[i].id===id){
        var newMovies = this.state.movies;
        newMovies[i].dislikes++;
        this.setState({movies : newMovies})
      }
    }
  }

  deletedislike = (id) => {
    for(var i=0;i<this.state.movies.length;i++){
      if(this.state.movies[i].id===id){
        var newMovies = this.state.movies;
        newMovies[i].dislikes--;
        this.setState({movies : newMovies})
      }
    }
  }


  togglePopup = (id, title) => {
    this.setState({
      currentMovieId : id,
      currentMovieTitle : title,
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
        getFilmsFromApiWithSearchedText(this.state.filmResearched).then(data => {
          this.setState({
            currentReseachInAction : true,
            moviesSelected : data.results,
            impossibleToFindMovie : data.results.length === 0 ? true : false,
          })
        })
    }
  }

  loadFilmsByFilter = (objectOfElementsToSearchIdName) => {
    var url
    if(this.props.categorySelected.length > 0){
      url =  '&with_genres=' + this.writeMoviesSearchAsString(this.props.categorySelected, objectOfElementsToSearchIdName)
    }
    getFilmsFromApiWithSearchedFilter(url).then(data => {
      if(data.results){
        this.changedListOfMoviesResearch(data.results)
      }else{

      }
    })
  }

  writeMoviesSearchAsString = (tabOfElements, objectOfElementsToSearchIdName) => {
    var listOfElementsSelected = "";
    for (var i = 0; i < tabOfElements.length; i++) {
      listOfElementsSelected = listOfElementsSelected + Object.keys(objectOfElementsToSearchIdName).find(key => objectOfElementsToSearchIdName[key] === tabOfElements[i]) + ","
    }
    return listOfElementsSelected
  }

  changedListOfMoviesResearch = (dataResults) =>{
    this.setState({
      currentReseachInAction : true,
      moviesSelected : dataResults,
      impossibleToFindCategory : dataResults.length === 0 ? true : false,
      filmResearched : "",
    })
  }



  addCategorytoReduxStore = (category) => {
    this.props.addCategory({ category });
  }




  enterToSubmitkeyWord = (event) => {
    if ((event.keyCode  == 13 || event.keyCode  == 32)&&this.state.keyWord != "") {
      let newTabOfKeyWord = this.state.tabKeyWord.concat(this.state.keyWord)
      this.setState({
        tabKeyWord : newTabOfKeyWord,
        keyWord : ""
      })
      this.loadFilmsByKeyWord(newTabOfKeyWord);
    }
  }


  handleChangeSearchkeyWord = (event) => {
    this.setState({
      keyWord: event.target.value
    });
  }

  loadFilmsByKeyWord = (tabOfKeyWord) => {
    let listOfKeyWord = "";
    let listOfKeyWordID = "";
    let newData = [];
    for (var i = 0; i < tabOfKeyWord.length; i++) {
      let tabOfKeyWordI = tabOfKeyWord[i];
      getKeyWordIdFromApiWithSearchedKeyWord(tabOfKeyWord[i]).then(data => {
        for(var j=0;j<data.results.length;j++){
          if(data.results[j].name === tabOfKeyWordI){
            listOfKeyWord = listOfKeyWord + data.results[j].id.toString(10) + ",";
          }
        }
        this.loadFilmsByKeyWordID(listOfKeyWord)

      })
    }
  }



  loadFilmsByKeyWordID = (listOfKeyWord) => {

    getFilmsFromApiWithSearchedKeyWord(listOfKeyWord).then(data => {
      this.setState({
        currentReseachInAction : true,
        moviesSelected : data.results,
        //impossibleToFindKeyWord : newData.length === 0 ? true : false,
        filmResearched : "",
      })
    })

  }

  deleteKeyWord = (keyWord) => {
    let index = this.state.tabKeyWord.indexOf(keyWord);
    this.state.tabKeyWord.splice(index, 1)
    this.setState({
      tabKeyWord : this.state.tabKeyWord,
    })
    this.loadFilmsByKeyWord(this.state.tabKeyWord);
  }

  goHome = () => {
    getPopularFilmsFromApi().then(data => {
      this.setState({
        moviesSelected : data.results
      })
    })
  }










  renderMovies = (movie) => {
      return <Card
        Title={movie.title}
        Category={movie.genre_ids}
        Id={movie.id}
        Size = {1}
        Likes={movie.vote_average/10/movie.vote_count}
        Dislikes={(1-movie.vote_average/10)/movie.vote_count}
        NumberOfVotes={movie.vote_count}
        Rates={movie.vote_average}
        Language={movie.original_language}
        Src={getImageFromApi(movie.poster_path)}
        favourite={this.favourite}
        like={this.likeCard}
        addlike={this.addlike}
        adddislike={this.adddislike}
        deletelike={this.deletelike}
        deletedislike={this.deletedislike}
        displayMovieDetail={this.togglePopup}/>
  }


  render() {
    var tabOfCategories = [];
    var categories = {};
    const SEARCH = require('../Assets/images/search.png');
    const MOVIEACTION = require('../Assets/images/movieAction.png')

    return (
      <div>
        <YolanHeader/>
        <div  style={{
          display:'flex',
          flexDirection:'row',
          borderStyle: 'solid',
          borderWidth: 0,
          borderColor: 'black',
          marginTop:'5vh'}}>
          <div style={{
            display:'flex',
            flexDirection:'column',
            width:'25vw',
            maxWidth:'25vw',
             marginTop:0,
             alignItems:'center',
             backgroundColor:'rgba(0,0,0,0.02)'}}>
            <a
              class="Home"
              href=""
              onClick={this.goHome}
              style={{
                textDecoration: 'none' ,
                color:'black',
                cursor : 'pointer',
                width:'100%',
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-evenly'}}>
              <div style={{width:50, height:50, backgroundImage: "url("+ MOVIEACTION +")", cursor:'pointer', backgroundSize: 'cover'}}></div>
              <div style={{marginTop:50, marginBottom:50,backgroundColor:'rgba(0,0,0,0)', fontSize:20}}>A MOVIE DISPLAYER</div>
            </a>
            {/*Reaserch_byName*/}
            <div class="Reaserch_Film" style={{width:'85%', height : 35, borderRadius:4, backgroundColor:'rgba(0,0,0,0)', display:'flex', flexDirection:'row', borderStyle: 'solid', borderColor:'rgba(18,137,54)', borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', justifyContent:'space-between'}}>
              <input style={{width:'100%', border: 0, marginLeft:15, boxShadow: 'none', outline:'none', backgroundColor:'rgba(0,0,0,0)'}} type="text" name="name" value={this.state.filmResearched} onChange={this.handleChangeSearch} onKeyDown={this.enterToSubmit} placeholder = "Search Movie"/>
              <div  onClick={this.loadFilmsBySearch} style={{paddingRight:5, width:30, height:30, overflow:'hidden', backgroundImage: "url("+ SEARCH +")", cursor:'pointer', backgroundSize: 'cover',}}>
              </div>
            </div>
            <SearchBy PlaceHolder={"Categories"}
              ReduxStoreOfElements = {this.props.categorySelected}
              addtoReduxStore = {this.addCategorytoReduxStore}
              objectOfElementsToSearchIdName = {listOfGenres}
              loadFilmsByFilter = {this.loadFilmsByFilter}
            />
            <SearchBy PlaceHolder={"key words"}
              ReduxStoreOfElements = {this.props.categorySelected}
              addtoReduxStore = {this.addCategorytoReduxStore}
              objectOfElementsToSearchIdName = {listOfGenres}
              loadFilmsByFilter = {this.loadFilmsByFilter}
            />
            {/*Reaserch_byKeyWord*/}
            <div class="Reaserch_byKeyWord"  style={{width:'85%'}}>
              <div  style={{width:'100%', maxWidth:'100%', minHeight : 35, marginTop:20, borderRadius:4, backgroundColor:'rgba(0,0,0,0)', display:'flex', flexDirection:'row', flexWrap:'wrap', borderStyle: 'solid', borderColor:'rgba(18,137,54)', borderWidth: 0.5, borderColor: 'rgba(0,0,0,0.1)', justifyContent:'flex-start', alignItems:'center'}}>
                {this.state.tabKeyWord && this.state.tabKeyWord.length > 0 ? this.state.tabKeyWord.map(
                  (keyWord) =>
                  <BoutonElementsSelected Name={keyWord} DeleteCategory={() => this.deleteKeyWord(keyWord)}/>) :
                  <div></div>
                }
                <input style={{marginTop:5, width:'100%', border: 0, marginLeft:15, boxShadow: 'none', outline:'none', backgroundColor:'rgba(0,0,0,0)'}} type="text" name="name" value={this.state.keyWord} onChange={this.handleChangeSearchkeyWord} onKeyDown={this.enterToSubmitkeyWord} placeholder = "Key Word"/>
              </div>
            </div>

          </div>
          {this.state.popupIsActive ? <div><Popup closePopup={this.togglePopup} Id={this.state.currentMovieId} Title={this.state.currentMovieTitle}/></div> : <div></div>}
          <div style={{display:'flex', flexDirection:'column', width:'75vw'}}>
            <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
              <div tabIndex={0} style={{height:'15vh', width:'60vw', overflowX:'hidden', backgroundColor:'rgba(0,0,0,0)', display:'flex', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                Welcome to MOVIE DISPLAYER, a simple engine to store your favourites movies.<br/>
                This website is based on The Moovie Database API. You will find this API on https://www.themoviedb.org/
              </div>
              <ConnetionAccount/>
            </div>
            {!this.state.currentReseachInAction ?
              <div>
                <div style={{width:'100%', backgroundColor:'rgba(0,0,0,0)', fontSize:25, textAlign:'start', paddingLeft:30,}}><strong>Popular Movies</strong></div>
                <MoviesListDisplayer listOfMovies={this.state.moviesPopular} renderMovies={this.renderMovies}/>
                <div style={{width:'100%', backgroundColor:'rgba(0,0,0,0)', fontSize:25, textAlign:'start', paddingLeft:30,}}><strong>Recent Movies</strong></div>
                <MoviesListDisplayer listOfMovies={this.state.moviesRecent} renderMovies={this.renderMovies}/>
              </div> :
              <div></div>
            }
            <div style={{width: '100%', height:'80vh', display: 'flex', flexDirection: 'row', flexWrap:'wrap', borderStyle: 'solid', borderWidth: 0, borderColor: 'black', overflowY: 'scroll'}}>
              {this.state.moviesSelected.length > 0 ?
                this.state.moviesSelected.map((movie) => (
                  this.renderMovies(movie)
                )) : <div></div>}
              <ResearchImpossible pose={this.state.impossibleToFindMovie ? "hovered" : "idle"} style={{width:'100%', height:'100%'}}>
                <div style={{ width:'100%', height:'100%', textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0,0,0,0.01)', marginTop: 0}}>
                  {this.state.impossibleToFindMovie ?
                    <div>
                      Impossible to find a movie with the word : "<strong>{this.state.filmResearched}</strong>" .<br/>
                      Please try another research
                    </div> :
                    <div></div>
                  }
                </div>
              </ResearchImpossible>
            </div>
          </div>
        </div>
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
  }
}

const Display = connect(mapStateToProps, mapDispatchToProps)(DisplayCard);
export default Display;
