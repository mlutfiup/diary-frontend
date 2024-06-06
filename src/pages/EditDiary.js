import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditDiary = () => {
  const { id } = useParams();
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiary();
  }, []);

  const fetchDiary = async () => {
    const response = await axios.get(`/api/diaries/${id}`);
    setDate(response.data.date);
    setTitle(response.data.title);
    setDetail(response.data.detail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('date', date);
    formData.append('title', title);
    formData.append('detail', detail);
    if (image) formData.append('image', image);

    await axios.post(`/api/diaries/${id}`, formData);
    navigate('/diaries');
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Date"
        type="date"
        fullWidth
        value={date}
        onChange={(e) => setDate(e.target.value)}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Detail"
        fullWidth
        multiline
        rows={4}
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" component="label">
        Upload Image
        <input type="file" hidden onChange={(e) => setImage(e.target.files[0])} />
      </Button>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Save
      </Button>
    </Box>
  );
};

export default EditDiary;
