import React, { Component } from 'react';
import { getFilmDetailFromApi } from '../API/TMDBAPI';
import Spinner from 'react-activity/lib/Spinner';
import 'react-activity/dist/react-activity.css';
import { getImageFromApi } from '../API/TMDBAPI'


export default class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true,
     }
  }


  componentDidMount() {
    getFilmDetailFromApi(this.props.Id).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
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

  _displayImage = () => {
    return getImageFromApi(this.state.film.backdrop_path)
  }

  _displayFilm = () => {
    const { film } = this.state
    if (this.state.film != undefined) {
      return (
        <div style={{width:'100%', height:500, display:'flex', flexDirection:"row"}}>
          <div style={{'width':500}}>
            {getImageFromApi(film.backdrop_path) != "https://image.tmdb.org/t/p/w300null" ?
                <img style={{width:'100%'}} src={getImageFromApi(film.backdrop_path)}/> :
                <img style={{width:'100%'}} src={require('../Assets/images/notAvailable.jpg')}/>
            }
          </div>
          <div style={{'width':500}}>
            <div style={styles.title_text}>{film.title}</div>
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
