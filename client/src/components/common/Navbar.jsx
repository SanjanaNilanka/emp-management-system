import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainAdminListItems, mainEmployeeListItems, secondaryListItems } from './listItems';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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

export default function Navbar({ onThemeToggle }) {
  const theme = useTheme()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => { 
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  /*const navigate = useNavigate()

  if (!isLoggedIn) { 
    navigate('/signin');
  }*/

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
        }
      } catch (err) {
        localStorage.removeItem('token');
        //navigate('/signin');
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

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <div>
      <CssBaseline />
      <AppBar position="absolute" open={open} >
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
            {loggedInUser.role} Dashboard 
          </Typography>
          <Typography
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
            <Typography sx={{fontSize:'16px'}}>Employee Management</Typography>
          </Typography>
          
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
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
          
          
          <IconButton onClick={toggleDrawer}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <img src='images/kdu-logo.png' width={60} />
        </Toolbar>
        <Divider />
        <List component="nav">
          {loggedInUser.role === 'Admin'? mainAdminListItems: mainEmployeeListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
    </div>
  )
}
