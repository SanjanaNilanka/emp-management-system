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

export default function MyLeavesTable() {
  const [myLeaves, setMyLeaves] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isToast, setIsToast] = React.useState(false);
  const [isDeletePopup, setIsDeletePopup] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('')
  const [selectedLeave, setSelectedLeave] = React.useState('')

  const userID = localStorage.getItem('userID');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsToast(false);
  };
  
  const getLooggedInUser = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`http://localhost:8000/leave/get/my/${userID}`);
      console.log(response.data)
      if (response.data.success) {
        setMyLeaves(response.data.leaves)
        setIsLoading(false)
      }
    } catch (err) {
      
    }
  };
  React.useEffect(() => {
    

    getLooggedInUser();
  }, [])

  const deleteEmployee = async () => {
    const response = await axios.delete(`http://localhost:8000/leave/delete/${selectedLeave}`);
    if (response.data.success) {
      setIsDeletePopup(false);
      getLooggedInUser();
    }
  }

  const handleDeletePopup = () => {
    setIsDeletePopup(!isDeletePopup)
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
          My Leaves
          <Button href='/apply-leave' sx={{textTransform:'none'}} variant='contained'><PersonAddAlt1Icon/>&nbsp;&nbsp;&nbsp;Apply Leave</Button>
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
                <StyledTableCell>{row.category}</StyledTableCell>
                <StyledTableCell>{row.startDate}</StyledTableCell>
                <StyledTableCell>{row.endDate}</StyledTableCell>
                <StyledTableCell>{row.reason}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup>
                    {row.status === 'Approved' &&
                      <Button variant='outlined' disabled sx={{ textTransform: 'none' }} color='error' onClick={() => { setSelectedLeave(row._id); handleDeletePopup(); }}>Approved</Button>
                    }
                    {row.status === 'Rejected' &&
                      <Button variant='contained' sx={{ textTransform: 'none' }} color='success' href='/apply-leave'>Apply Again</Button>
                    }
                    {row.status === 'Pending' &&
                      <Button variant='contained' sx={{ textTransform: 'none' }} color='error' onClick={() => { setSelectedLeave(row._id); handleDeletePopup(); }}>Cancel</Button>
                    }
                    
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      }
      <Snackbar
          open={isDeletePopup}
          onClose={handleDeletePopup}
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
            <Typography variant='h6'>Do You Want to Delete this Employee?</Typography>
            <Grid>
              <Button onClick={deleteEmployee}>Yes</Button>
              <Button color='error' onClick={handleDeletePopup}>No</Button>
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
