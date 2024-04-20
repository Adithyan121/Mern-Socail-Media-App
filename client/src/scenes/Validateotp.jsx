import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, useTheme } from '@mui/material';
import white from "../assets/logo-white.svg";
import black from "../assets/logo-black.svg";

const Validateotp = () => {
    
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60); // Initial timer value set to 60 seconds
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state && location.state.email ? location.state.email : '';
    const theme = useTheme();
    const logo = theme.palette.mode === 'dark' ? white : black;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/auth/validate-otp', { otp })
            .then(res => {
                console.log("login: " + res.data);
                if (res.data.status === "Success") {
                    navigate('/reset-password',{ state: { email } });
                } else {
                    console.log("Navigating error");
                }
            })
            .catch(err => {
                console.error("Error occurred: ", err);
                // Handle error, show user feedback, etc.
            });
    };

    const handleResendOTP = () => {
        axios.post('http://localhost:3001/auth/forgot-password', { email })
            .then(res => {
                console.log("OTP resent successfully");
                // Optionally provide user feedback
                setTimer(60); // Reset timer to 60 seconds
            })
            .catch(err => {
                console.error("Error occurred while resending OTP: ", err);
                // Handle error, show user feedback, etc.
            });
    };

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

  return (
    <Box>
    <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center">
      <Typography fontWeight="bold" fontSize="32px" color="#FFF">
        <img src={logo} alt="Logo" style={{ width: "5rem", height: "3rem", marginRight: "0.5rem"}} />
      </Typography>
      <Box textAlign="left" mt={5}>
          <Typography fontWeight="bold" variant="h4">Forgot Password</Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', mb: "0.5rem" }}>
          <p>Please enter the OTP you received <a>{email}</a>. The OTP will expire in <span style={{ color: timer <= 10 ? 'red' : 'inherit' }}>{timer}</span> seconds.</p>
          </Typography>
        </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="OTP"
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
          name="otp"
          type="number"
          required
          placeholder="Enter your otp"
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
          Verify
        </Button>
        <Button
  fullWidth
  type="button"
  onClick={handleResendOTP}
  sx={{
    m: "2rem 0",
    p: "1rem",
    backgroundColor: theme.palette.mode === 'dark' ? '#FFF' : '#000',
    color: theme.palette.mode === 'dark' ? '#000' : '#FFF',
    display: timer === 0 ? 'block' : 'none', // Show button only when timer is 0
    "&:hover": { 
      backgroundColor:'#939696',
      color: '#000' 
    },
  }}
>
  Resend OTP
</Button>

      </form>
    </Box>
  </Box>
  )
}

export default Validateotp;
