import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from './assets/icons/Home_fill.svg';
import UploadIcon from './assets/icons/Upload.svg';
import UserIcon from './assets/icons/User_fill.svg';

function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: '9vh', // Tilpasset 9:16-ratio
      background: '#fff',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTop: '1px solid #ccc',
    }}>
      <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={HomeIcon} alt="Hjem" style={{ width: '24px', height: '24px' }} />
      </Link>
      <Link to="/upload" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={UploadIcon} alt="Last opp" style={{ width: '24px', height: '24px' }} />
      </Link>
      <Link to="/profile" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={UserIcon} alt="Profil" style={{ width: '24px', height: '24px' }} />
      </Link>
    </nav>
  );
}

export default Navbar;
