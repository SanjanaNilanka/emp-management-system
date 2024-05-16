import * as React from 'react';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../dashboard/Title';
import { Alert, Box, Button, ButtonGroup, Card, CircularProgress, Grid, Skeleton, Snackbar, Stack, Typography } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import axios from 'axios';


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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AllLeavesTable() {
  const [myLeaves, setMyLeaves] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isToast, setIsToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('')
  const [employees, setEmployees] = React.useState([])

  const userID = localStorage.getItem('userID');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsToast(false);
  };
  
  const fetchLeaves = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:8000/leave/get`);
        console.log(response.data)
        if (response.data.success) {
          setMyLeaves(response.data.leaves)
          setIsLoading(false)
        }
      } catch (err) {
        
      }
  };

  React.useEffect(() => {
    

    fetchLeaves();
    
    const fetchEmployees = async () => {
        try {
        const response = await axios.get(`http://localhost:8000/employee/get`);
        if (response.data.success) {
            setEmployees(response.data.employees);
        }
        } catch (error) {
            console.error('Error fetching employee ID:', error);
        
        }
    };
    
    fetchEmployees();
      
  }, [])
  
  const getEmpIDByEmployeeID = (employeeID) => {
    const employee = employees.find(emp => emp._id === employeeID);
    
    return employee ? employee.empID : null;
  };
  
  const [isApprovePopupOpen, setApprovePopupOpen] = React.useState(false);
  const [isRejectPopupOpen, setRejectPopupOpen] = React.useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = React.useState(null);

  const handleApproveClick = (leaveId) => {
    setSelectedLeaveId(leaveId);
    setApprovePopupOpen(true);
  };
  
  const handleRejectClick = (leaveId) => {
    setSelectedLeaveId(leaveId);
    setRejectPopupOpen(true);
  };

  const handleApprove = () => {
    approveLeave()
    console.log('Approve leave with ID:', selectedLeaveId);
    setApprovePopupOpen(false);
  };

  const handleReject = () => {
    rejectLeave();
    console.log('Reject leave with ID:', selectedLeaveId);
    setApprovePopupOpen(false);
  };

  const approveLeave = async() => {
    try {
        const response = await axios.put(`http://localhost:8000/leave/update-status/${selectedLeaveId}`, { status: 'Approved' });
        if (response.data.success) {
            setIsToast(true);
            setToastMsg('Leave is approved with ID:', selectedLeaveId);
            fetchLeaves();
        }
    } catch (error) {
        console.error('Error fetching employee ID:', error);
        setIsToast(true);
        setToastMsg('Unkown error occured', error);
    }
  }
  
  const rejectLeave = async() => {
    try {
        const response = await axios.put(`http://localhost:8000/leave/update-status/${selectedLeaveId}`, { status: 'Rejected' });
        if (response.data.success) {
            setIsToast(true);
            setToastMsg('Leave is rejected with ID:', selectedLeaveId);
            fetchLeaves();
        }
        } catch (error) {
            console.error('Error fetching employee ID:', error);
            setIsToast(true);
            setToastMsg('Unkown error occured', error);
        }
  }

  return (
    <Box>
      <Title>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-between',
          }}
        >
          All Leaves
        </Box>
      </Title>
      {isLoading ?
        <Box sx={{ display: 'flex', mt: 2, height: 200, alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress/>
        </Box>
        :
        <Table size="small" sx={{mt: 2}}>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{fontWeight: 700}}>#</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}}>Employee</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}}>Category</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}}>From</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}}>To</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}}>Reason</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}}>Status</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}} align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myLeaves.map((row, index) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>{index+1}</StyledTableCell>
                <StyledTableCell>{getEmpIDByEmployeeID(row.employee)? `${getEmpIDByEmployeeID(row.employee)}`:`Employee was deleted`}</StyledTableCell>
                <StyledTableCell>{row.category}</StyledTableCell>
                <StyledTableCell>{row.startDate}</StyledTableCell>
                <StyledTableCell>{row.endDate}</StyledTableCell>
                <StyledTableCell>{row.reason}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.status === 'Pending'? 
                    <ButtonGroup>
                        <Button variant='contained' sx={{ textTransform: 'none' }} color='success'  onClick={() => handleApproveClick(row._id)}>Approve</Button>
                        <Button variant='contained' sx={{ textTransform: 'none' }} color='error'  onClick={() => handleRejectClick(row._id)}>Reject</Button>
                    </ButtonGroup>
                  :<div>
                    {row.status === 'Rejected'?
                      <ButtonGroup>
                        <Button variant='contained' sx={{ textTransform: 'none' }} color='success'  onClick={() => handleApproveClick(row._id)}>Approve</Button>
                      </ButtonGroup>
                    :
                      <ButtonGroup>
                        <Button variant='outlined' disabled sx={{ textTransform: 'none' }} color='success' >Already Approved</Button>
                      </ButtonGroup>
                    }
                    </div>
                  }
                  
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      }
      
      <Snackbar
          open={isApprovePopupOpen}
          onClose={() => {setApprovePopupOpen(false)}}
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
          }}
      >
        <Card
          sx={{
            backgroundColor: 'background.popup',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            borderRadius: 4,
          }}
        >
            <Typography variant='h6'>Do you want to approve this leave?</Typography>
            <Grid>
              <Button onClick={handleApprove}>Yes</Button>
              <Button color='error' onClick={() => {setApprovePopupOpen(false)}}>No</Button>
            </Grid>
        </Card>
      </Snackbar>
      <Snackbar
          open={isRejectPopupOpen}
          onClose={() => {setRejectPopupOpen(false)}}
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
          }}
      >
        <Card
          sx={{
            backgroundColor: 'background.popup',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            borderRadius: 4,
          }}
        >
            <Typography variant='h6'>Do you want to reject this leave?</Typography>
            <Grid>
              <Button onClick={handleReject}>Yes</Button>
              <Button color='error' onClick={() => {setRejectPopupOpen(false)}}>No</Button>
            </Grid>
        </Card>
      </Snackbar>
      <Snackbar
          open={isToast}
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
    </Box>
  );
}
