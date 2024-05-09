import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'd46bc98b44d5ab7e6dee55707cf0ebd4';
const API_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNDZiYzk4YjQ0ZDVhYjdlNmRlZTU1NzA3Y2YwZWJkNCIsInN1YiI6IjY2M2NiYWVkNTgzYjU0YjIwYjFlY2RmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mZqD9d-CMQe37osa1P0v09cvGq9bqWnC1yAPNJmSTFs';

const options = {
  headers: {
    Authorization: API_TOKEN,
  },
  include_adult: false,
  language: 'en',
};

export const getTrendMovie = async () => {
  const response = await axios.get('/trending/movie/day', {
    params: {
      options,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};

export const searchMovie = async (query) => {
  const response = await axios.get('/search/movie', {
    params: {
      options,
      query: query,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    params: {
      options,
      api_key: API_KEY,
    },
  });
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: {
      options,
      api_key: API_KEY,
    },
  });

  return response.data;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: {
      options,
      api_key: API_KEY,
    },
  });

  return response.data.results;
};
