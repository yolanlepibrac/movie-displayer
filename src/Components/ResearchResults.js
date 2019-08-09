import React, { Component } from 'react';
import posed from 'react-pose';
import Card from './Card';
import { getImageFromApi } from '../API/TMDBAPI'
import API from '../Utils/API';
import ThemesItems from '../Utils/Themes';


import MoviesListDisplayer from './MoviesListDisplayer';

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";

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

function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
  };
};



class ResearchResultsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fontSizeCardMore:this.props.accountState.sizeCard?40*this.props.accountState.sizeCard:40,
      backgroundColorCardMore:this.props.accountState.theme?ThemesItems[this.props.accountState.theme].background.element3.interior:"rgba(255,123,191,0.2)",
      colorCardMore:this.props.accountState.theme?ThemesItems[this.props.accountState.theme].background.element2.color:"black",
    };
  }

  onQuitLastCard = () => {
    this.setState({
      fontSizeCardMore:this.props.accountState.sizeCard?40*this.props.accountState.sizeCard:40,
      backgroundColorCardMore:this.props.accountState.theme?ThemesItems[this.props.accountState.theme].background.element3.interior:"rgba(255,123,191,0.2)",
    })
  }

  onEnterLastCard = () => {
    this.setState({
      fontSizeCardMore:this.props.accountState.sizeCard?60*this.props.accountState.sizeCard:60,
      backgroundColorCardMore:this.props.accountState.theme?ThemesItems[this.props.accountState.theme].background.element2.interior:"rgba(255,123,191,0.2)",
    })
  }

  componentDidMount = () => {
    var that = this
    window.$("#researchResult").bind('mousewheel DOMMouseScroll', function(event){
          if(event.ctrlKey == true){
            event.preventDefault()
            var sizeCardCurrent = that.props.accountState.sizeCard ? that.props.accountState.sizeCard : 1
            var sizeCardNew
            if(event.originalEvent.wheelDelta>0){
              if(sizeCardCurrent<1.5){
                sizeCardNew = sizeCardCurrent + 0.1
              }
            }else{
              if(sizeCardCurrent>0.5){
                sizeCardNew = sizeCardCurrent - 0.1
              }
            }
            API.setUserInfo({"sizeCard" : sizeCardNew}, localStorage.email).then(function(data){
              API.getUserData(data.data.email).then(function(data2){
                  that.props.changeAccountState(data2.data.userData);
                  //localStorage.setItem("userData", JSON.stringify(data2.data.userData))
                })
            })
          }



      });
  }

  log = () => {
    console.log("log")
  }



  renderMovies = (movie) => {
      return <Card
        Movie = {movie}
        Size = {this.props.accountState.sizeCard ? 1*this.props.accountState.sizeCard :1}
        WidthCard = {200}
        HeightCard = {300}
        Src={getImageFromApi(movie.poster_path)}
        onClick={this.props.togglePopup}
        toggleInToWatchList = {this.props.toggleInToWatchList}
        toggleInToFavourites = {this.props.toggleInToFavourites}/>
  }

  renderMoviesCarousel = (movies) => {
    const items = []
    const numberOfElementInCarousel = 20
    for (var i=0;i<numberOfElementInCarousel;i++) {
      if(movies[i]){
        items.push(
          <Card
          Movie = {movies[i]}
          Size = {this.props.accountState.sizeCard ? 1*this.props.accountState.sizeCard :1}
          WidthCard = {200}
          HeightCard = {300}
          Src={getImageFromApi(movies[i].poster_path)}
          onClick={this.props.togglePopup}
          toggleInToWatchList = {this.props.toggleInToWatchList}
          toggleInToFavourites = {this.props.toggleInToFavourites}/>
        )
      }
    }
    return items
  }


  writeStringIfSearchCollapse = () => {
    var stringToWrite = "Impossible to find a movie with";
    var divToRender = <div>Impossible to find a movie with"</div>
    if(this.props.categorySelected){
      if(this.props.categorySelected.length>0){
        if(this.props.categorySelected.length === 1){
          stringToWrite = stringToWrite + "the category : \"" + this.props.categorySelected[0] + "\". "
          divToRender = divToRender + <div>the category : "<strong>{this.props.categorySelected[0]}</strong>". </div>
        }else if(this.props.categorySelected.length > 1){
          stringToWrite = stringToWrite + "the categories : \""
          divToRender = divToRender + <div>the categories : "</div>
          for(var i=0; i<this.props.categorySelected.length-1;i++){
            divToRender = divToRender + <div><strong>{this.props.categorySelected[i]}</strong> , </div>
            stringToWrite = stringToWrite + this.props.categorySelected[i] + "\" , \""
          }
          stringToWrite = stringToWrite + this.props.categorySelected[this.props.categorySelected.length-1]
          divToRender = divToRender + <div><strong>{this.props.categorySelected.length-1}</strong></div> + <div>". </div>
        }
        if(this.props.keywordSelected.length>0){
          stringToWrite = stringToWrite + " and "
        }else{
            stringToWrite = stringToWrite + "\". "
        }
      }
    }
    if(this.props.keywordSelected){
      if(this.props.keywordSelected.length>0){
        if(this.props.keywordSelected.length === 1){
          stringToWrite = stringToWrite + "the key word : \"" + this.props.keywordSelected[0] + "\". "
          divToRender = divToRender + <div>the key word : "<strong>{this.props.keywordSelected[0]}</strong>". </div>
        }else if(this.props.keywordSelected.length > 1){
          stringToWrite = stringToWrite + "the key words : \""
          divToRender = divToRender + <div>the key words : "</div>
          for(var i=0; i<this.props.keywordSelected.length-1;i++){
            divToRender = divToRender + <div><strong>{this.props.keywordSelected[i]}</strong> , </div>
            stringToWrite = stringToWrite + this.props.keywordSelected[i] + "\" , \""
          }
          stringToWrite = stringToWrite + this.props.keywordSelected[this.props.keywordSelected.length-1] + "\". "
          divToRender = divToRender + <div><strong>{this.props.keywordSelected.length-1}</strong></div> + <div>". </div>
        }

      }
    }

    stringToWrite = stringToWrite + "Please try another research"
    return stringToWrite
  }

  getSectionRef = el => {
    this.props.setSectionRef(el);
  }

  render(){
    var theme = this.props.accountState.theme ? ThemesItems[this.props.accountState.theme] : ThemesItems[0];
    return(
      <div style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap:'wrap', overflowY: 'auto', paddingTop:25, backgroundColor:theme.background.element1.interior}} ref={this.getSectionRef} id="researchResult">
        {!this.props.currentReseachInAction ?
          <div style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap:'wrap'}}>
            {this.props.moviesPopular ?
              <div>
                <div style={{width:'100%', backgroundColor:'rgba(0,0,0,0)', fontSize:18, textAlign:'start', paddingLeft:20,}}><strong>Popular Movies</strong></div>
                <MoviesListDisplayer listOfMovies={this.props.moviesPopular} renderMoviesCarousel={this.renderMoviesCarousel(this.props.moviesPopular)} numberCard={Math.trunc(5/this.props.accountState.sizeCard)}/>
              </div>
              : null
            }
            {this.props.moviesRecent?
              <div>
                <div style={{width:'100%', backgroundColor:'rgba(0,0,0,0)', fontSize:18, textAlign:'start', paddingLeft:20,}}><strong>Recent Movies</strong></div>
                <MoviesListDisplayer listOfMovies={this.props.moviesRecent} renderMoviesCarousel={this.renderMoviesCarousel(this.props.moviesRecent)} numberCard={Math.trunc(5/this.props.accountState.sizeCard)}/>
              </div>
              : null
            }
            {this.props.moviesUpcoming ?
              <div>
                <div style={{width:'100%', backgroundColor:'rgba(0,0,0,0)', fontSize:18, textAlign:'start', paddingLeft:20,}}><strong>Upcoming Movies</strong></div>
                <MoviesListDisplayer listOfMovies={this.props.moviesUpcoming} renderMoviesCarousel={this.renderMoviesCarousel(this.props.moviesUpcoming)} numberCard={Math.trunc(5/this.props.accountState.sizeCard)}/>
              </div>
              : null
            }
            {this.props.moviesTopRated ?
              <div>
                <div style={{width:'100%', backgroundColor:'rgba(0,0,0,0)', fontSize:18, textAlign:'start', paddingLeft:20,}}><strong>Top Rated Movies</strong></div>
                <MoviesListDisplayer listOfMovies={this.props.moviesTopRated} renderMoviesCarousel={this.renderMoviesCarousel(this.props.moviesTopRated)} numberCard={Math.trunc(5/this.props.accountState.sizeCard)}/>
              </div>
              : null
            }
            {localStorage.favourites?
              JSON.parse(localStorage.favourites).length>0 ?
                <div>
                  <div style={{width:'100%', backgroundColor:'rgba(0,0,0,0)', fontSize:18, textAlign:'start', paddingLeft:20,}}><strong>Favourites</strong></div>
                  <MoviesListDisplayer listOfMovies={JSON.parse(localStorage.favourites)} renderMoviesCarousel={this.renderMoviesCarousel(JSON.parse(localStorage.favourites))} numberCard={Math.trunc(5/this.props.accountState.sizeCard)}/>
                </div>
                : null : null
              }
          </div> :
          <div></div>
        }
        <div >
          {this.props.moviesSelected  ?
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap:'wrap', borderStyle: 'solid', borderWidth: 0, borderColor: 'black', marginTop:25, height:"100%"}}>
              {this.props.moviesSelected.map((movie) => (
                this.renderMovies(movie)
              ))}
              {this.props.moviesSelected.length>0 ?
                <div onClick={this.props.extendResearch} onMouseEnter={this.onEnterLastCard} onMouseLeave={this.onQuitLastCard} style={{marginLeft:20, width:this.props.accountState.sizeCard ? 200*this.props.accountState.sizeCard : 200, height:this.props.accountState.sizeCard? 300*this.props.accountState.sizeCard:300, backgroundColor:this.state.backgroundColorCardMore, color:this.state.colorCardMore, fontSize:this.state.fontSizeCardMore, display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", cursor:"pointer"}}>+
                </div>
                : null
              }
            </div>
            :
            <div></div>
          }
          <ResearchImpossible pose={this.props.impossibleToFindMovie || this.props.impossibleToFindMovieWithFilter ? "hovered" : "idle"} style={{width:'100%', height:'100%'}}>
            <div style={{ width:'100%', height:'100%', textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center', backgroundColor:'rgba(0,0,0,0.01)', marginTop: 0}}>
              {this.props.impossibleToFindMovie ?
                <div>
                  Impossible to find a movie with the word : "<strong>{this.props.filmResearched}</strong>" .<br/>
                  Please try another research
                </div> :
                <div></div>
              }
              {this.props.impossibleToFindMovieWithFilter ?
                <div>
                  {this.writeStringIfSearchCollapse()}
                </div> :
                <div></div>
              }
            </div>
          </ResearchImpossible>
        </div>
      </div>
    )
  }



}



const mapStateToProps = (state) => {
  return {
    accountState:state.accountStateRedux,
  }
}

const ResearchResults = connect(mapStateToProps, mapDispatchToProps)(ResearchResultsComponent);
export default ResearchResults;
