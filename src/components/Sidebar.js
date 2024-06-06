import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Box, Typography, Divider } from '@mui/material';
import { Home as HomeIcon, Book as BookIcon, Add as AddIcon, Login as LoginIcon, ExitToApp as ExitToAppIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ isLoggedIn }) => {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 280, flexShrink: 0 }}>
      <Box
        sx={{
          width: 280,
          backgroundColor: '#f5f5f5',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Box sx={{ p: 2, backgroundColor: '#3f51b5', color: 'white', textAlign: 'center' }}>
            <Typography variant="h6" noWrap>
              Diary App
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            {isLoggedIn && (
              <>
                <ListItem button component={Link} to="/diaries">
                  <ListItemIcon><BookIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="My Diaries" />
                </ListItem>
                <ListItem button component={Link} to="/diaries/add">
                  <ListItemIcon><AddIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Add Diary" />
                </ListItem>
                <ListItem button component={Link} to="/logout">
                  <ListItemIcon><ExitToAppIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )}
            {!isLoggedIn && (
              <>
                <ListItem button component={Link} to="/register">
                  <ListItemIcon><PersonAddIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
                <ListItem button component={Link} to="/login">
                  <ListItemIcon><LoginIcon color="primary" /></ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
        <Box sx={{ p: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
          <Typography variant="body2" color="textSecondary">
            &copy; 2024 Diary App
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
