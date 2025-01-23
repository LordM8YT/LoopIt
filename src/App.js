import React from 'react';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Velkommen til din TikTok-klone!</h1>
      <video
        src="testvideo.mp4"
        controls
        style={{
          width: '100%',
          maxWidth: '400px', // Passer inn i midten
          borderRadius: '10px',
        }}
      />
      <p>Se og last opp videoer her!</p>
    </div>
  );
}

export default App;
