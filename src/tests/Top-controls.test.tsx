import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { pokemonLSLoader } from '../components/Top-controls';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import PokemonSearch from '../components/Top-controls';
import axios, { AxiosResponse } from 'axios';

const fakePokemon = {
  id: 1,
  species: {
    name: 'pikachu',
    url: 'string',
  },
  sprites: {
    front_default: 'https://img.pokemon/pikachu.png',
  },
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Top-controls component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('Renders search input and search button', async () => {
    const fakeRouter = createMemoryRouter(
      [
        {
          path: '/',
          element: <PokemonSearch />,
          loader: () => fakePokemon,
          HydrateFallback: () => <p>HydrateFallback...</p>,
        },
      ],
      {
        initialEntries: ['/'],
      }
    );
    await act(async () => {
      render(<RouterProvider router={fakeRouter} />);
    });

    const searchInput = await screen.getByPlaceholderText(
      /Enter the Pokémon's name/i
    );
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByAltText(/search-icon/i);
    expect(searchButton).toBeInTheDocument();
  });

  it('Displays previously saved search term from localStorage on mount', async () => {
    localStorage.setItem('pokemon', 'pikachu');

    const fakeData = {
      id: 2,
      name: 'pikachu',
      species: { name: 'pikachu', url: 'url' },
      sprites: { front_default: 'https://img.pokemon/pikachu.png' },
    };

    mockedAxios.get.mockResolvedValueOnce({
      data: fakeData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    } as AxiosResponse<typeof fakeData>);

    const fakeRouter = createMemoryRouter(
      [
        {
          path: '/',
          element: <PokemonSearch />,
          loader: pokemonLSLoader,

          HydrateFallback: () => <p>HydrateFallback...</p>,
        },
      ],
      {
        initialEntries: ['/'],
      }
    );
    await act(async () => {
      render(<RouterProvider router={fakeRouter} />);
    });

    const pokemonElement = await screen.getByText('pikachu');
    expect(pokemonElement).toBeInTheDocument();
  });

  it('Updates input value when user types', async () => {
    const fakeRouter = createMemoryRouter(
      [
        {
          path: '/',
          element: <PokemonSearch />,
          loader: () => fakePokemon,
          HydrateFallback: () => <p>HydrateFallback...</p>,
        },
      ],
      {
        initialEntries: ['/'],
      }
    );
    await act(async () => {
      render(<RouterProvider router={fakeRouter} />);
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
    mockedAxios.get.mockResolvedValue({ data: fakePokemon });
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const fakeRouter = createMemoryRouter(
      [
        {
          path: '/',
          element: <PokemonSearch />,
          loader: () => Promise.resolve(fakePokemon),
          HydrateFallback: () => <p>HydrateFallback...</p>,
        },
      ],
      {
        initialEntries: ['/'],
      }
    );
    await act(async () => {
      render(<RouterProvider router={fakeRouter} />);
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
    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith('pokemon', 'pikachu');
    });
  });
});
