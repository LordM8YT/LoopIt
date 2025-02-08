import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import supabase from './supabaseClient';
import Profile from './Profile';
import Upload from './Upload';
import Auth from './Auth';
import Home from './Home';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      console.log("⏳ Henter brukerdata...");
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error("🚨 Feil ved henting av bruker:", error.message);
      } else {
        console.log("✅ Brukerdata funnet:", data.user);
        setUser(data.user);
      }

      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return <p>⏳ Laster inn...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile userId={user.id} /> : <Navigate to="/login" />} />
        <Route path="/upload" element={user ? <Upload /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
