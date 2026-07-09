import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LipSyncAvatoon from '../src/components/LipSyncAvatoon';

jest.mock('@react-three/fiber', () => ({
  ...jest.requireActual('@react-three/fiber'),
  Canvas: ({ children }: any) => (
    <div data-testid="lipsync-canvas">{children}</div>
  ),
  useFrame: () => {},
}));

jest.mock('@react-three/drei', () => ({
  useGLTF: () => ({ scene: { traverse: jest.fn() } }),
  Environment: () => <></>,
  OrbitControls: () => <></>,
}));

describe('LipSyncAvatoon', () => {
  it('renders a canvas and the Start Talking button', () => {
    render(<LipSyncAvatoon glbUrl="dummy.glb" />);
    expect(screen.getByTestId('lipsync-canvas')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /start talking/i })
    ).toBeInTheDocument();
  });

  it('toggles the button label when clicked', () => {
    render(<LipSyncAvatoon glbUrl="dummy.glb" />);
    fireEvent.click(screen.getByRole('button', { name: /start talking/i }));
    expect(
      screen.getByRole('button', { name: /stop talking/i })
    ).toBeInTheDocument();
  });

  it('falls back to a default glb url when none is provided', () => {
    render(<LipSyncAvatoon />);
    expect(screen.getByTestId('lipsync-canvas')).toBeInTheDocument();
  });
});
