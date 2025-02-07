import { useState } from 'react';
import supabase from './supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) console.error('Error signing in:', error);
    else setUser(data.user);
  };

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) console.error('Error signing up:', error);
    else setUser(data.user);
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold">Logg inn / Registrer</h2>
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block border p-2 w-full mt-2"
      />
      <input
        type="password"
        placeholder="Passord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block border p-2 w-full mt-2"
      />
      <button onClick={signIn} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Logg inn
      </button>
      <button onClick={signUp} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
        Registrer
      </button>
    </div>
  );
};

export default Auth;
