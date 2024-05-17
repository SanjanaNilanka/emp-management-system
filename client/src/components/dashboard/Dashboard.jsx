import * as React from 'react';
import { styled, createTheme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainAdminListItems, mainEmployeeListItems, secondaryListItems } from './listItems';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom'
import DashboardHome from './DashboardHome';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SignIn from '../auth/SignIn';
import '@fontsource/inter';
import Dropdown from '../common/Dropdown';
import Error404 from '../error/Error404';
import DisplayEmployees from '../employees/DisplayEmployees';
import AddEmployee from '../employees/AddEmployee';
import { Alert, Snackbar } from '@mui/material';
import DisplayMyLeaves from '../leaves/DisplayMyLeaves';
import ApplyLeave from '../leaves/ApplyLeave';
import MarkAttendance from '../attendance/MarkAttendance';
import CheckLeaves from '../leaves/CheckLeaves';
import MyProfile from '../auth/MyProfile';
import NotificationDisplay from './Notification';
import EmployeeDetails from '../employees/EmployeeDetails';
import ChangePassword from '../auth/ChangePassword';
import EditEmployee from '../employees/EditEmployee';
import CheckAttendance from '../attendance/CheckAttendance';
import MyProfileEmployee from '../auth/MyProfileEmployee';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export default function Dashboard({ onThemeToggle }) {
  const theme = useTheme()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [toastMsg, setToastMsg] = React.useState('')

  const [isToastOpen, setIsToastOpen] = React.useState(false);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsToastOpen(false);
  };

  const handleToastOpen = (msg) => { 
    setToastMsg(msg);
    setIsToastOpen(true);
  }

  React.useEffect(() => { 
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const navigate = useNavigate()

  if (!isLoggedIn) { 
    navigate('/signin');
  }

  const [loggedInUser, setLoggedInUser] = React.useState({role: 'admin'});
  
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    const getUserData = {
      token: token,
    }
    const getLooggedInUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/auth/logged-user`, {
          headers: {
            Authorization: `${token}`
          }
        });
        console.log(response.data)
        if (response.data.success) {
          setLoggedInUser(response.data.user)
          localStorage.setItem('role', response.data.user.role)
          localStorage.setItem('userID', response.data.user._id)
        }
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/signin');
      }
    };

    /*axios.get(`http://localhost:8000/auth/logged-user`, {
      token: token 
    }).then((res) => {
      console.log(res.data)
      if(res.data.success){
        setLoggedInUser(res.data.user)
      }
    }).catch((err) => {
      setLoggedInUser({role: err.message})
    })*/

    getLooggedInUser();
  }, [])

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
      <Box sx={{ display: 'flex' }}>
        
          {window.location.pathname === '/signin' ?
              <div>
                  
              </div>
              :
              <Box sx={{ display: 'flex' }}>
                  <CssBaseline />
                  <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                        pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                        >
                        
                        </Typography>
                        <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                        >
                        {loggedInUser.role} Dashboard
                        </Typography>
                        {/*<Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                            }}
                        >
                            <img src='images/kdu-logo.png' width={80} />
                            <Typography sx={{fontSize:'16px'}}>Employee Management System</Typography>
                          </Typography>*/}
                        <IconButton
                            color='inherit'
                            onClick={onThemeToggle}
                            size="small"
                            aria-label="button to toggle theme"
                            sx={{ minWidth: '32px', height: '32px', p: '4px' }}
                        >
                            {theme.palette.mode === 'dark' ? (
                            <WbSunnyRoundedIcon fontSize="small" />
                            ) : (
                            <ModeNightRoundedIcon fontSize="small" />
                            )}
                        </IconButton>
                        <NotificationDisplay/>
                        
                        <Dropdown/>
                    </Toolbar>
                  </AppBar>
                  <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: [1],
                        }}
                    >
                      <img src='images/kdu-logo.png' width={80} />
                      <IconButton onClick={toggleDrawer}>
                        <ArrowBackIosNewIcon />
                      </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {loggedInUser.role === 'Admin'? mainAdminListItems: mainEmployeeListItems}
                        <Divider sx={{ my: 1 }} />
                        {loggedInUser.role === 'Admin'? secondaryListItems: <div></div>}
                        
                    </List>
                  </Drawer>
              </Box>
          }
        
        <Box
            component="main"
            sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            }}
        >
          <Routes>
            <Route path='/' element={<DashboardHome/>} />
            <Route path='/dashboard' element={<DashboardHome/>} />
            <Route path='/view-employees' element={<DisplayEmployees/>} />
            <Route path='/add-employee' element={<AddEmployee handleToastOpen={handleToastOpen}/>} />
            <Route path='/my-leaves' element={<DisplayMyLeaves/>} />
            <Route path='/apply-leave' element={<ApplyLeave/>} />
            <Route path='/employee-attendance' element={<MarkAttendance/>} />
            <Route path='/check-attendance' element={<CheckAttendance/>} />
            <Route path='/check-leaves' element={<CheckLeaves/>} />
            <Route path='/my-profile' element={<MyProfile/>} />
            <Route path='/my-profile-emp' element={<MyProfileEmployee/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/more-employee/:id' element={<EmployeeDetails/>} />
            <Route path='/change-password' element={<ChangePassword/>} />
            <Route path='/edit-employee/:id' element={<EditEmployee/>} />
            <Route path='*' element={<Error404/>} />
          </Routes> 
        </Box>
        <Snackbar
          open={isToastOpen}
          autoHideDuration={3000}
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