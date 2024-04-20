import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import black from "../assets/logo-black.svg";
import white from "../assets/logo-white.svg";
import FlexBetween from "../components/FlexBetween";
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const logo = theme.palette.mode === "dark" ? white : black;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={theme.palette.background.alt}>
      <Box>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <img src={logo} alt="Logo" style={{ width: "5rem", height: "3rem", marginRight: "0.5rem"}} />
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Connect with us:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Facebook sx={{ mr: 1 }} />
          <Twitter sx={{ mr: 1 }} />
          <Instagram />
        </Box>
      </Box>

      {isNonMobileScreens && (
        <Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            Quick Links:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <a href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</a>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <a href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</a>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <a href="/terms" style={{ textDecoration: 'none', color: 'inherit' }}>Terms of Service</a>
          </Typography>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Footer;
