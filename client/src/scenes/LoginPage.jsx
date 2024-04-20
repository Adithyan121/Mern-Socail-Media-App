import React from 'react';
import{ Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import white from "../assets/logo-white.svg";
import black from "../assets/logo-black.svg";
import Form from "./Form"
import Footer from './Footer';

const Loginpage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const logo = theme.palette.mode === "dark" ? white : black;

  return (
    <Box>
      <Box width="100%" backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="#FFF">
            
            <img src={logo} alt="Logo" style={{ width: "5rem", height: "3rem", marginRight: "0.5rem"}} />
          </Typography>
      </Box>
      <Box width={isNonMobileScreens ? "50" : "93"}
      p="2rem"
      m="2rem auto"
      borderRadius="1.5rem"
      backgroundColor={theme.palette.background.alt}>
        <Typography fontWeight="bold" variant="h5" fontFamily='Roboto, sans-serif' sx={{mb:"1.5rem"}}>
          Welcome to ChatX,"Connect, Chat, Xperience".
        </Typography>
        <Form/>

      </Box>
      <Footer/>
    </Box>
  )
}

export default Loginpage;
