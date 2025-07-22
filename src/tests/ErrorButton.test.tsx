import { fireEvent, render, screen } from '@testing-library/react';
import ErrorButton from '../components/ErrorButton';
import ErrorBoundary from '../components/ErrorBoundary';

describe('Error button test', () => {
  it('test of click', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText(/Error Button/i);
    fireEvent.click(button);

    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
