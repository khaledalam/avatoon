import React from 'react';
import { Avatoon } from 'avatoon';

const visemeJson = {
  visemes: [
    { time: 0, viseme: 'A' },
    { time: 0.2, viseme: 'B' },
    { time: 0.4, viseme: 'D' },
  ],
  audio_base64: '', // add a real one for full effect
};

function App() {
  return (
    <Avatoon
      // glbUrl="https://raw.githubusercontent.com/khaledalam/avatoon/main/test/assets/placeholder-avatar.glb"
      glbUrl={'../public/avatar.glb'}
      goal={'Normal'}
      onRenderComplete={() => console.log('Render Completed!')}
      visemeJson={visemeJson}
    />
  );
}

export default App;
