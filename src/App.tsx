import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import MovieDetails from './component/MovieDetails';
import MovieList from './component/MovieList';
import SortSearchBar from './component/SortSearchBar';
export const isObjectEmpty = (objectName: any) => {
  return Object.keys(objectName).length === 0
}
export interface Movie {
  Title: string,
  Poster: string,
  Plot: string,
  Director: string,
  Ratings: {
    Source: string,
    Value: string
  }[]
}

export interface MoviesList {
  title: string;
  episode_id: number;
  release_date: string;
  director: string;
  producer: string;
  opening_crawl: string;
};

const App: React.FC = () => {
  const url = 'https://swapi.dev/api/films/?format=json';

  const [movieList, setMovieList] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortType, setSortType] = useState('');

  const fetchMovies = async () => {
    let response = await fetch(url);
    let data = await response.json();
    if (data)
      setMovies(data?.results);
  }

  useEffect(() => {
    setSearchTerm('')
    fetchMovies();
  }, [])

  useEffect(() => {
    setMovieList(movies);
  }, [movies])

  useEffect(() => {
    let moviesCopy = [...movies];
    let searchedData = moviesCopy.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    setMovieList(searchedData);
  }, [searchTerm])


  const showMovieDetails = async (movieTitle: string) => {
    setIsLoading(true);
    let posterurl = `http://www.omdbapi.com/?apikey=b9a5e69d&t=${movieTitle}`;
    let response = await fetch(posterurl);
    let data = await response.json();
    if (data)
      setSelectedMovie(data);
    setIsLoading(false);
  }

  const handleSort = (criteria: string) => {
    const sortedMovies = [...movies].sort((a, b) => {
      if (criteria === "release_date") {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return dateA.getTime() - dateB.getTime();
      } else if (criteria === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
    setMovieList(sortedMovies);
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const criteria = event.target.value;
    setSortType(criteria);
    handleSort(criteria);
  };

  return (
    <>
      <div className=''>
        <SortSearchBar handleDropdownChange={handleDropdownChange} sortType={sortType} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Container fluid className='mt-4'>
          <Row>
            <MovieList movieList={movieList} showMovieDetails={showMovieDetails} />
            <MovieDetails movie={selectedMovie} isLoading={isLoading} />
          </Row>
        </Container>
      </div >
    </>

  );
}

export default App;
