import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Comment from './Comment';
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_MOVIE, GET_MOVIE_BY_NAME } from '../api/Movies';
import { ReadOnlyRating } from './Rating';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type IComment = {
    comment: string;
    movieId: string;
    rating: number;
    userName: string;
}

type MovieDetails = {
    actors: string[];
    averageUserRating: number;
    duration: string;
    movieName: string;
    releaseDate: string;
    comment: IComment[];
}

type DeleteResponse = {
    deleteMovie: boolean;
}

const Movie = () => {
    const { movieName } = useParams();
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_MOVIE_BY_NAME, { variables: { id: movieName } });
    // if (movieLoading) return <h1>Loading</h1>
    const movieDetails: MovieDetails = data?.getMovie;

    const [deleteMovie, newData] = useMutation<DeleteResponse>(DELETE_MOVIE, { variables: { id: movieName } });
    const handleDeleteClick = () => {
        deleteMovie();
    }

    React.useEffect(() => {
        newData?.data?.deleteMovie && navigate("/movies");
    }, [newData?.data?.deleteMovie]);




    return (
        <Card sx={{ minWidth: 275 }} className='data-table'>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {movieDetails?.releaseDate}
                </Typography>
                <Typography variant="h5" component="div">
                    {movieDetails?.movieName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <span className='sub-heading'>Running Time:</span> {movieDetails?.duration} minutes
                </Typography>
                {movieDetails?.averageUserRating ? <ReadOnlyRating value={movieDetails?.averageUserRating} /> :
                    <Typography variant="body2">
                        Not Rated
                    </Typography>}
                <Typography variant="body2">
                    <span className='sub-heading'>Star Cast:</span> {movieDetails?.actors?.join(", ")}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small" onClick={handleDeleteClick}>Delete</Button>
            </CardActions>
            {
                movieDetails?.comment?.length > 0 &&
                <>
                    <Typography variant="h5" component="div" sx={{ margin: 1 }}>
                        Comments...
                    </Typography>
                    <Comment comments={movieDetails?.comment} />
                </>
            }
        </Card>
    );
}

export default Movie;