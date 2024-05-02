import React from 'react'
import { Container, Grid, Paper, Toolbar, Box, Avatar, Typography } from '@mui/material'

export default function MyProfile() {
  return (
    <div>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{width: '150px', height: '150px'}} />
              <Typography></Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={8}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
