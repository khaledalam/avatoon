import React from 'react';
import { render } from '@testing-library/react';
import { SceneEnvironment } from '../src/components/SceneEnvironment';

let lastProps: Record<string, unknown> | null = null;

jest.mock('@react-three/drei', () => ({
  Environment: (props: Record<string, unknown>) => {
    lastProps = props;
    return null;
  },
}));

describe('SceneEnvironment', () => {
  beforeEach(() => {
    lastProps = null;
  });

  it('defaults to the sunset preset', () => {
    render(<SceneEnvironment />);
    expect(lastProps).toMatchObject({ preset: 'sunset', background: false });
  });

  it('uses a custom preset and background', () => {
    render(<SceneEnvironment environmentPreset="city" environmentBackground />);
    expect(lastProps).toMatchObject({ preset: 'city', background: true });
  });

  it('prefers custom files over a preset', () => {
    render(
      <SceneEnvironment
        environmentFiles="/venice.hdr"
        environmentPreset="city"
      />
    );
    expect(lastProps).toMatchObject({ files: '/venice.hdr' });
    expect(lastProps).not.toHaveProperty('preset');
  });
});
