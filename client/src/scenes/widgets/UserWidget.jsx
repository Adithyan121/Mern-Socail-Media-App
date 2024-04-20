import React, { useState } from "react";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  LinkedIn,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, TextField } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [editingSocialProfiles, setEditingSocialProfiles] = useState(false); // State for editing social profiles
  const [twitterHandle, setTwitterHandle] = useState(""); // State for Twitter handle
  const [linkedInProfile, setLinkedInProfile] = useState(""); // State for LinkedIn profile

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);

    // Set initial values for social profiles
    if (data.socialProfiles) {
      setTwitterHandle(data.socialProfiles.twitter || "");
      setLinkedInProfile(data.socialProfiles.linkedin || "");
    }
  };

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  const saveSocialProfiles = async () => {
    // Make API call to save social profiles
    // For example:
    // await fetch(`http://localhost:3001/users/${userId}/social-profiles`, {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     twitter: twitterHandle,
    //     linkedin: linkedInProfile,
    //   }),
    // });
    console.log("Social profiles saved:", twitterHandle, linkedInProfile);
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{user.friends ? user.friends.length : 0} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {/* Twitter Profile */}
        <FlexBetween gap="1rem" mb="0.5rem">
  <Twitter sx={{ mr: 1 }} alt="twitter" />
  {editingSocialProfiles ? (
    <TextField
      label="Twitter"
      variant="standard"
      value={twitterHandle}
      onChange={(e) => setTwitterHandle(e.target.value)}
      fullWidth
    />
  ) : (
    <Typography color={main}>{twitterHandle}</Typography>
  )}
</FlexBetween>

{/* LinkedIn Profile */}
<FlexBetween gap="1rem">
  <LinkedIn sx={{ mr: 1 }} alt="linkedin" />
  {editingSocialProfiles ? (
    <TextField
      label="LinkedIn"
      variant="standard"
      value={linkedInProfile}
      onChange={(e) => setLinkedInProfile(e.target.value)}
      fullWidth
    />
  ) : (
    <Typography color={main}>{linkedInProfile}</Typography>
  )}
</FlexBetween>

        {editingSocialProfiles && (
          <Box mt={2}>
            <EditOutlined sx={{ color: main }} onClick={saveSocialProfiles} />
          </Box>
        )}
      </Box>

      {/* Only show the EditOutlined icon when not in editing mode */}
      {!editingSocialProfiles && (
        <Box mt={2}>
          <EditOutlined sx={{ color: main }} onClick={() => setEditingSocialProfiles(true)} />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default UserWidget;
