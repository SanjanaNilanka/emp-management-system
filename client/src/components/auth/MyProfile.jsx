import { Avatar, Chip, Container, Toolbar } from '@mui/material';
import axios from 'axios';
import React from 'react'

import { useParams } from 'react-router-dom';
import { Alert, Box, Button, ButtonGroup, Card, CircularProgress, Grid, InputBase, Skeleton, Snackbar, Stack, Typography } from '@mui/material';



export default function MyProfile() {
  const { id } = useParams();
  const [employee, setEmployee] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [toastMsg, setToastMsg] = React.useState('')

  const getEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/admin/get-by-user/${localStorage.getItem('userID')}`)
      try {
        setIsLoading(true)
        console.log(localStorage.getItem('userID'))
        console.log(response.data.admin._id)
        const admin = await axios.get(`http://localhost:8000/admin/get/${response.data.admin._id}`);
        console.log(response.data)
        if (admin.data.success) {
          setEmployee(admin.data.admin)
          setIsLoading(false)
        }
      } catch (err) {
        
      }
    } catch (error) {
      
    }
    
  };

  React.useEffect(() => {
    

    getEmployee();
  }, [])
  return (
    <div>
      <Toolbar/>
      {isLoading ?
        <Box
          sx={{
            display: 'flex',
            mt: 2,
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress/>
        </Box>
        :
        <Container sx={{py:4}}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 8, mb: 3 }}>
              <Typography variant='h4'>{employee.fullName} | {employee.empID}</Typography>
              <Box>
                <ButtonGroup>
                  <Button variant='contained' color='warning'>Edit</Button>
                  <Button variant='contained' color='error'>Delete</Button>
                </ButtonGroup>
              </Box>
            </Box>
            
            <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 8}}>
              <Avatar variant='square' sx={{ width: "30%", height: 'auto' }} />
              <Box
                sx={{width: "35%"}}
              >
                <Typography variant='h6' sx={{fontStyle: 'oblique',mb: 1.5}}>Personal Details</Typography>
                <Box>
                  <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', gap: 1}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Full Name" />
                      <Typography variant='body1'>{employee.fullName}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="NIC" />
                      <Typography variant='body1'>{employee.nic}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Address" />
                      <Typography variant='body1'>{employee.address}</Typography>
                    </Box>
                    
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="DOB" />
                      <Typography variant='body1'>{employee.dob?.substring(0, 10)}</Typography>
                    </Box>
                    
                  </Box>
                  
                </Box>
              </Box>
              <Box
                sx={{width: "35%"}}
              >
                <Typography variant='h6' sx={{fontStyle: 'oblique',mb: 1.5}}>Contact Details</Typography>
                <Box>
                  <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', gap: 1}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Email" />
                      <Typography variant='body1'>{employee.personalEmail}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Phone" />
                      <Typography variant='body1'>{employee.phone}</Typography>
                    </Box>
                    <Typography variant='h6' sx={{fontStyle: 'oblique',mb: 1}}>Official Details</Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Department" />
                      <Typography variant='body1'>IT Department</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Position" />
                      <Typography variant='body1'>System Admin</Typography>
                    </Box>
                    
                  </Box>
                  
                </Box>
              </Box>
            </Box>
            
          </Card>
          
        </Container>
      }
    </div>
  )
}
