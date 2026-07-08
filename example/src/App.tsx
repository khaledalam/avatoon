import React from 'react';
import { Avatoon, LipSyncAvatoon } from 'avatoon';
import './App.css';
import visemeJson from './visemeData.json';

// Resolve public assets against PUBLIC_URL so they work on GitHub Pages
// (served from the /avatoon/ subpath) as well as locally.
const avatarUrl = `${process.env.PUBLIC_URL}/avatar.glb`;

function App() {
  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '50px' }}>
      <h1>Original Avatoon</h1>
      <div style={{ height: '400px' }}>
        <Avatoon
          glbUrl={avatarUrl}
          goal={'Normal'}
          onRenderComplete={() => console.log('Render Completed!')}
          visemeJson={visemeJson}
          showPlayVoiceButton={true}
        />
      </div>

      <hr style={{ width: '100%', margin: '20px 0' }} />

      <h1>Lip Sync Only (No Audio)</h1>
      <div style={{ height: '400px' }}>
        <LipSyncAvatoon glbUrl={avatarUrl} />
      </div>
    </div>
  );
}

export default App;
