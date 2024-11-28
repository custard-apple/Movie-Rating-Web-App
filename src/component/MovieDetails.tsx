import React from 'react';
import { isObjectEmpty } from '../App';
import { Stack, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { Movie } from '../App';

interface MovieDetailsProps {
    movie: Movie | null,
    isLoading: boolean
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, isLoading }) => {
    if (!movie) {
        return <div>No Movie selected!</div>
    }
    const calculateAverageRating = (ratings: { Source: string; Value: string }[]) => {
        const values = ratings.map((rating) => {
            if (rating.Source === "Internet Movie Database") {
                return parseFloat(rating.Value.split("/")[0]) * 10;
            } else if (rating.Value.includes("%")) {
                return parseFloat(rating.Value);
            } else {
                return parseFloat(rating.Value.split("/")[0]);
            }
        });
        return values.reduce((acc, val) => acc + val, 0) / values.length;
    };
    const averageRating = !isObjectEmpty(movie) && movie.Ratings.length > 0 ? calculateAverageRating(movie?.Ratings) : undefined;

    return (
        <>
            <Col>
                {isLoading ? (<Spinner animation="grow" />) : (
                    !isObjectEmpty(movie) ? (
                        <>
                            <div>
                                <h3>{movie.Title}</h3>
                            </div>
                            <Row className='poster'>
                                <Col lg="3"><img src={movie.Poster} alt='' /></Col>
                                <Col>{movie.Plot}</Col>
                            </Row>
                            <div className='mt-4'>
                                Directed By : {movie.Director}
                            </div>
                            <div>
                                Average Rating : {averageRating}
                            </div>
                            <Stack direction="horizontal" gap={2} className='mt-2'>
                                {movie?.Ratings.length > 0 && movie.Ratings.map((site: any) => (
                                    <Badge pill bg="info" >
                                        {site.Source} : {site.Value}
                                    </Badge>
                                ))}
                            </Stack>
                        </>
                    ) : <Row>No Movie Selected!</Row>
                )}
            </Col>
        </>
    )
}

export default MovieDetails