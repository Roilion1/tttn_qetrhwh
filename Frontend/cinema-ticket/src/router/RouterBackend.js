import Dashboard from "../pages/backend/Dashboard";
import MovieList from "../pages/backend/Movie/MovieList";
import MovieTrash from './../pages/backend/Movie/MovieTrash';
import MovieCreate from './../pages/backend/Movie/MovieCreate';
import MovieUpdate from './../pages/backend/Movie/MovieUpdate';
import MovieDetail from './../pages/backend/Movie/MovieDetail';
import LoginForm from "../layouts/admin/auth/LoginForm";
import RegisterForm from "../layouts/admin/auth/RegisterForm";
import AgeRatingList from './../pages/backend/AgeRating/AgeRatingList';
import AgeRatingCreate from './../pages/backend/AgeRating/AgeRatingCreate';
import AgeRatingTrash from './../pages/backend/AgeRating/AgeRatingTrash';
import AgeRatingDetail from './../pages/backend/AgeRating/AgeRatingDetail';
import AgeRatingUpdate from './../pages/backend/AgeRating/AgeRatingUpdate';

const RouterBackend = [
    { path: "", element: <Dashboard /> },

    {
        path: "movie",
        children: [
            { path: "", element: <MovieList /> },
            { path: "trash", element: <MovieTrash /> },
            { path: "create", element: <MovieCreate /> },
            { path: "update/:id", element: <MovieUpdate /> },
            { path: "show/:id", element: <MovieDetail /> },
        ],
    },

    {
        path: "age-rating",
        children: [
            { path: "", element: <AgeRatingList /> },
            { path: "trash", element: <AgeRatingTrash /> },
            { path: "create", element: <AgeRatingCreate /> },
            { path: "update/:id", element: <AgeRatingUpdate /> },
            { path: "show/:id", element: <AgeRatingDetail /> },
        ],
    },

    { path: "login", element: <LoginForm /> },
    { path: "register", element: <RegisterForm /> },
];

export default RouterBackend;
