'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import searchIcon from '../assets/browser_5894365.png';
import PokemonCard from './PokemonCard';
import DetailView from './DataView/DetailView';
import { useLazyGetOnePokemonQuery } from '../store/pokemonApi';

export interface PokemonData {
  id: number;
  species: { name: string; url: string };
  sprites: { front_default: string | undefined };
  types: { slot: number; type: { name: string; url: string } }[];
  height: number;
  weight: number;
  base_experience: number;
  abilities: { ability: { name: string; url: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string; url: string } }[];
}

const PokemonSearch: FC = () => {
  const [currentPokemon, setCurrentPokemon] = useState<PokemonData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [pokeNameParam, setPokeNameParam] = useState<string | null>(null);
  const [trigger, { isError, isLoading }] = useLazyGetOnePokemonQuery();

  useEffect(() => {
    const param = searchParams!.get('pokemon');
    const local = window.localStorage.getItem('pokemon');

    if (param) {
      setPokeNameParam(param);
    } else if (local) {
      setPokeNameParam(local);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!pokeNameParam) return;
    triggerFunc(pokeNameParam);
  }, [pokeNameParam]);

  const addParams = (currentPokemon: PokemonData) => {
    router.replace(
      `?pokemon=${encodeURIComponent(currentPokemon.species.name)}`,
      { scroll: false }
    );
  };

  const toggleIsOpen = () => {
    setIsOpen(open => !open);
  };

  const triggerFunc = (pokeName: string) => {
    trigger(pokeName)
      .unwrap()
      .then(pokemon => {
        setError(null);
        setCurrentPokemon(pokemon);
        window.localStorage.setItem('pokemon', pokemon.species.name);
        addParams(pokemon);
      })
      .catch(() => {
        setError('Покемон не найден');
        setCurrentPokemon(null);
        window.localStorage.removeItem('pokemon');
      });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.toString().toLowerCase().trim();

    if (!name) {
      setError('Введите имя покемона');
      return;
    }

    setPokeNameParam(name);
  };

  return (
    <div>
      <div className="search-box bg-blue-100 p-10">
        <form
          id="search-form"
          onSubmit={handleSubmit}
          className="flex align-center justify-center"
          data-testid="search-form"
        >
          <input
            type="search"
            name="name"
            placeholder="Enter the Pokémon's name"
            className="w-121 h-8 border rounded-sm p-1"
          />
          <button
            type="submit"
            className="cursor-pointer bg-blue-500 text-white w-8 h-8 rounded-sm p-1"
            data-testid="search-button"
          >
            <img src={searchIcon.src} alt="search-icon" />
          </button>
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      ) : (
        <div className="pokemon-block flex justify-center">
          {isError && (
            <div className="text-sm font-light text-center m-10">{error}</div>
          )}
          {currentPokemon && (
            <>
              <PokemonCard
                currentPokemon={currentPokemon}
                toggleIsOpenCard={toggleIsOpen}
              />
              <DetailView
                isOpen={isOpen}
                toggleIsOpen={toggleIsOpen}
                currentPokemon={currentPokemon}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
