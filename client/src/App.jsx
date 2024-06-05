import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Button, CssBaseline, selectClasses } from '@mui/material';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import { light } from '@mui/material/styles/createPalette';
import "./App.css"

export const primary = {
  50: '#F0F7FF',
  100: '#CEE5FD',
  200: '#9CCCFC',
  300: '#55A6F6',
  400: '#0A66C2',
  500: '#0959AA',
  600: '#064079',
  700: '#033363',
  800: '#02294F',
  900: '#021F3B',
};

export const secondary = {
  50: '#ff6920',
  100: '#ff6920',
  200: '#ff6920',
  300: '#ff5b21',
  400: '#ff4c21',
  500: '#fc3d21',
  600: '#c9301a',
  700: '#af2a16',
  800: '#7c1d0f',
  900: '#7c1d0f',
};

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      light: primary[200],
      main: primary[500],
      dark: primary[800],
      contrastText: primary[50],
      ...(mode === 'dark' && {
        contrastText: primary[100],
        light: primary[300],
        main: primary[500],
        dark: primary[800],
      }),
    },
    secondary: {
      light: secondary[300],
      main: secondary[500],
      dark: secondary[800],
      ...(mode === 'dark' && {
        light: secondary[400],
        main: secondary[500],
        dark: secondary[900],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: '#1f1f1f',
        paper: '#1f1f1f',
        table: '#1f1f1f',
        popup: '#1f1f1f',
        select: '#3d3d3d',
        selectFocused: '#464646',
        selectDisabled: '#444444'
      },
    }),
    ...(mode === 'light' && {
      background: {
        default: '#fff',
        table: '#f8f8f8',
        popup: '#f8f8f8',
        select: '#f0f0f0',
        selectFocused: '#e9e9e9',
        selectDisabled: '#e0e0e0'
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
});

const App = () => {
  const [themeMode, setThemeMode] = React.useState('light')
  const currentTheme = createTheme(getDesignTokens(themeMode),);

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('theme');
    if (themeFromLocalStorage) {
      setThemeMode(themeFromLocalStorage);
    } else {
      setThemeMode('light');
    }
  }, []);
  
  const theme = useTheme();
  const toogleTheme = () => {
    if (themeMode === 'light') {
      setThemeMode('dark')
      localStorage.setItem('theme', 'dark');
    } else {
      setThemeMode('light')
      localStorage.setItem('theme', 'light');
    }
    
  }
  
  const [is404, setIs404] = React.useState(false);
  const currentLocation = window.location.pathname;
  useEffect(() => {
    const currentLocation = window.location.pathname;
    if (currentLocation === '/') {
      setIs404(false)
    } else if (currentLocation === '/mrp-home') {
      setIs404(false)
    } else if (currentLocation === '/mrp') {
      setIs404(false)
    } else {
      setIs404(true)
    }

  }, []);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => { 
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  /*if (window.location.pathname === '/signin') {
    return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Router>
          <SignIn />
        </Router>
        
      </ThemeProvider>
    )
  }

  if (window.location.pathname === '/') { 
    return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Router>
          <Dashboard onThemeToggle={toogleTheme}/>
        </Router>
        
      </ThemeProvider>
    );
  }

  if (window.location.pathname.startsWith('/dashboard')) { 
    return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Router>
          <Dashboard onThemeToggle={toogleTheme}/>
        </Router>
        
      </ThemeProvider>
    );
  }*/
  return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Router>
          <Dashboard onThemeToggle={toogleTheme}/>
        </Router>
        
      </ThemeProvider>
    );
}

export default App;