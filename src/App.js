import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DiaryList from './pages/DiaryList';
import AddDiary from './pages/AddDiary';
import EditDiary from './pages/EditDiary';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout'; // Impor Logout

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diaries" element={<DiaryList />} />
        <Route path="/diaries/add" element={<AddDiary />} />
        <Route path="/diaries/edit/:id" element={<EditDiary />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
