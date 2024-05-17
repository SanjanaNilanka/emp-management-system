import React from 'react'
import MyAttendanceQR from './MyAttendanceQR'
import { Grid, Toolbar, Container, Paper, Box,Typography } from '@mui/material'

export default function MarkAttendance() {
  return (
    <div>
      <Toolbar/>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
              <MyAttendanceQR/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
