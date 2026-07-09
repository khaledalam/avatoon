import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AvatoonErrorBoundary } from '../src/components/AvatoonErrorBoundary';

function Boom(): never {
  throw new Error('failed to load avatar');
}

describe('AvatoonErrorBoundary', () => {
  beforeAll(() => {
    // React logs caught errors to console.error; keep test output clean.
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when there is no error', () => {
    render(
      <AvatoonErrorBoundary>
        <div>avatar</div>
      </AvatoonErrorBoundary>
    );
    expect(screen.getByText('avatar')).toBeInTheDocument();
  });

  it('calls onError and shows the fallback when a child throws', () => {
    const onError = jest.fn();
    render(
      <AvatoonErrorBoundary onError={onError} fallback={<div>failed</div>}>
        <Boom />
      </AvatoonErrorBoundary>
    );
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(screen.getByText('failed')).toBeInTheDocument();
  });
});
