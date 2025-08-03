import { FC, useEffect, useState } from 'react';

import PokemonsUI from './Pokemons';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonsNames2Props {
  pokemonsData: Pokemon[];
}

const PokemonsNames2: FC<PokemonsNames2Props> = ({ pokemonsData }) => {
  const [pokemons] = useState(pokemonsData);
  const [pokemonCountOnPage] = useState(5);

  const [searchParams, setsearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    if (initialPage != currentPage) {
      setCurrentPage(initialPage);
    }
  }, [initialPage]);

  const lastPokemonIndex = currentPage * pokemonCountOnPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonCountOnPage;
  const currentPokemons = pokemons.slice(firstPokemonIndex, lastPokemonIndex);

  const paginate = (currentNumber: number) => {
    setCurrentPage(currentNumber);
    setsearchParams({ page: String(currentNumber) });
  };
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
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default PokemonsNames2;
