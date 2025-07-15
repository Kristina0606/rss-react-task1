import { Component, PropsWithChildren, ReactNode, ErrorInfo } from 'react';

interface ErrorState {
  isError: boolean;
}

type ErrorBoundaryProps = PropsWithChildren<object>;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorState> {
  state: ErrorState = {
    isError: false,
  };

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: Error): ErrorState {
    return { isError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Пойманная ошибка:', error, errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.isError) {
      return <p>Ошибка! Что то пошло не так...</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
