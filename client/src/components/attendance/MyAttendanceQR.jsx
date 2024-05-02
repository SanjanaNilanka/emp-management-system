import React, { useState } from 'react'
import QRCodeGenerator from './QRCodeGenerator'
import axios from 'axios';
import { Box, Paper, Typography } from '@mui/material';

export default function MyAttendanceQR() {
  
  const [employeeID, setEmployeeID] = useState('');
  const userID = localStorage.getItem('userID');
  const [employee, setEmployee] = useState([]);
  
  React.useEffect(() => {
    
    const getLooggedInUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/employee/get-by-user-id/${userID}`);
        console.log(response.data)
        if (response.data.success) {
          setEmployeeID(response.data.employee._id)
          setEmployee(response.data.employee)
        }
      } catch (err) {
        
      }
    };

    getLooggedInUser();
  }, [])
  
  return (
    <div>
      <Paper
        sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 240,
        }}
      >
            <QRCodeGenerator userID={userID} empID={employeeID} />
            <Box>
                <Typography sx={{color:'primary.light', fontSize:'20px', fontWeight:700}}>{employee.empID}</Typography>
                <Typography>{employee.fullName}</Typography>
                <Typography>{employee.email}</Typography>
                <Typography>{employee.department}</Typography>
            </Box>
      </Paper>
    </div>
  )
}
