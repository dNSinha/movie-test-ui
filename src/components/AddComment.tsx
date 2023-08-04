import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../api/Movies";
import BannerMessage from "./BannerMessage";
import { useLocation, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

type FormShape = {
    comment: string | null;
    rating?: number | null;
}

type CommentResponse = {
    addMovieComment: AddMovieComment;
}

type AddMovieComment = {
    id: string;
}

const AddComment = () => {
    const location = useLocation();
    const { movieId }: { movieId: string } = location.state;

    const formShape: FormShape = {
        comment: null,
        rating: null
    }
    const [formData, setFormData] = React.useState<FormShape>(formShape);
    const [formError, setFormError] = React.useState<FormShape>(formShape);
    const navigate = useNavigate();

    const [commentMovie, { data, error }] = useMutation<CommentResponse>(ADD_COMMENT, { variables: { ...formData, movieId, userName: 'test' } });

    React.useEffect(() => {
        if (data?.addMovieComment?.id) {
            navigate("/movies");
        }
    }, [data?.addMovieComment?.id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event?.currentTarget;
        setFormData({ ...formData, [name]: value });
    }

    const handleRatingChange = (event: React.SyntheticEvent<Element, Event>, value: number | null) => {
        setFormData({ ...formData, rating: value });
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setFormError(validate(formData));
        if (Object.values(formError).every(element => element === null) && Object.values(formData).every(element => element !== null)) {
            commentMovie();
        }
    }

    const validate = (values: FormShape): FormShape => {
        const errors: FormShape = { comment: null }
        if (!values.comment) {
            errors.comment = "Comment is required!"
        }

        return errors;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Rating name="rating" value={formData?.rating} onChange={handleRatingChange} />


                    <TextField margin="normal" required fullWidth id="comment" onChange={handleChange}
                        error={formError?.comment && formError?.comment.length ? true : false}
                        helperText={formError?.comment} autoFocus
                        label="Comment" name="comment" />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                </Box>
            </Box>
            {error?.graphQLErrors && <BannerMessage />}
        </Container>
    )
};

export default AddComment;