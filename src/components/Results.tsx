import axios from 'axios';
import { FC, useState } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import PokemonsUI from './Pokemons';
import Pagination from './Pagination';

export interface Pokemon {
  name: string;
  url: string;
}

export const pokemonsNamesLoader: LoaderFunction =
  async (): Promise<Pokemon> => {
    try {
      const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: { limit: 20, offset: 0 },
      });
      return data.results;
    } catch {
      throw new Error('Не удалось загрузить список покемонов');
    }
  };

const PokemonsNames2: FC = () => {
  const pokemonsData: Pokemon[] = useLoaderData();
  const [pokemons] = useState(pokemonsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonCountOnPage] = useState(5);

  const lastPokemonIndex = currentPage * pokemonCountOnPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonCountOnPage;
  const currentPokemons = pokemons.slice(firstPokemonIndex, lastPokemonIndex);

  const paginate = (currentNumber: number) => setCurrentPage(currentNumber);
  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className="results flex gap-15 flex-wrap justify-center p-7"
        data-testid="results-block"
      >
        <PokemonsUI pokemons={currentPokemons} />
      </div>
      <div className="pb-5">
        <Pagination
          pokemonCountOnPage={pokemonCountOnPage}
          totalPokemons={pokemonsData.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default PokemonsNames2;
