import { Component, type ReactNode } from 'react';

interface Props {
  onError?: (error: Error) => void;
  /** Rendered in place of the children after an error (must be R3F-compatible). */
  fallback?: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches errors thrown while loading/rendering the avatar (e.g. a bad
 * `glbUrl`) so a failed model doesn't crash the host application. The error is
 * surfaced via `onError`.
 */
export class AvatoonErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
