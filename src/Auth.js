import { useState, useEffect } from "react";
import supabase from "./supabaseClient";

const Auth = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sjekk om brukeren allerede er logget inn
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(data.user);
      }
    };
    checkUser();
  }, []);

  // Registrer bruker
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Feil ved registrering:", error.message);
    } else {
      setUser(data.user);
      console.log("Registrering vellykket:", data);
    }
  };

  // Logg inn bruker
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Feil ved innlogging:", error.message);
    } else {
      setUser(data.user);
      console.log("Innlogging vellykket:", data);
    }
  };

  // Logg ut bruker
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Feil ved utlogging:", error.message);
    } else {
      setUser(null);
      console.log("Utlogging vellykket");
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Velkommen, {user.email}!</p>
          <button onClick={handleLogout}>Logg ut</button>
        </div>
      ) : (
        <div>
          <h2>Logg inn eller registrer deg</h2>
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
          <button onClick={handleSignUp}>Registrer</button>
          <button onClick={handleLogin}>Logg inn</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
