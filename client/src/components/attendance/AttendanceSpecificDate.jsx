import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography, TextField, styled, tableCellClasses } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.table,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AttendanceSpecificDate() {
  const [attendancesByDay, setAttendancesByDay] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/attendance/get');
        console.log(response.data)
        if (response.data.success) {
          const groupedAttendances = response.data.attendences.reduce((acc, attendance) => {
            const date = new Date(attendance.dateTime);
            const dateString = date.toISOString().split('T')[0]; // Extracting date part
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

  // Sort the dates in descending order
  const sortedDates = Object.keys(attendancesByDay).sort((a, b) => new Date(b) - new Date(a));

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredAttendances = selectedDate ? { [selectedDate]: attendancesByDay[selectedDate] || [] } : attendancesByDay;

  return (
    <Container>
      <Toolbar />
      <Box sx={{ py: 2 }}>
        <Paper sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
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
          />
        </Paper>
        
        {Object.keys(filteredAttendances).length > 0 ? (
          Object.keys(filteredAttendances).map((date) => (
            <Paper sx={{ p: 2, mb: 2 }} key={date}>
              <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'primary.main' }}>{date}</Typography>
              <Table sx={{ mt: 1 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ fontWeight: 700, fontSize: 16 }}>Employee ID</StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: 700, fontSize: 16 }}>Time</StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: 700, fontSize: 16, width: '260px' }} align='center'>Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAttendances[date].map((attendance, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{attendance.empID}</StyledTableCell>
                      <StyledTableCell>{attendance.time}</StyledTableCell>
                      <StyledTableCell align='center'>
                        <Button variant="contained" color="primary" size="small" sx={{ textTransform: 'none' }} href={`more-employee/${attendance.employee}`}>
                          See Employee Details
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          ))
        ) : (
          <Typography sx={{ mt: 2 }}>No attendances found for the selected date.</Typography>
        )}
      </Box>
    </Container>
  );
}
