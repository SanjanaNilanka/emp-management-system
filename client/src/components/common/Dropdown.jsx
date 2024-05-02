import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Card, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from 'react-router-dom';

const Popup = styled(Popper)({
  zIndex: 1000,
});

export default function Dropdown() {
  const buttonRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => { 
    handleClose();
    localStorage.removeItem('token');
    navigate('/signin');
  }
  
  const handleNavigateMyProfile = () => { 
    handleClose();
    navigate('/my-profile');
  }

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      setOpen(false);
    } else if (event.key === 'Escape') {
      buttonRef.current.focus();
      setOpen(false);
    }
  };

  return (
    <div>
      <IconButton
        ref={buttonRef}
        id="composition-button"
        aria-controls={'composition-menu'}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        color="primary"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Avatar />
      </IconButton>
      <Popup
        role={undefined}
        id="composition-menu"
        open={open}
        anchorEl={buttonRef.current}
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        <ClickAwayListener
          onClickAway={(event) => {
            if (event.target !== buttonRef.current) {
              handleClose();
            }
          }}
        >
          <Card
            sx={{
              backgroundColor: 'background.popup',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3,
              borderRadius: 4,
            }}
          >
            <MenuList
              variant="outlined"
              onKeyDown={handleListKeyDown}
              sx={{ boxShadow: 'md', backgroundColor: 'background.default', color: 'text.primary',  width: '200px' }}
            >
              <MenuItem onClick={handleNavigateMyProfile}><PersonIcon/>&nbsp;&nbsp;&nbsp;My Profile</MenuItem>
              <MenuItem onClick={handleClose}><SettingsIcon/>&nbsp;&nbsp;&nbsp;Setting</MenuItem>
              <MenuItem onClick={handleClose}><LockResetIcon/>&nbsp;&nbsp;&nbsp;Change Password</MenuItem>
              <MenuItem onClick={handleLogout}><LogoutIcon/>&nbsp;&nbsp;&nbsp;Logout</MenuItem>
            </MenuList>
          </Card>
          
        </ClickAwayListener>
      </Popup>
    </div>
  );
}
