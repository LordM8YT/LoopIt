import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Hjem</h1>
      <Link to="/profile">Gå til profil</Link>
    </div>
  );
}

export default Home;
