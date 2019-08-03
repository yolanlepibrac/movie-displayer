import React, { Component } from 'react';
import { getFilmDetailFromApi } from '../API/TMDBAPI';
import Spinner from 'react-activity/lib/Spinner';
import CastingCard from './CastingCard';
import LittleCard from './LittleCard';
import 'react-activity/dist/react-activity.css';
import { getImageFromApi } from '../API/TMDBAPI'
import { getVideoFromApi } from '../API/TMDBAPI'
import { getSimilarMoviesFromApi } from '../API/TMDBAPI'
import { getCreditsFromApi } from '../API/TMDBAPI'


export default class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true,
      urlMovie : "",
      similarMovies : ["XX", "XXX"],
      credits : [],
     }
  }

  componentDidMount() {
    this.getMoviesData(this.props.Id)
  }


  getMoviesData = (id) => {

    getFilmDetailFromApi(id).then(data => {
      console.log(data)
      this.setState({
        film: data,
        isLoading: false,
      })
    })
    getVideoFromApi(id).then(data => {
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
    getSimilarMoviesFromApi(id).then(data => {
      this.setState({
        similarMovies : data.results,
      })
    })
    getCreditsFromApi(id).then(data => {
      let director = "";
      let scenarist = "";
      let producer = "";
      let photographyDirector = "";
      let artisticDirector = "";
      let animationDirector = "";
      let musicEditor = "";
      let musicComposer = "";
      for (var i = 0; i < data.crew.length;i++){
        if(data.crew[i].job == "Director"){
          director = data.crew[i].name
        }
        if(data.crew[i].job == "Screenplay"){
          scenarist = data.crew[i].name
        }
        if(data.crew[i].job == "Director of Photography"){
          photographyDirector = data.crew[i].name
        }
        if(data.crew[i].job == "Producer"){
          producer = data.crew[i].name
        }
        if(data.crew[i].job == "Art Direction"){
          artisticDirector = data.crew[i].name
        }
        if(data.crew[i].job == "Music Editor"){
          musicEditor = data.crew[i].name
        }
        if(data.crew[i].job == "Animation Director"){
          animationDirector = data.crew[i].name
        }
        if(data.crew[i].job == "Original Music Composer"){
          musicComposer = data.crew[i].name
        }
      }
      this.setState({
        credits : data,
        director : director,
        scenarist : scenarist,
        producer : producer,
        photographyDirector : photographyDirector,
        artisticDirector : artisticDirector,
        musicEditor : musicEditor,
        musicComposer : musicComposer,
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

  displayTrailer = () => {
       return <iframe width="500" height="350" src={this.state.urlMovie} frameborder="0" allowfullscreen="1"></iframe>
  }

  calculOfDuration = (duration) => {
    let houres = Math.trunc(duration/60);
    let minutes = duration-Math.trunc(duration/60)*60;
    let string = houres + "h " + minutes + "m "
    return string
  }

  displayCast = () => {
    let items = []
    for(var i=0;i<12;i++){
      items.push(<CastingCard Person={this.state.credits.cast[i]} Width={68} Height={110}/>)
    }
    return (<div style={{display:"flex", flexWrap:"wrap", width:"100%", height:"100%"}}>{items}</div>)
  }

  changeFilmPopup = (movie) => {

    getFilmDetailFromApi(movie.id).then(data => {
      this.setState({
        film: data,
        isLoading: false,
      })

    })
    this.getMoviesData(movie.id)
    this.props.changeMovie(movie)
  }





  renderSimilarMoovies = (movie) => {
    console.log(this.state.credits.similarMovies)
    return <LittleCard
      Movie={movie}
      Title={movie.title}
      Category={movie.genre_ids}
      Description={movie.overview}
      Id={movie.id}
      Size = {1}
      WidthCard = {100}
      HeightCard = {150}
      Likes={movie.vote_average/10/movie.vote_count}
      Dislikes={(1-movie.vote_average/10)/movie.vote_count}
      NumberOfVotes={movie.vote_count}
      Rates={movie.vote_average}
      Language={movie.original_language}
      Src={getImageFromApi(movie.poster_path)}
      favourite={this.favourite}
      changeFilmPopup={this.changeFilmPopup}/>
  }



  _displayFilm = () => {
    const { film } = this.state;
    const widthLikeBar = 500;
    const heightRatio = 20;
    if (this.state.film != undefined) {
      return (
        <div style={{width:'100vw', display:'flex', flexDirection:"row", overflow:"hidden", height:"75vh"}}>
          <div style={{position:"relative", width:'40vw'}}>
            {getImageFromApi(film.backdrop_path) != "https://image.tmdb.org/t/p/w300null" ?
                <img style={{width:'30vw', height:"75vh"}} src={getImageFromApi(film.poster_path)}/> :
                <div style={{width:'30vw', height:"75vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <img style={{width:'30vh', height:"15vh"}} src="http://primusdatabase.com/images/4/49/Not_Available.png"/>
                </div>
            }
          </div>
          <div style={{width:'60vw', overflow:"auto", display:"flex", flexDirection:"column",  alignItems:"center", }}>
            <div style={{ marginLeft:10, width:500, textAlign:"justify", marginTop:20}}>
              <div>{this.displayTrailer()}</div>

              <div style={{marginTop:10, marginBottom:10}} >{film.overview}</div>
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:'center' }}>
                <h4>Caracteristiques</h4>
                <div style={{ width:widthLikeBar, display:'flex', flexDirection:'row', marginLeft:50, marginRight:10, height:heightRatio/2, justifyContent:'center', overflow:'hidden', alignItems:'center' }}>
                  <div style={{width: widthLikeBar*film.vote_average, height:heightRatio/2, backgroundColor:'#AAEEAA',}}>
                  </div>
                  <div style={{width: widthLikeBar*(10-film.vote_average), height:heightRatio/2, backgroundColor:'#EEAAAA',}}>
                  </div>
                </div>
                <div style={styles.default_text}>{film.vote_average}/10</div>
              </div>
              <div style={{width:"100%",   display:"flex", flexDirection:"row"}}>
                <div style={{width:"100%",  borderStyle:"solid", borderWidth:0.5, padding:10, }}>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Titre</strong>
                    <div>{film.title}</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Sortie</strong>
                    <div>{film.release_date}</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Durée</strong>
                    <div>{this.calculOfDuration(film.runtime)}</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Langue originale</strong>
                    <div>{film.original_language}</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Budget</strong>
                    <div>{film.budget} $</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Genres</strong>
                    <div style={styles.default_text}>{film.genres.map(function(genre){
                        return genre.name;
                      }).join("/")}
                    </div>
                  </div>
                </div>
                <div style={{width:"100%",  borderStyle:"solid", borderWidth:0.5, padding:10, }}>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Réalisateur</strong>
                    <div>{this.state.director}</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Scénariste</strong>
                    <div>{this.state.scenarist}</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Production</strong>
                    <div>{this.state.producer}</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Musique</strong>
                    <div>{this.state.musicEditor}</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Direction Artistique</strong>
                    <div>{this.state.artisticDirector}</div>
                  </div>
                  <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <strong>Direction photo</strong>
                    <div>{this.state.photographyDirector}</div>
                  </div>

                </div>
              </div>
              <div style={{width:"100%",   display:"flex", flexDirection:"column",  borderStyle:"solid", borderWidth:0.5,  padding:10,}}>
                <strong>Casting</strong>
                <div style={{display:"inline-flex",  height:"100%", width:"1000"}}>
                  {this.state.credits.cast ?
                    this.displayCast() :
                    <div></div>
                  }
                </div>
              </div>
              <div style={{width:"100%",   display:"flex", flexDirection:"column",   marginBottom:50, marginTop:10}}>
                <strong>Similar moovies</strong>
                <div style={{display:"flex", flexDirection:"row", overflowX:"auto", height:"100%", marginTop:10}}>
                  {this.state.similarMovies.length >0 ?
                    this.state.similarMovies.map((movie) => (this.renderSimilarMoovies(movie)))
                    :
                    <div></div>
                  }
                </div>
              </div>
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
      borderWidth: 0,
      borderColor: 'black',
    },
    loading_container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent:"center",
      alignItems:"center",
      flexWrap: 'wrap',
      borderStyle: 'solid',
      borderWidth: 0,
      borderColor: 'black',
    },

}
