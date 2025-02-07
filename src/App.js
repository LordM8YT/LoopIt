import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoUpload from './VideoUpload';
import Feed from './Feed';
import Navbar from './Navbar';
import Auth from './Auth';

function App() {
  return (
    <Router>
      <div style={{ width: '100vw', height: '177.78vw', maxHeight: '100vh', maxWidth: '56.25vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/profile" element={<div>Profilside (kommer snart)</div>} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
