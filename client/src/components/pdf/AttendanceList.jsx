import React, { useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas'
import { Box, Button, Typography, Modal, IconButton, Paper, TextField, Snackbar, Alert, filledInputClasses } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from 'axios';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

export default function AttendanceList() {
  const [employees, setEmployees] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = React.useState(true);
  
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
  }, [])
    
  const generatePDF = () => {
    const purchasesTable = document.getElementById('attendance-table')
    const {height, width} = purchasesTable.getBoundingClientRect()
    
    const pdf = new jsPDF()

    const columns = [
      { header: '#', dataKey: 'index', width: 10 },
      { header: 'ID', dataKey: 'empID', width: 30 },
      { header: 'Name', dataKey: 'fullName', width: 40 },
      { header: 'NIC', dataKey: 'nic', width: 30 },
      { header: 'Email', dataKey: 'email', width: 50 },
      { header: 'Phone', dataKey: 'phone', width: 35 },
    ];

    /*const columns = [];
    for (let i = 0; i < 7; i++) {
        columns.push({ header: `Column ${i + 1}`, dataKey: `col${i}` });
    }*/

    

    //const scaleFactor = pdf.internal.pageSize.width / width
    pdf.autoTable({
      html: '#attendance-table',
      startY: 42,
      theme: 'grid',
      margin: { top: 20, bottom: 20,  },
      tableWidth: 182 ,
      columnStyles: {
          0: { fontStyle: 'bold' },
      },
      //scaleFactor: scaleFactor,
      columns,
        
    })
    pdf.setFontSize("28")
    pdf.setTextColor("#010075")
    pdf.text("KDU Employee Management System",22,25)
    pdf.setFontSize("16")
    pdf.setTextColor("Black")
    pdf.text(`Attendance of Employees on ${selectedDate}`, 55, 36)
    if (attendanceCount > 0) {
      pdf.save("KDU - All Employees.pdf")
    } else {
      setIsToastOpen(true)
    }
    
  }

  const [attendancesByDay, setAttendancesByDay] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/attendance/get');
        console.log(response.data)
        if (response.data.success) {
          const groupedAttendances = response.data.attendences.reduce((acc, attendance) => {
            const date = new Date(attendance.dateTime);
            const dateString = date.toISOString().split('T')[0];
            if (!acc[dateString]) {
              acc[dateString] = [];
            }
            const time = new Date(date.getTime() - (5.5 * 60 * 60 * 1000)).toLocaleTimeString();
            acc[dateString].push({ empID: attendance.empID, time, employee: attendance.employee });
            return acc;
          }, {});
          setAttendancesByDay(groupedAttendances);
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchData();
  }, []);

  const sortedDates = Object.keys(attendancesByDay).sort((a, b) => new Date(b) - new Date(a));

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredAttendances = selectedDate ? { [selectedDate]: attendancesByDay[selectedDate] || [] } : attendancesByDay;

   const attendanceCount = selectedDate ? (attendancesByDay[selectedDate] ? attendancesByDay[selectedDate].length : 0) : 0;

  const [toastMsg, setToastMsg] = React.useState('No attendances for selected date')

  const [isToastOpen, setIsToastOpen] = React.useState(false);

  const handleToastClick = () => {
    setOpen(true);
    
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsToastOpen(false);
  };

  return (
    <div>
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
            <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Attendance List" />
      </ListItemButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{border: '0px solid'}}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "80%",
            height: "90%",
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
            border: 'none',
            position:'relative'
          }}
        >
          <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Attendances of Employees
            </Typography>
            <TextField
              label="Select Date"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              size='small'
            />
            
          </Paper>
          
          {Object.keys(filteredAttendances).length > 0 ? (
            Object.keys(filteredAttendances).map((date) => (
              <div
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  padding: 20,
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  minHeight:'88%'
                }}
                key={date}
              >
                <h1 style={{ color: '#010075', marginBottom: '-10px' }}>KDU Employee Management System</h1>
                <h2 style={{fontWeight: 500}}>Attendance of Employees on {date}</h2>
                <table id='attendance-table' style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: '1px solid #19bc9b',
                          padding: '8px',
                          fontWeight: 'bold',
                          backgroundColor: '#19bc9b',
                          width: 300
                        }}
                      >
                        Employee ID
                      </th>
                      <th
                        style={{
                          border: '1px solid #19bc9b',
                          padding: '8px',
                          fontWeight: 'bold',
                          backgroundColor: '#19bc9b',
                          width: 300
                        }}
                      >
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttendances[date].map((attendance, index) => (
                      <tr key={index}>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{attendance.empID}</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>{attendance.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <Typography sx={{ mt: 2 }}>No attendances found for the selected date.</Typography>
          )}
          <IconButton sx={{ position: 'absolute', color: 'text.primary', top: 0, right: 0, display:'none' }}><CloseIcon /></IconButton>
          <Box sx={{display: 'flex', gap: 2,}}>
            <Button variant="contained" sx={{ textTransform: 'none', mt: 2, width: '50%' }} onClick={handleClose}><CloseIcon/>&nbsp;Close</Button>
            <Button variant="contained" color='success' sx={{ textTransform: 'none', mt: 2, width: '50%' }} onClick={generatePDF}><FileDownloadIcon/>&nbsp;Download</Button>
          </Box>
          <Snackbar
            open={isToastOpen}
            autoHideDuration={3000} // Automatically close after 30000ms (30 seconds)
            onClose={handleToastClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: '',
            }}
            sx={{mx: 4}}
          >
            <Alert onClose={handleToastClose} severity="info" sx={{ width: '100%' }}>
              {toastMsg}
            </Alert>
          </Snackbar>
        </Box>
      </Modal>
      
    </div>
  )
}
