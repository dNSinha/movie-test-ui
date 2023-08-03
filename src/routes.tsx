import { Suspense } from 'react';
import { createBrowserRouter } from "react-router-dom";
import Movies from './components/Movies';
import AddMovie from './components/AddMovie';
import Login from './components/Login';
import Signup from "./components/Signup";
import App from './App';
import Movie from './components/Movie';
import Error from './components/Error';

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: (
                    <Suspense fallback={<h1>Loading....</h1>}>
                        <Signup />
                    </Suspense>
                ),
            },
            {
                path: "/movies",
                element: <Movies />,
            },
            {
                path: "/addMovie",
                element: (
                    <Suspense fallback={<h1>Loading....</h1>}>
                        <AddMovie />
                    </Suspense>
                ),
            },
            {
                path: "/movie/:movieName",
                element: <Movie />,
            }
        ],
        errorElement: <Error />,
    }
]);