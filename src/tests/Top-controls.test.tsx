import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import SearchBar from '../components/Top-controls';

describe('Top-controls component', () => {
  it('Renders search input and search button', () => {
    render(<SearchBar />);

    const searchInput = screen.getByPlaceholderText(
      /Enter the Pokémon's name/i
    );
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByAltText(/search-icon/i);
    expect(searchButton).toBeInTheDocument();
  });

  it('Displays previously saved search term from localStorage on mount', async () => {
    localStorage.setItem('pokemon', 'pikachu');

    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 25,
            species: { name: 'pikachu', url: '' },
            sprites: { front_default: 'pikachu.png' },
          }),
      })
    ) as jest.Mock;

    render(<SearchBar />);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });
  });

  it('Updates input value when user types', async () => {
    await act(async () => {
      render(<SearchBar />);
    });
    const testForm = screen.getByTestId('search-form');
    const searchInput = screen.getByPlaceholderText(
      /Enter the Pokémon's name/i
    ) as HTMLInputElement;
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'teest' } });
    });
    await act(async () => {
      fireEvent.submit(testForm);
    });
    expect(searchInput.value).toBe('teest');
  });

  it('Saves search term to localStorage when search button is clicked', async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    await act(async () => {
      render(<SearchBar />);
    });
    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByPlaceholderText(
      /Enter the Pokémon's name/i
    ) as HTMLInputElement;
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'pikachu' } });
    });
    await act(async () => {
      fireEvent.click(searchButton);
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('pokemon', 'pikachu');
  });
});
