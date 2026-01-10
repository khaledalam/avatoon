import React from 'react';
import { Avatoon, LipSyncAvatoon } from 'avatoon';
import './App.css';
import visemeJson from './visemeData.json';

function App() {
  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '50px' }}>
      <h1>Original Avatoon</h1>
      <div style={{ height: '400px' }}>
        <Avatoon
          glbUrl={'/avatar.glb'}
          goal={'Normal'}
          onRenderComplete={() => console.log('Render Completed!')}
          visemeJson={visemeJson}
          showPlayVoiceButton={true}
        />
      </div>

      <hr style={{ width: '100%', margin: '20px 0' }} />

      <h1>Lip Sync Only (No Audio)</h1>
      <div style={{ height: '400px' }}>
        <LipSyncAvatoon glbUrl={'/avatar.glb'} />
      </div>
    </div>
  );
}

export default App;
