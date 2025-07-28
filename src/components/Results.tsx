import { FC, useState } from 'react';

import PokemonsUI from './Pokemons';
import Pagination from './Pagination';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonsNames2Props {
  pokemonsData: Pokemon[];
}

const PokemonsNames2: FC<PokemonsNames2Props> = ({ pokemonsData }) => {
  const [pokemons] = useState(pokemonsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonCountOnPage] = useState(5);

  const lastPokemonIndex = currentPage * pokemonCountOnPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonCountOnPage;
  console.log(pokemons);
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
