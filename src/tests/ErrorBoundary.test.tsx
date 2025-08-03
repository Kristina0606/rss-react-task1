import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

describe('Error button test', () => {
  let consoleErrorBackup: typeof console.error;

  beforeEach(() => {
    consoleErrorBackup = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = consoleErrorBackup;
  });

  it('test of click', async () => {
    const ErrorComponent = () => {
      throw new Error();
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const errorMessage = await screen.getByText(
      /Ошибка! Что то пошло не так.../i
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
