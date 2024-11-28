import React from 'react'
import { MoviesList } from '../App'
import { Row, Col } from 'react-bootstrap';

interface MovieListProps {
    movieList: MoviesList[],
    showMovieDetails: (title: string) => void
}

const MovieList: React.FC<MovieListProps> = ({ movieList, showMovieDetails }) => {
    if (!movieList) {
        return <div>No Movies Available!</div>
    }
    return (
        <><Col>{movieList.length > 0 && movieList.map((movieObj) => (
            <Row key={movieObj.episode_id} data-testid="movie-item">
                <Col className='episode-name' onClick={() => showMovieDetails(movieObj.title)}>{movieObj.title}</Col>
                <Col className='wrap-text'>Episode {movieObj.episode_id}</Col>
                <Col>{movieObj.release_date}</Col>
            </Row>
        ))}
        </Col></>
    )
}

export default MovieList