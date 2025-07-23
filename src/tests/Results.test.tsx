import { render, screen } from '@testing-library/react';
import PokemonsNames2 from '../components/Results';
import { createMemoryRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import NotFoundPage from '../pages/NotFoundPage';

const fakeData = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  {
    name: 'charmander',
    url: 'https://pokeapi.co/api/v2/pokemon/4/',
  },
  {
    name: 'charmeleon',
    url: 'https://pokeapi.co/api/v2/pokemon/5/',
  },
  { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
  { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
  { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
  { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
  { name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/' },
  {
    name: 'butterfree',
    url: 'https://pokeapi.co/api/v2/pokemon/12/',
  },
  { name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/' },
  { name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/' },
  {
    name: 'beedrill',
    url: 'https://pokeapi.co/api/v2/pokemon/15/',
  },
];

describe('Results component', () => {
  it('Renders correct number of items when data is provided', async () => {
    const fakeRouter = createMemoryRouter(
      [
        {
          path: '/',
          element: <PokemonsNames2 />,
          loader: () => fakeData,
          HydrateFallback: () => <p>HydrateFallback...</p>,
        },
      ],
      {
        initialEntries: ['/'],
      }
    );
    render(<RouterProvider router={fakeRouter} />);

    const resultsBlock = await screen.findByTestId('results-block');
    expect(resultsBlock.childElementCount).toBe(15);
  });

  it('Displays error message when API call fails', async () => {
    const fakeRouter = createMemoryRouter(
      [
        {
          path: '/',
          element: <PokemonsNames2 />,
          loader: () => {
            throw new Error('Error');
          },
          HydrateFallback: () => <p>HydrateFallback...</p>,
          errorElement: <NotFoundPage />,
        },
      ],
      {
        initialEntries: ['/'],
      }
    );
    render(<RouterProvider router={fakeRouter} />);

    const notFoundMsg = await screen.findByText('Its Not Found Page!');
    expect(notFoundMsg).toBeInTheDocument();
  });
});
