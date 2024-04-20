import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme, useMediaQuery, TextField, Button } from '@mui/material';
import white from "../assets/logo-white.svg";
import black from "../assets/logo-black.svg";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const logo = theme.palette.mode === "dark" ? white : black;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/auth/forgot-password', { email })
      .then(res => {
        console.log("login: " + res.data.status);
        if (res.data.status === "Success") { // Use strict equality check
          navigate('/validate', { state: { email } });
        } else {
          console.log("ERROR Navigation");
        }
      })
      .catch(err => {
        console.error("Error occurred: ", err);
        // Handle error, show user feedback, etc.
      });
  };

  return (
    <Box>
    <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center">
      <Typography fontWeight="bold" fontSize="32px" color="#FFF">
        <img src={logo} alt="Logo" style={{ width: "5rem", height: "3rem", marginRight: "0.5rem"}} />
      </Typography>
      <Box textAlign="left" mt={5}>
          <Typography fontWeight="bold" variant="h4">Forgot Password</Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', mb: "0.5rem" }}>
            Please enter your email to receive a password reset OTP.
          </Typography>
        </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          sx={{
            gridColumn: "span 4",
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black" // Set border color to black when focused
            }
           
        }}
        />
        <Button
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: theme.palette.mode === 'dark' ? '#FFF' : '#000',
            color: theme.palette.mode === 'dark' ? '#000' : '#FFF',
            "&:hover": { 
              backgroundColor:'#939696',
              color: '#000' 
            },
          }}
        >
          Send OTP
        </Button>
      </form>
    </Box>
  </Box>
  );
}

export default ForgotPassword;
