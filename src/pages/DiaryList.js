import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, Box, CircularProgress, Breadcrumbs } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

const DiaryList = () => {
  const [diaries, setDiaries] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const response = await axios.get('/api/diaries');
      setDiaries(response.data);
    } catch (error) {
      console.error("There was an error fetching the diaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/diaries/${selectedId}`);
      fetchDiaries();
      setOpen(false);
    } catch (error) {
      console.error("There was an error deleting the diary:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Typography color="textPrimary">Diaries</Typography>
      </Breadcrumbs>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Diary List
        </Typography>
        <Button
          component={Link}
          to="/diaries/add"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add New Diary
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Detail</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {diaries.map((diary) => (
                <TableRow key={diary.id}>
                  <TableCell>{diary.date}</TableCell>
                  <TableCell>{diary.title}</TableCell>
                  <TableCell>{diary.detail}</TableCell>
                  <TableCell align="center">
                    <IconButton component={Link} to={`/diaries/edit/${diary.id}`} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => { setSelectedId(diary.id); setOpen(true); }} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Delete Diary?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this diary?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      )}
    </Box>
  );
};

export default DiaryList;
