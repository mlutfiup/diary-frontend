import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, CircularProgress, Breadcrumbs, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const AddDiary = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('No file chosen');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImageName(selectedImage ? selectedImage.name : 'No file chosen');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('detail', details);
    formData.append('date', date);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/api/diaries', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Response from server:', response);
      if (response.status === 201) {
        navigate('/diaries');
      }
    } catch (error) {
      console.error('Error adding diary:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container maxWidth="sm">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 4, mb: 2 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Link to="/diaries" style={{ textDecoration: 'none', color: 'inherit' }}>
          Diaries
        </Link>
        <Typography color="textPrimary">Add Diary</Typography>
      </Breadcrumbs>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Diary
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <label htmlFor="upload-image">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{ mt: 2 }}
            >
              <PhotoCameraIcon />
            </IconButton>
          </label>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            type="file"
            onChange={handleImageChange}
          />
          <Typography variant="body1" sx={{ mt: 1 }}>
            {imageName}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Add Diary'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddDiary;
