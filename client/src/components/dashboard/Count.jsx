import { Box, Card, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'

export default function Count() {
  const [employees, setEmployees] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isToast, setIsToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('')
  const [myLeaves, setMyLeaves] = React.useState([]);
  const getEmployees = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`http://localhost:8000/employee/get`);
      console.log(response.data)
      if (response.data.success) {
        setEmployees(response.data.employees)
        setIsLoading(false)
      }
    } catch (err) {
      
    }
  };

  React.useEffect(() => {
    

    getEmployees();
    fetchLeaves();
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsToast(false);
  };
  
  const fetchLeaves = async () => {
    try {
      setIsLoading(true)
      const leaves = await axios.get(`http://localhost:8000/leave/get`);
      console.log(leaves.data)
      if (leaves.data.success) {
        const pendingLeaves = leaves.data.leaves.filter(leave => leave.status === 'Pending');
        setMyLeaves(pendingLeaves);
        setIsLoading(false)
      }
    } catch (err) {
      
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3
      }}
    >
      <Card sx={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center', p: 1.5}}>
        <Typography variant='h5'>Total Employee</Typography>
        <Typography variant='h3' sx={{fontWeight:'700'}}>{employees.length}</Typography>
      </Card>
      <Card sx={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center', p: 1.5}}>
        <Typography variant='h5'>Pending Leaves</Typography>
        <Typography variant='h3' sx={{fontWeight:'700'}}>{myLeaves.length}</Typography>
      </Card>
      
    </Box>
  )
}
