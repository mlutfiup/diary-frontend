import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('token'); // Cek token untuk menentukan apakah pengguna sudah login

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar isLoggedIn={isLoggedIn} />
      <Container maxWidth="lg" sx={{ mt: 4, ml: 32 }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Your Diary
        </Typography>
        <Typography variant="h5" gutterBottom>
          Keep track of your thoughts and memories.
        </Typography>
        {!isLoggedIn && (
          <Typography variant="body1">
            Please <a href="/login">login</a> to view your diaries and add new ones.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Home;
