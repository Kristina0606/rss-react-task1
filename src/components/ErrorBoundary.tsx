import { Component, PropsWithChildren, ReactNode } from 'react';

interface ErrorState {
  isError: boolean;
}

type ErrorBoundaryProps = PropsWithChildren<object>;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorState> {
  state: ErrorState = {
    isError: false,
  };

  static getDerivedStateFromError(): ErrorState {
    return { isError: true };
  }

  render(): ReactNode {
    if (this.state.isError) {
      console.error(console.error());
      return <p>Ошибка! Что то пошло не так...</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
