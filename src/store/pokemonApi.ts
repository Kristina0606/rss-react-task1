import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonData } from '../components/Top-controls';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemons: builder.query({
      query: ({ limit = 50, offset = 0 }) => ({
        url: 'pokemon',
        params: { limit, offset },
      }),
    }),
    getOnePokemon: builder.query<PokemonData, string | null>({
      query: (name: string | null) => `pokemon/${name}`,
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetOnePokemonQuery,
  useLazyGetOnePokemonQuery,
} = pokemonApi;
