import { FC, useEffect, useState } from 'react';

import PokemonsUI from './Pokemons';
import Pagination from './Pagination';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { unselectAllItems } from '../store/selectCheckboxSlice';

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

  const checkedItems = useSelector(
    (state: RootState) => state.selectCheckbox.checkedItems
  );
  const dispatch = useDispatch();

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
      {checkedItems.length > 0 ? (
        <div className="absolute right-0 top-0 font-light">
          <p className="text-center">{checkedItems.length} items selected</p>
          <button className="cursor-pointer bg-blue-500 m-2 text-white  rounded-sm p-1">
            <span>download</span>
          </button>
          <button
            className="cursor-pointer bg-blue-500 m-2 text-white rounded-sm p-1"
            onClick={() => dispatch(unselectAllItems())}
          >
            <span>deselect all</span>
          </button>
        </div>
      ) : (
        <></>
      )}

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
