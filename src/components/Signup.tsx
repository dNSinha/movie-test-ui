import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useMutation } from "@apollo/client";
import { LOGIN_USER, SIGNUP_USER } from "../api/Admin";
import { useCookies } from 'react-cookie';
import BannerMessage from "./BannerMessage";
import { useNavigate } from "react-router-dom";

type FormShape = {
    username: string | null;
    password: string | null;
}

type SignupResponse = {
    register: Register;
}

type Register = {
    username: string | null;
    password: string | null;
    token: string | null;
}

const Signup = () => {
    const formShape: FormShape = {
        username: null,
        password: null
    }
    const [formData, setFormData] = React.useState<FormShape>(formShape);
    const [formError, setFormError] = React.useState<FormShape>(formShape);
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();

    const [signupUser, { data, error }] = useMutation<SignupResponse>(SIGNUP_USER, { variables: formData });

    React.useEffect(() => {
        if (data?.register?.token) {
            setCookie('token', data?.register?.token, { path: '/' });
            navigate("/movies");
        }
    }, [data?.register?.token]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event?.currentTarget;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setFormError(validate(formData));
        if (Object.values(formError).every(element => element === null) && Object.values(formData).every(element => element !== null)) {
            signupUser();
        }
    }

    const validate = (values: FormShape): FormShape => {
        const errors: FormShape = { username: null, password: null }
        if (!values.username) {
            errors.username = "Username is required!"
        }

        if (!values.password) {
            errors.password = "Password is required!"
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
                    <TextField margin="normal" required fullWidth onChange={handleChange}
                        id="username" label="Username" name="username"
                        error={formError?.username && formError?.username.length ? true : false}
                        helperText={formError?.username} autoFocus />

                    <TextField margin="normal" required fullWidth onChange={handleChange}
                        name="password" label="Password" type="password" id="password"
                        error={formError?.password && formError?.password.length ? true : false}
                        helperText={formError?.password} />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
                </Box>
            </Box>
            {error?.graphQLErrors && <BannerMessage />}
        </Container>
    )
};

export default Signup;