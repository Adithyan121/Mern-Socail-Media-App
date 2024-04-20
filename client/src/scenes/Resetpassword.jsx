import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, useTheme } from '@mui/material';
import white from "../assets/logo-white.svg";
import black from "../assets/logo-black.svg";

const Resetpassword = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme(); // Add this line to access the theme object
    const email = location.state && location.state.email ? location.state.email : '';
    const logo = theme.palette.mode === 'dark' ? white : black;

    // Normal passowrd
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/auth/reset-password', { password, email })
            .then(res => {
              console.log("Reset password: ", res);
              if (res.data.status === "Success") {
                    navigate('/');
                } else {
                    console.log("Reset password failed");
                    // Handle failure
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
          <Typography fontWeight="bold" variant="h4">Reset Password</Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', mb: "0.5rem" }}>
          <p>Enter a new password.</p>
          </Typography>
        </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="enter a new password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          type="password"
          required
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
          Reset
        </Button>
      </form>
    </Box>
  </Box>
  )
}

export default Resetpassword;
