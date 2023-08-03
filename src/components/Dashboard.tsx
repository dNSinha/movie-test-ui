import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    // const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleLogout = () => {
        removeCookie("token", { path: '/' });
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Movie Library
                    </Typography>
                    {cookies.token ?
                        <ul id="navbar" className='links'>
                            <li className='link'><Link to="/movies">Movies</Link></li>
                            <li className='link'><Link to="/addMovie">Add Movie</Link></li>
                            <li className='link'><Link to="/" onClick={handleLogout}>Logout</Link></li>
                        </ul> :
                        <ul id="navbar" className='links'>
                            <li className='link'><Link to="/login">Login</Link></li>
                            <li className='link'><Link to="/signup">Signup</Link></li>
                        </ul>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
