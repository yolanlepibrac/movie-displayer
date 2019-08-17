import React, { Component } from 'react';
import Card from './Card';
import { getImageFromApi } from '../API/TMDBAPI'
import API from '../Utils/API';
import ThemesItems from '../Utils/Themes';

import { changeAccountState } from "../Actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    changeAccountState: (article) => dispatch(changeAccountState(article)),
    accountStateRedux:dispatch.accountStateRedux,
  };
};

class WatchLaterComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    var that = this
    window.$("#displayWatchLater").bind('mousewheel DOMMouseScroll', function(event){

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

  renderMovies = (movie) => {
      return <Card
        Movie = {movie}
        Size = {this.props.accountState.sizeCard ? this.props.accountState.sizeCard :1}
        WidthCard = {200}
        HeightCard = {300}
        Src={getImageFromApi(movie.poster_path)}
        onClick={this.props.togglePopup}
        toggleInToWatchList = {this.props.toggleInToWatchList}
        toggleInToFavourites = {this.props.toggleInToFavourites}/>
  }



  render(){
    var theme = this.props.accountState.theme ? ThemesItems[this.props.accountState.theme] : ThemesItems[0];
    return(
      <div style={{display:"flex", flexDirection:"column", backgroundColor:theme.background.element1.interior, overflow:"auto", height:"100%", paddingTop:25}} id="displayWatchLater">
        <h5>TO WATCH LATER</h5>
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap:'wrap',  overflowY: 'auto', marginTop:25, }}>
          {this.props.accountState.watchLater.length>0 ?
            this.props.accountState.watchLater.map((movie) => (
              this.renderMovies(movie)
            ))
            :
            <div>You do not have moovies in your list</div>
          }
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

const WatchLater = connect(mapStateToProps, mapDispatchToProps)(WatchLaterComponent);
export default WatchLater;
