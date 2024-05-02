import { Box, Button, Typography, alpha, useTheme, Link } from '@mui/material'
import React from 'react'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function Error404() {
    const theme = useTheme();
  return (
    <Box>
      <Box
        id="image"
        sx={(theme) => ({
        alignSelf: 'center',
        height: '100vh',
        backgroundImage:
            theme.palette.mode === 'light'
            ? 'url("/images/astronaut.jpg")'
            : 'url("/images/astronaut.jpg")',
        backgroundSize: 'cover',
        overflow: 'hidden',
        })}
      >
        <Box
          sx={(theme) => ({
            width: '100%',
            height: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
               ? `linear-gradient(${alpha('#fff', 1)}, ${alpha('#fff', 0.3)}, ${alpha('#fff', 1)})`
                : `linear-gradient(${alpha('#090e10', 1)}, ${alpha('#090e10', 0.5)}, ${alpha('#090e10', 1)})`,
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: '0 20px', sm: '0 6%',}
          })}
        >
            <Box sx={{fontFamily: 'Roboto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography sx={{fontSize: 165, fontWeight: 900, marginBottom: '-70px', color:'primary.main'}}>404</Typography>
                <Typography sx={{fontSize: 65, fontWeight: 900}}>Page not Found</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems:'center',
                    justifyContent: 'space-between',
                    marginTop: 2,
                    gap: 1
                }}
            >
                <Link href="/" color={theme.palette.mode === 'light' ? "primary.main" : "primary.light"} sx={{ display:'flex', alignItems:'center', fontSize:16, fontWeight: 700 }}>Return to Home Page</Link>
                <ArrowCircleRightIcon sx={{color:'secondary.light'}}/>
            </Box>
            
        </Box>
      </Box>
    </Box>
  )
}
