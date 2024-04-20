import React, { useState, useEffect } from 'react';
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const adsData = [
  {
    imageSrc: "http://localhost:3001/assets/futuralabs.jpg",
    title: "Futura Labs",
    site: "https://thefuturalabs.com/",
    website: "thefuturalabs.com",
    text: "കൈ നിറയെ സാലറിയുള്ള ഒരു ജോലിയാണോ ലക്ഷ്യം ? ഡിജിറ്റൽ മാർക്കറ്റിംഗ് കോഴ്സ് പഠിക്കൂ കരിയർ സെറ്റാക്കൂ!"
  },
  {
    imageSrc: "http://localhost:3001/assets/rummy.jpg",
    title: "JUNGLY RUMMY",
    site: "https://www.jungleerummy.com/",
    website: "jungleerummy.com",
    text: "പെട്ടന്നു പെട്ടുപ്പോവാതെ ജയിക്കാൻവേണ്ടി കളിക്കു ,കംപ്യൂട്ടറിനോടൊപ്പം അല്ല നാല് കോടിയിലതികം റിയൽ പ്ലയെർസിനോടൊപ്പം."
  },
  // Add more ad objects as needed
];

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentAdIndex(prevIndex => (prevIndex + 1) % adsData.length);
    }, 6000); // 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  const currentAd = adsData[currentAdIndex];

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <a href={currentAd.site} target="_blank" rel="noopener noreferrer">
        <img
          width="100%"
          height="auto"
          alt="advert"
          src={currentAd.imageSrc}
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0", cursor: 'pointer' }}
        />
      </a>
      <FlexBetween>
        <Typography color={dark}>{currentAd.title}</Typography>
        <Typography color={medium}>{currentAd.website}</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        {currentAd.text}
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
