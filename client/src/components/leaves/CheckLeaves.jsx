import React from 'react'
import { Container, Grid, Paper, Toolbar, Box } from '@mui/material'
import AllLeavesTable from './AllLeavesTable'

export default function CheckLeaves() {
  return (
    <div>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <AllLeavesTable />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
