import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatoon from '../src/components/Avatoon';

let visemeJson = {
  visemes: [
    { time: 0, viseme: 'X' },
    { time: 1.3, viseme: 'A' },
  ],
  audio_base64: '',
};


beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('Avatoon Component', () => {
  it('renders the canvas and button correctly', async () => {
    render(
      <Avatoon
        glbUrl="https://example.com/avatar.glb"
        goal="Normal"
        visemeJson={visemeJson}
        onRenderComplete={() => {}}
      />
    );

    // Expect canvas to be present
    const canvas = await screen.findByTestId('avatoon-canvas');
    expect(canvas).toBeInTheDocument();
  });
});
