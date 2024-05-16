import { Alert, Box, Button, Card, Container, Grid, Link, Snackbar, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const body = {
      oldPassword: data.get('oldPassword'),
      newPassword: data.get('newPassword'),
    }
    try {
      console.log(body);
      const response = await axios.put(`http://localhost:8000/auth/change-password/${localStorage.getItem('userID')}`, body);
      if (response.data.success) {
        setLoginMsg('Password changed successfully');
        setOpen(true);
        setTimeout(() => { 
          navigate('/');
        }, [3000])
        
      } else {
        setLoginMsg('Your old password is incorrect');
        setOpen(true);
      }
    } catch (err) {
      setLoginMsg('Your old password is incorrect');
      setOpen(true);
    }
  }
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
    <Container
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          p: 4
        }}
      >
        <Typography variant='h5'>Change Password</Typography>
        <Box>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="oldPassword"
              label="Old Password"
              name="oldPassword"
              type="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor:'primary.main', textTransform: 'none' }}
            >
              Update Password
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
          </Box>
        </Box>
      </Card>
    </Container>
  )
}
