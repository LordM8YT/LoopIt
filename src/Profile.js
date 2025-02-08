import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) console.error('Error fetching profile:', error);
      else setProfile(data);
    };

    fetchProfile();
  }, [userId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login'); // Send brukeren til login-siden
    window.location.reload(); // Oppdaterer siden
  };

  if (!profile) return <p>Laster...</p>;

  return (
    <div>
      <h1>{profile.username}</h1>
      <img src={profile.avatar_url} alt="Profilbilde" style={{ width: 100, height: 100, borderRadius: '50%' }} />
      <p>Følgere: {profile.followers_count}</p>
      <button onClick={handleLogout}>Logg ut</button>
    </div>
  );
};

export default Profile;
