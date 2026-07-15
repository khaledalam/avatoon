import { createRef } from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatoon from '../src/components/Avatoon';
import type { AvatoonHandle } from '../src/types';

// Stub the platform seam so the scene renders in jsdom (no real WebGL), and the
// model fires onRenderComplete on mount so the built-in button becomes visible.
jest.mock('../src/platform', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="avatoon-canvas">{children}</div>
  ),
  OrbitControls: () => null,
  useFrame: () => {},
  useThree: () => ({ camera: {}, gl: {} }),
  Environment: () => null,
  createAudioClock: () => null,
}));

jest.mock('../src/components/AvatoonModel', () => ({
  AvatoonModel: ({ onRenderComplete }: { onRenderComplete?: () => void }) => {
    const { useEffect } = require('react');
    useEffect(() => onRenderComplete?.(), []);
    return null;
  },
}));

describe('Avatoon imperative control', () => {
  it('shows the play button after first render and toggles on click', () => {
    render(
      <Avatoon glbUrl="x.glb" showPlayVoiceButton visemeJson={undefined} />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Talk with me now');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Stop talking');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Talk with me now');
  });

  it('drives playback state through the ref handle', () => {
    const ref = createRef<AvatoonHandle>();
    render(
      <Avatoon
        ref={ref}
        glbUrl="x.glb"
        showPlayVoiceButton
        visemeJson={undefined}
      />
    );

    const button = screen.getByRole('button');

    act(() => ref.current!.play());
    expect(button).toHaveTextContent('Stop talking');

    act(() => ref.current!.stop());
    expect(button).toHaveTextContent('Talk with me now');

    act(() => ref.current!.toggle());
    expect(button).toHaveTextContent('Stop talking');
  });

  it('hides the button when showPlayVoiceButton is false', () => {
    render(<Avatoon glbUrl="x.glb" visemeJson={undefined} />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
