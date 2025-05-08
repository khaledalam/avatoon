import React from 'react';
import { Avatoon } from 'avatoon';
import './App.css';
import visemeJson from './visemeData.json';

function App() {
  return (
    <div className="container">
      <Avatoon
        // glbUrl="https://raw.githubusercontent.com/khaledalam/avatoon/main/test/assets/placeholder-avatar.glb"
        glbUrl={'/avatar.glb'}
        goal={'Normal'}
        onRenderComplete={() => console.log('Render Completed!')}
        visemeJson={visemeJson}
        showPlayVoiceButton={true}
      />
    </div>
  );
}

export default App;
