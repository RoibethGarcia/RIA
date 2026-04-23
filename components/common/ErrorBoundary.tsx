"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type FallbackRender = (context: { error: Error; reset: () => void }) => ReactNode;

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode | FallbackRender;
  resetKeys?: unknown[];
};

type ErrorBoundaryState = {
  error: Error | null;
};

const didResetKeysChange = (previousKeys: unknown[] = [], nextKeys: unknown[] = []) =>
  previousKeys.length !== nextKeys.length ||
  previousKeys.some((key, index) => !Object.is(key, nextKeys[index]));

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary capturó un error", error, errorInfo);
  }

  componentDidUpdate(previousProps: ErrorBoundaryProps) {
    if (
      this.state.error &&
      didResetKeysChange(previousProps.resetKeys, this.props.resetKeys)
    ) {
      this.resetBoundary();
    }
  }

  resetBoundary = () => {
    this.setState({ error: null });
  };

  render() {
    const { children, fallback } = this.props;
    const { error } = this.state;

    if (!error) {
      return children;
    }

    if (typeof fallback === "function") {
      return fallback({
        error,
        reset: this.resetBoundary,
      });
    }

    return fallback;
  }
}
