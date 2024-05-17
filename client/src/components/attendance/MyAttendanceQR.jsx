import React, { useState } from 'react'
import QRCodeGenerator from './QRCodeGenerator'
import axios from 'axios';
import { Alert, Box, Button, Paper, Snackbar, TextField, Typography } from '@mui/material';

export default function MyAttendanceQR() {
  
  const [employeeID, setEmployeeID] = useState('');
  const userID = localStorage.getItem('userID');
  const [employee, setEmployee] = useState([]);
  const [toastMsg, setToastMsg] = React.useState('')

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

  const [allAttendances, setAllAttendances] = useState([])

  const getAllAttendance = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/attendance/get`);
      console.log(response.data)
      if (response.data.success) {
        setAllAttendances(response.data.attendences)
      }
    } catch (err) {
      
    }
  }

  
  
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
    generatePinCode();
    getAllAttendance();
  }, [])

  const generatePinCode = () => {
    const pin = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('attendencePinCode', pin);
  }
  

  const generatePin = localStorage.getItem('attendencePinCode');

  const [pin, setPin] = useState('');


  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  console.log(allAttendances)

  const isEmployeeMarkedAttendance = () => {
    const currentDate = getCurrentDate();
    const loggedEmployeeId = employee._id;
    return allAttendances.some(attendance => {
      const attendanceDate = attendance.dateTime.split("T")[0];
      return attendance.employee === loggedEmployeeId && attendanceDate === currentDate;
    });
  };

  const employeeMarkedAttendance = isEmployeeMarkedAttendance();
  console.log(employeeMarkedAttendance);

  const handleInput = (e) => {
    setPin(e.target.value) ;
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();

    if (pin === generatePin) {
      
      try {
        const response = await axios.post('http://localhost:8000/attendance/create', {
          employee: employee._id,
          empID: employee.empID
        });
        if (response.data.success) {
          setPin('');
          employeeMarkedAttendance = isEmployeeMarkedAttendance();
          setToastMsg('Your attendence has been marked for today');
          setOpen(true);
        }
      } catch (err) {
        console.log(err);
        setToastMsg(err.message);
        setOpen(true);
      }
    } else {
      setToastMsg('Please insert correct PIN code');
      setOpen(true);
    }


    
  }
  
  return (
    <div>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant='h4' sx={{ color: 'primary.main', fontWeight: 700, mb:3 }}>{employee.empID}</Typography>
        <QRCodeGenerator pin={generatePin} height={250}/>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          
          <Typography>{employee.fullName}</Typography>
          <Typography>{employee.email}</Typography>
          <Typography>{employee.department}</Typography>
          {/*generatePin*/}
        </Box>
      </Paper>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column',
          mt: 3
        }}
      >
        <Typography variant='h6'>Sacn QR and enter the PIN code to mark your atendence</Typography>
        {employeeMarkedAttendance ? 
          <Box>
            <Typography>You already marked your attendance for today</Typography>
          </Box>
        :
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3,
              
            }}
          >
            <TextField
              margin="normal"
              required
              id="pin"
              label="Pin Code"
              name="pin"
              variant='filled'
              onChange={handleInput}
            />
            <Button variant='contained' sx={{textTransform: 'none'}} onClick={handleSubmit}>Submit</Button>
          </Box>
        }
        
        
        
      </Paper>
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
    </div>
  )
}
