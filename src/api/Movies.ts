import { gql } from "@apollo/client/core";

export const GET_ALL_MOVIES = gql`
query GetMovies {
  getMovies {
    id
    movieName
    releaseDate
    duration
    actors
    averageUserRating
  }
}
`

export const GET_MOVIE_BY_NAME = gql`
query GetMovie($id: ID!) {
  getMovie(id: $id) {
    id
    movieName
    releaseDate
    duration
    actors
    averageUserRating
    comment {
      id
      movieId
      userName
      comment
      rating
    }
  }
}
`

export const ADD_MOVIE = gql`
mutation AddMovie($movieName: String!, $releaseDate: String!, $duration: String!, $actors: [String]) {
  addMovie(movieName: $movieName, releaseDate: $releaseDate, duration: $duration, actors: $actors) {
    id
    movieName
    releaseDate
    duration
    actors
  }
}
`

export const DELETE_MOVIE = gql`
mutation DeleteMovie($id: ID!) {
  deleteMovie(id: $id)
}
`