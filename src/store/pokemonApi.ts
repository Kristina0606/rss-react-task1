import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemons: builder.query({
      query: ({ limit = 20, offset = 0 }) => ({
        url: 'pokemon',
        params: { limit, offset },
      }),
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonApi;
