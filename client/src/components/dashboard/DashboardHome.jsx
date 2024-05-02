import { Container, Grid, Paper, Toolbar, Box, Typography, Button } from '@mui/material'
import React from 'react'
import Chart from './Chart';
import Deposits from './Deposits';
import AllEmployeesTable from '../employees/AllEmployeesTable';
import { Link } from 'react-router-dom';

export default function DashboardHome() {
  const currRole = localStorage.getItem('role')
  return (
    <div>
      
      <Toolbar />
      {currRole === 'Admin' ?
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                {/*<Chart />*/}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                {/*<Deposits />*/}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <AllEmployeesTable />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        :
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={6}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 240,
                }}
              >
                <img src='images/attendace.png' width={200} />
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'justify',
                  gap: 1
                }}>
                  <Typography variant='h6'>
                    Mark Attendance
                  </Typography>
                  <Typography variant='body1'>
                    QR attendance marking is a method used to track attendance by scanning QR codes. In this system, each attendee is provided with a unique QR code representing their identity
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
              <Paper
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 240,
                }}
              >
                <Button sx={{textTransform:'none', color: 'text.primary', p: 2}} href='/apply-leave'>
                  <img src='images/leaves.png' width={200} />
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'justify',
                    gap: 1
                  }}>
                    <Typography variant='h6'>
                      Apply Leave
                    </Typography>
                    <Typography variant='body1'>
                      that allows employees to conveniently request time off from work. With just a few clicks, you can submit your leave requests, pecify the dates, provide a reason, and track the status of their application
                    </Typography>
                  </Box>
                </Button>
                
              </Paper>
            </Grid>
          </Grid>
        </Container>
      }
      
    </div>
  )
}
