import React, { Component } from 'react';
import { getFilmDetailFromApi } from '../API/TMDBAPI';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/dist/react-activity.css';
import { getImageFromApi } from '../API/TMDBAPI'
import { getVideoFromApi } from '../API/TMDBAPI'


export default class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true,
      urlMovie : "",
     }
  }


  componentDidMount() {
    getFilmDetailFromApi(this.props.Id).then(data => {
      console.log(data)
      this.setState({
        film: data,
        isLoading: false
      })
    })
    getVideoFromApi(this.props.Id).then(data => {
      if(data.results){
        if(data.results[0]){
          this.setState({
            urlMovie : 'https://www.youtube.com/embed/' + data.results[0].key,
          })
        }else{
          this.setState({
            urlMovie : 'https://www.youtube.com/embed/' + data.results.key,
          })
        }
      }

    })
  }


  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <div style={styles.loading_container}>
          <Spinner />
        </div>
      )
    }
  }

  displayTrailer = () => {
       return <iframe width="600"  height="400" src={this.state.urlMovie} frameborder="0" allowfullscreen="1"></iframe>
  }




  _displayFilm = () => {
    const { film } = this.state
    if (this.state.film != undefined) {
      return (
        <div style={{width:'40vw', display:'flex', flexDirection:"row"}}>
          <div style={{width:'40vw'}}>
            {getImageFromApi(film.backdrop_path) != "https://image.tmdb.org/t/p/w300null" ?
                <img style={{width:'30vw'}} src={getImageFromApi(film.poster_path)}/> :
                <img style={{width:'40vw'}} src={require('../Assets/images/notAvailable.jpg')}/>
            }
          </div>
          <div style={{'width':'100vw'}}>
            <div style={styles.title_text}>{film.title}</div>
            <div >{this.displayTrailer()}</div>
            <div style={styles.description_text}>{film.overview}</div>
            <div style={styles.default_text}>Sorti le {film.release_date}</div>
            <div style={styles.default_text}>Note : {film.vote_average} / 10</div>
            <div style={styles.default_text}>Nombre de votes : {film.vote_count}</div>
            <div style={styles.default_text}>Budget : {film.budget} $</div>
            <div style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                return genre.name;
              }).join(" / ")}
            </div>
            <div style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                return company.name;
              }).join(" / ")}
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </div>
    )
  }
}

let styles = {
    main_container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
    },
    loading_container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'black',
    },

}
