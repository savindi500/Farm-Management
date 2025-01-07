import React from 'react';
import { Box, Typography } from '@mui/material';

const RightSidebar = () => {
  return (
    <Box
      sx={{
        width: '300px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        right: 0,
        bgcolor: 'background.paper',
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
      }}
    >
      {/* Image Section */}
      <Box
        component="img"
        src="https://via.placeholder.com/150"
        alt="Sidebar Image"
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 1,
          marginBottom: 2,
        }}
      />

      {/* Text Content */}
      <Typography variant="h6" gutterBottom>
        Sidebar Title
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This is a right sidebar component. Add your content here.
      </Typography>
    </Box>
  );
};

export default RightSidebar;
