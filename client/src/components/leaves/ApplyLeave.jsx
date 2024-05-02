import { Box, Toolbar, Grid, Paper, Container, TextField, MenuItem, InputAdornment, Snackbar, Alert, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ApplyLeave() {
  const navigate = useNavigate();
  
  const [toastMsg, setToastMsg] = React.useState('')

  const [open, setOpen] = React.useState(false);
  const [employeeID, setEmployeeID] = useState('');
  const userID = localStorage.getItem('userID');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    
    const getLooggedInUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/employee/get-by-user-id/${userID}`);
        console.log(response.data)
        if (response.data.success) {
          setEmployeeID(response.data.employee._id)
        }
      } catch (err) {
        
      }
    };

    getLooggedInUser();
  }, [])
  
  const leaveCategories = [
    {
        value: 'choose_one',
        label: 'Choose One',
    },
    {
        value: 'Normal Leave',
        label: 'Normal Leave',
    },
    {
        value:'Overseas Leave',
        label: 'Overseas Leave',
    },
    {
        value:'Sick Leave',
        label: 'Sick Leave',
    },
    {
        value:'Weekend Leave',
        label: 'Weekend Leave',
    },
    {
        value:'Medical Leave',
        label: 'Medical Leave',
    },
  ]
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
      
    const empData = {
      category: data.get('category'),
      startDate: data.get('start-date'),
      endDate: data.get('end-date'),
      reason: data.get('reason'),
      user: userID,
      employee: employeeID,
    };

    try {
      const response = await axios.post(`http://localhost:8000/leave/create`, empData);
      if (response.data.success) {
        setToastMsg('Leave is added successfully');
        setOpen(true);
        navigate('/');
      } else {
        setToastMsg('Something went wrong, Leave was not added');
        setOpen(true);
      }
    } catch (err) {
        setToastMsg('Something went wrong, Leave was not added'+ err.message);
        setOpen(true);
    }
  };
  return (
    <Box>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography>
                    Fill to Apply a Leave
                </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 0 }}>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2}}>
                        <Grid item xs sx={{width: '100%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="category"
                                label="Leave Category"
                                id="category"
                                select
                                defaultValue="choose_one"
                                variant="filled"
                            >
                                {leaveCategories.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2}}>
                        <Grid item xs sx={{width: '50%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="start-date"
                                label="Start Date"
                                id="start-date"
                                variant='filled'
                                type='date'
                                InputProps={{
                                    startAdornment: <InputAdornment position="end"></InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item sx={{width: '50%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="end-date"
                                label="End Date"
                                id="end-date"
                                variant='filled'
                                type='date'
                                InputProps={{
                                    startAdornment: <InputAdornment position="end"></InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2}}>
                        <Grid item xs sx={{width: '100%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="reason"
                                label="Reason"
                                name="reason"
                                variant='filled'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2, backgroundColor:'primary.main', textTransform: 'none' }}
                    >
                        Submit
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
                            {toastMsg}
                        </Alert>
                    </Snackbar>
                </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
