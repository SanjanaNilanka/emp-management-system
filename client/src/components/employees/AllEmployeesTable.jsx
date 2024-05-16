import * as React from 'react';
import Link from '@mui/material/Link';
import { alpha, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../dashboard/Title';
import { Alert, Box, Button, ButtonGroup, Card, CircularProgress, Grid, InputBase, Skeleton, Snackbar, Stack, Typography } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



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

export default function AllEmployeesTable() {
  const [employees, setEmployees] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isToast, setIsToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState('')
  const [searchInput, setSearchInput] = React.useState('')

  const handleSearchInput = (searchInput) => {
    /*if (searchInput == '') {
      getEmployees()
    }*/
    setSearchInput(searchInput)
    //setEmployees(filteredEmployees)
  }

  
  
  const filteredEmployees = employees.filter(employee =>
    employee.email.toLowerCase().includes(searchInput.toLowerCase()) // Filter by email
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsToast(false);
  };

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
  
  const employeesToRender = searchInput ? filteredEmployees : employees;

  const [selectedEmpId, setSelectedEmpId] = React.useState(null);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);

  const handleDeleteClick = (empId) => {
    setSelectedEmpId(empId);
    setDeletePopupOpen(true);
  };

  const handleDelete = () => {
    deleteEmployee()
    console.log('Delete employee with ID:', selectedEmpId);
    setDeletePopupOpen(false);
  };

  const deleteEmployee = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/employee/delete/${selectedEmpId}`);
      if (response.data.success) {
        setIsToast(true);
        setToastMsg('Employee is deleted with ID:', selectedEmpId);
        getEmployees();
      }
    }catch (error) {
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
          All Employees
          <Box sx={{display: 'flex', gap: 3}}>
            <Search sx={{color:'text.primary', backgroundColor: 'background.search'}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e)=>{handleSearchInput(e.target.value)}}
              />
            </Search>
            <Button href='/add-employee' sx={{textTransform:'none'}} variant='contained'><PersonAddAlt1Icon/>&nbsp;&nbsp;&nbsp;Add Employee</Button>
          </Box>
          
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
              <StyledTableCell sx={{fontWeight: 700}}>ID</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}}>Name</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}}>NIC</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}}>Email</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}}>Phone</StyledTableCell>
              <StyledTableCell sx={{fontWeight: 700}} align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeesToRender.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>{row.empID}</StyledTableCell>
                <StyledTableCell>{row.fullName}</StyledTableCell>
                <StyledTableCell>{row.nic}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.phone}</StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup>
                    <Button variant='contained' sx={{ textTransform: 'none' }} href={`/more-employee/${row._id}`}>More</Button>
                    <Button variant='contained' sx={{ textTransform: 'none' }} color='warning' href={`/edit-employee/${row._id}`}>Edit</Button>
                    <Button variant='contained' sx={{ textTransform: 'none' }} color='error'  onClick={()=>handleDeleteClick(row._id)}>Delete</Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      }
      <Snackbar
          open={isDeletePopupOpen}
          onClose={()=>{setDeletePopupOpen(false)}}
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
            <Button onClick={handleDelete}>Yes</Button>
            <Button color='error' onClick={()=>{setDeletePopupOpen(false)}}>No</Button>
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
