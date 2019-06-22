


const API_TOKEN = "81df88d8f10659819b6ccc4284e48374";
const Language = "fr"

export function getFilmsFromApiWithSearchedText (text) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=' + Language + '&query='
  + text
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

export function getFilmsFromApiWithSearchedCategory (listOfCategories) {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&with_genres='
  + listOfCategories
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

export function getFilmsFromApiWithSearchedKeyWord (listOfKeyWord) {
  const url = 'https://api.themoviedb.org/3/search/keyword?api_key=' + API_TOKEN + '&query='
  + listOfKeyWord
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

// API/TMDBApi.js

// Récupération du détail d'un film
export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=' + Language + '\'')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export function getPopularFilmsFromApi () {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&language=' + Language + '&query=' + '&sort_by=popularity.desc'
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

export function getRecentFilmsFromApi () {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&language=' + Language + '&query=' + '&sort_by=release_date.desc'
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

export const listOfGenres = {
  28 : "Action",
  12 : "Adventure",
  16 : "Animation",
  35 : "Comedy",
  80 : "Crime",
  99 : "Documentary",
  18 : "Drama",
  10751 : "Family",
  14 : "Fantasy",
  36 : "History",
  27 : "Horror",
  10402 : "Music",
  9648 : "Mystery",
  10749 : "Romance",
  878 : "Science Fiction",
  10770 : "TV Movie",
  53 : "Thriller",
  10752 : "War",
  37 : "Western",
}
