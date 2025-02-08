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
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) return <p>Laster...</p>;

  return (
    <Router>
      <Routes>
        {!user ? (
          <Route path="*" element={<Auth />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile userId={user.id} />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
