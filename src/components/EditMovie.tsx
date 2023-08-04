import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MuiChipsInput } from 'mui-chips-input'
import { useMutation } from '@apollo/client';
import { EDIT_MOVIE } from '../api/Movies';
import BannerMessage from "./BannerMessage";
import { useLocation, useNavigate } from 'react-router-dom';

type FormShape = {
    movieName: string | null;
    releaseDate: string | null;
    duration: number | null; //changed
}

type FormErrorShape = {
    movieName: string | null;
    releaseDate: string | null;
    duration: string | null;
}

type AddMovieResponse = {
    editMovie: boolean;
}

type MovieDetails = {
    id: string;
    actors: string[];
    duration: number;
    movieName: string;
    releaseDate: string;
}

const EditMovie = () => {
    const location = useLocation();
    const { movie }: { movie: MovieDetails } = location.state;

    console.log('movie', movie);

    const formShape: FormShape = {
        movieName: movie?.movieName,
        releaseDate: movie?.releaseDate,
        duration: movie?.duration
    }

    const formErrorShape: FormErrorShape = {
        movieName: null,
        releaseDate: null,
        duration: null
    }


    const [formData, setFormData] = React.useState<FormShape>(formShape);
    const [formError, setFormError] = React.useState<FormErrorShape>(formErrorShape);
    const [chips, setChips] = React.useState([]);
    const navigate = useNavigate();

    const [addMovie, { data, error }] = useMutation<AddMovieResponse>(EDIT_MOVIE, { variables: { id: movie?.id,...formData, actors: chips } });

    const handleActorsChange = (newChips: any) => {
        setChips(newChips)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event?.currentTarget;
        setFormData({ ...formData, [name]: value });
    }

    React.useEffect(() => {
        data?.editMovie && navigate("/movies");
    }, [data?.editMovie]);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setFormError(validate(formData));
        if (Object.values(formError).every(element => element === null) && Object.values(formData).every(element => element !== null)) {
            addMovie();
        }
    }

    const validate = (values: FormShape): FormErrorShape => {
        const errors: FormErrorShape = formErrorShape;

        if (!values.movieName) {
            errors.movieName = "Movie name is required!"
        }

        if (!values.releaseDate) {
            errors.releaseDate = "Release date is required!"
        }

        if (!values.duration) {
            errors.duration = "Duration is required in minutes!"
        }
        return errors;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <Typography component="h1" variant="h5">
                    Update Movie
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="movieName" onChange={handleChange}
                        error={formError?.movieName && formError?.movieName.length ? true : false}
                        value={formData?.movieName} helperText={formError?.movieName} autoFocus
                        label="Movie Name" name="movieName" />

                    <TextField margin="normal" required fullWidth onChange={handleChange}
                        error={formError?.releaseDate && formError?.releaseDate.length ? true : false}
                        value={formData?.releaseDate} helperText={formError?.releaseDate}
                        name="releaseDate" label="Release Date" id="releaseDate" />

                    <TextField margin="normal" required fullWidth onChange={handleChange}
                        error={formError?.duration && formError?.duration.length ? true : false}
                        value={formData?.duration} helperText={formError?.duration}
                        name="duration" label="Duration (in minutes)" id="duration" />

                    <MuiChipsInput className='m-chips-input' label="Actors" value={chips} onChange={handleActorsChange} />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Update
                    </Button>
                </Box>
            </Box>
            {data && <BannerMessage />}
        </Container>
    );
}

export default EditMovie;
