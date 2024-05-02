import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios'
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => { 
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  if (isLoggedIn) { 
    navigate('/dashboard');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const loginData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    /*axios.post("http://localhost:8000/auth/login", loginData).then((res) => {
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setLoginMsg('Successfully login to the account');
        setOpen(true);
      } else {
        setLoginMsg('Username of password incorrect');
        setOpen(true);
      }
    }).catch((err) => { 
      setLoginMsg(err.message);
      setOpen(true);
    })*/

    try {
      console.log(loginData);
      const response = await axios.post(`http://localhost:8000/auth/login`, loginData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setLoginMsg('Successfully login to the account');
        setOpen(true);
        navigate('/');
        window.location.reload();
      } else {
        setLoginMsg('Username or password incorrect');
        setOpen(true);
      }
    } catch (err) {
      setLoginMsg('Username or password incorrect');
      setOpen(true);
    }
  };

  const [loginMsg, setLoginMsg] = React.useState('')

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src='images/kdu-logo.png' alt='kdu-logo' width={150}/>
          <Typography component="h1" variant="h5" sx={{fontWeight:700, mt: 2}}>
            Welcome to KDU EMS
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid container sx={{display:'flex', alignItems:'center'}}>
              <Grid item xs>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" sx={{textDecoration: 'none', }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 6, backgroundColor:'primary.main' }}
            >
              Sign In
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={3000} // Automatically close after 30000ms (30 seconds)
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                {loginMsg}
              </Alert>
            </Snackbar>
            <Typography sx={{textAlign: 'center'}}>
              Don't have an account? <Link sx={{textDecoration: 'none'}}>contact administration</Link>
            </Typography>
          </Box>
        </Box>
      </Container>
  );
}
