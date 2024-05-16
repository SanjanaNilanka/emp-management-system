import { Avatar, Chip, Container, Toolbar } from '@mui/material';
import axios from 'axios';
import React from 'react'

import { useParams } from 'react-router-dom';
import { Alert, Box, Button, ButtonGroup, Card, CircularProgress, Grid, InputBase, Skeleton, Snackbar, Stack, Typography } from '@mui/material';



export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [toastMsg, setToastMsg] = React.useState('')

  const getEmployee = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`http://localhost:8000/employee/get/${id}`);
      console.log(response.data)
      if (response.data.success) {
        setEmployee(response.data.employee)
        setIsLoading(false)
      }
    } catch (err) {
      
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
                      <Chip label="Marriage States" />
                      <Typography variant='body1'>{employee.marriageStates}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Gender" />
                      <Typography variant='body1'>{employee.gender}</Typography>
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
                      <Typography variant='body1'>{employee.email}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Phone" />
                      <Typography variant='body1'>{employee.phone}</Typography>
                    </Box>
                    <Typography variant='h6' sx={{fontStyle: 'oblique',mb: 1}}>Official Details</Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Department" />
                      <Typography variant='body1'>{employee.department}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Joined Date" />
                      <Typography variant='body1'>{employee.startDate?.substring(0, 10)}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Position" />
                      <Typography variant='body1'>{employee.position}</Typography>
                    </Box>
                    
                  </Box>
                  
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <Box
                sx={{width: "30%"}}
              >
                <Typography variant='h6' sx={{ fontStyle: 'oblique', mb: 1.5, mt:3 }}>Other Details</Typography>
                <Box>
                  <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', gap: 1}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                      <Chip label="Work Experience" />
                      <Typography variant='body1'>{employee.workExperience} Years</Typography>
                    </Box>
                  </Box>
                  
                </Box>
              </Box>
              <Box
                sx={{width: "65%"}}
              >
                <Typography variant='h6' sx={{ fontStyle: 'oblique', mb: 1.5, mt:3 }}>Qualifications</Typography>
                <Box>
                  <table>
                    <tr>
                      <td style={{paddingRight: 10}}><Chip label="Qualifications" /></td>
                      <td style={{paddingRight: 10}}><Chip label="Description" /></td>
                      <td style={{paddingRight: 10}}><Chip label="Achived Date" /></td>
                    </tr>
                    {employee.qualifications.map((row) => (
                      <tr>
                        <td style={{paddingRight: 10, textAlign: 'center'}}>{row.qualification}</td>
                        <td style={{paddingRight: 10, textAlign: 'center'}}>{row.description}</td>
                        <td style={{paddingRight: 10, textAlign: 'center'}}>{row.achivedIn?.substring(0, 10)}</td>
                      </tr>
                    ))}
                  </table>
                  <Box sx={{display: 'flex',  justifyContent: 'start', alignItems: 'start', gap: 1}}>
                    
                    
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
