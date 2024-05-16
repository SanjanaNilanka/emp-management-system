import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Badge, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios';
import Notifications from '@mui/icons-material/Notifications';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

export default function NotificationDisplay() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    getNotifications();
  };
  const handleClose = () => {
    setAnchorEl(null);
    markAsSeenNotifications();
  };

  const[notifications, setNotifications] = React.useState([]);
  const[seenNotifications, setSeenNotifications] = React.useState([]);
  const token = localStorage.getItem('token');

  const markAsSeenNotifications = async() => {
    try {
      if (localStorage.getItem('role') === 'Admin') {
        const response = await axios.get(`http://localhost:8000/admin/get-by-user/${localStorage.getItem('userID')}`)
        try {
          const adminNotify = await axios.get(`http://localhost:8000/admin/get-notify/${response.data.admin._id}`) 
          setNotifications(adminNotify.data.admin.notification);
          setSeenNotifications(adminNotify.data.admin.seenNotification);
          
        } catch (err) {

        }
      }
      
    } catch (err) { }
  }
  
  const getNotifications = async () => {
    try {
      if (localStorage.getItem('role') === 'Admin') {
        const response = await axios.get(`http://localhost:8000/admin/get-by-user/${localStorage.getItem('userID')}`)
        /*try {
          const adminNotify = await axios.get(`http://localhost:8000/admin/get-notify/${response.data.admin._id}`) 
          setNotifications(adminNotify.data.admin.notification);
          setSeenNotifications(adminNotify.data.admin.seenNotification);
          
        } catch (err) {

        }*/
        setNotifications(response.data.admin.notification);
        setSeenNotifications(response.data.admin.seenNotification);
        setNotifyCount(0)
      }
      
    } catch (err) { }
  }

  const [notifyCount, setNotifyCount] = React.useState(null)
  const getNotifyCount = async () => {
    try {
      
        if (localStorage.getItem('role') == 'Admin') {
          try {
            const admin = await axios.get(`http://localhost:8000/admin/get-by-user/${localStorage.getItem('userID')}`)
            setNotifyCount(admin.data.admin.notification.length)
            
          } catch (err) { 
            console.log('error', err.message);
          }
        }
      
    } catch (err) {
      
    }
  };

  React.useEffect(() => {
    
    
    getNotifyCount();
  }, [])

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={notifyCount} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 8.5,
            width: '30ch',
          },
        }}
      >
        {notifications.length != 0 &&
          <Typography sx={{ fontSize: 12, ml: 2, mb:-1, color:'text.secondary' }}>NEW</Typography>
        }
        
        {notifications.map((notify) => (
          <MenuItem key={notify}  onClick={handleClose} sx={{display:'flex', flexDirection:'column', alignItems:'start'}}>
            <Typography variant='h6' sx={{color:'primary.main'}}>{notify.title}</Typography>
            <Typography sx={{fontSize: 14,textOverflow: 'ellipsis',whiteSpace: 'nowrap',overflow: 'hidden',}}>{notify.description}</Typography>
          </MenuItem>
        ))}
        <Typography sx={{fontSize:12, ml:2, mt:2, mb:-1, color:'text.secondary'}}>RECENT</Typography>
        {seenNotifications.map((notify) => (
          <MenuItem key={notify}  onClick={handleClose} sx={{display:'flex', flexDirection:'column', alignItems:'start'}}>
            <Typography variant='h6' sx={{color:'primary.main'}}>{notify.title}</Typography>
            <Typography sx={{fontSize: 14, whiteSpace: 'pre-line' }}>{notify.description}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}