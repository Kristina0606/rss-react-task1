import { act, render, screen } from '@testing-library/react';
import Results from '../components/Results';

describe('Results component', () => {
  it('Renders correct number of items when data is provided', async () => {
    const mockFetchFunc = jest.fn();
    const mockResponse = {
      json: jest.fn().mockResolvedValue({
        results: [
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
        ],
      }) as jest.Mock,
    };

    mockFetchFunc.mockResolvedValue(mockResponse);
    globalThis.fetch = mockFetchFunc;

    await act(async () => {
      render(<Results />);
    });

    const resultsBlock = screen.getByTestId('results-block');
    expect(resultsBlock.childElementCount).toBe(15);
  });

  it('Displays error message when API call fails', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockFetchFunc = jest.fn();
    const mockResponse = {
      json: jest.fn().mockRejectedValue(new Error('i am error')) as jest.Mock,
    };

    mockFetchFunc.mockResolvedValue(mockResponse);
    globalThis.fetch = mockFetchFunc;

    await act(async () => {
      render(<Results />);
    });

    expect(errorSpy).toHaveBeenCalledTimes(1);
    errorSpy.mockRestore();
  });
});
