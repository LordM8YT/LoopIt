import { useState, useEffect } from 'react';
import supabase from './supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // Start med "loading"
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

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
      
      setLoading(false); // Ferdig med å laste
    };

    getUser();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    console.log("🔐 Prøver å logge inn med", email);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("🚨 Feil ved innlogging:", error.message);
      setError(error.message);
    } else {
      console.log("✅ Innlogging vellykket:", data.user);
      setUser(data.user);
    }

    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    setError('');

    console.log("🆕 Registrerer ny bruker med", email);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("🚨 Feil ved registrering:", error.message);
      setError(error.message);
    } else {
      console.log("✅ Bruker registrert:", data.user);
      setUser(data.user);
    }

    setLoading(false);
  };

  if (loading) {
    return <p>⏳ Laster inn...</p>;
  }

  if (user) {
    return (
      <div>
        <p>✅ Du er logget inn som {user.email}</p>
        <button onClick={async () => {
          await supabase.auth.signOut();
          setUser(null);
        }}>Logg ut</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Logg inn eller registrer deg</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input 
        type="email" 
        placeholder="E-post" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Passord" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin} disabled={loading}>Logg inn</button>
      <button onClick={handleSignUp} disabled={loading}>Registrer deg</button>
    </div>
  );
};

export default Auth;
