import React from 'react';
import { render } from '@testing-library/react';
import { AvatoonModel } from '../src/components/AvatoonModel';
import '@testing-library/jest-dom';

// Stub Audio API globally
global.Audio = jest.fn().mockImplementation(() => ({
  play: jest.fn(),
  pause: jest.fn(),
}));

// Stub audio for environments like jsdom
// @ts-ignore
window.Audio = class {
  play = jest.fn(() => Promise.resolve());
  pause = jest.fn();
  currentTime = 0;
};

jest.mock('@react-three/fiber', () => ({
  ...jest.requireActual('@react-three/fiber'),
  useThree: () => ({ gl: {} }),
  useFrame: () => {},
  Canvas: ({ children }: any) => <div>{children}</div>,
}));

jest.mock('@react-three/drei', () => ({
  useGLTF: () => ({ scene: { traverse: jest.fn() } }),
  Html: ({ children }: any) => <div>{children}</div>,
  Environment: () => <></>,
  OrbitControls: () => <></>,
}));

jest.mock('@react-three/drei', () => ({
  useGLTF: () => ({
    scene: {
      traverse: jest.fn(),
    },
  }),
}));

// Viseme test input
const visemeJson = {
  visemes: [
    { time: 0, viseme: 'A' },
    { time: 1.0, viseme: 'B' },
  ],
  audio_base64: '',
};

describe('AvatoonModel', () => {
  it('renders successfully with minimal props', () => {
    const { container } = render(
      <AvatoonModel
        url="dummy.glb"
        goal="Normal"
        shouldPlay={false}
        visemeJson={visemeJson}
        onRenderComplete={jest.fn()}
      />
    );

    expect(container.querySelector('primitive')).toBeInTheDocument();
  });

  // it('calls onRenderComplete after render', () => {
  //   const mockCallback = jest.fn();

  //   render(
  //     <AvatoonModel
  //       url="dummy.glb"
  //       goal="Normal"
  //       shouldPlay={false}
  //       visemeJson={visemeJson}
  //       onRenderComplete={mockCallback}
  //     />
  //   );

  //   expect(mockCallback).toHaveBeenCalled();
  // });
});

//   it('starts audio when shouldPlay is true', () => {
//     const playSpy = jest.spyOn(global.Audio.prototype, 'play');

//     render(
//       <AvatoonModel
//         url="dummy.glb"
//         goal="Normal"
//         shouldPlay={true}
//         visemeJson={visemeJson}
//         onRenderComplete={jest.fn()}
//       />
//     );

//     expect(playSpy).toHaveBeenCalled();
//   });

//   it('pauses audio when shouldPlay is false', () => {
//     const pauseSpy = jest.spyOn(global.Audio.prototype, 'pause');

//     render(
//       <Canvas>
//         <AvatoonModel
//           url="dummy.glb"
//           goal="Normal"
//           shouldPlay={false}
//           visemeJson={visemeJson}
//           onRenderComplete={jest.fn()}
//         />
//       </Canvas>
//     );

//     expect(pauseSpy).toHaveBeenCalled();
//   });
// });
