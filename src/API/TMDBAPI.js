


const API_TOKEN = "81df88d8f10659819b6ccc4284e48374";
const Language = "fr"

export function getFilmsFromApiWithSearchedText (text) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=' + Language + '&query='
  + text
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

export function getFilmsFromApiWithSearchedFilter (urlToSearch) {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + urlToSearch
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

export function getKeyWordIdFromApiWithSearchedKeyWord (listOfKeyWord) {
  const url = 'https://api.themoviedb.org/3/search/keyword?api_key=' + API_TOKEN + '&query='
  + listOfKeyWord
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.error(error))
}

export function getFilmsFromApiWithSearchedKeyWord (listOfKeyWord) {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&with_keywords='
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

export function getVideoFromApi (id) {
  return fetch('http://api.themoviedb.org/3/movie/' + id + '/videos?api_key=' + API_TOKEN + '&language=' + Language + '\'')
  .then((response) => response.json())
  .catch((error) => console.error(error));
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

export const listOfGenres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
