import { FC, FormEvent, useEffect, useState } from 'react';
import searchIcon from '../assets/browser_5894365.png';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import DetailView from './DataView/DetailView';
import { useSearchParams } from 'react-router-dom';

export interface PokemonData {
  id: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string | undefined;
  };
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
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setsearchParams] = useSearchParams();

  useEffect(() => {
    const pokemonLSLoader = async (): Promise<void> => {
      if (searchParams.has('pokemon')) {
        const pokeNameParam = searchParams.get('pokemon');
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokeNameParam}`
        );
        localStorage.setItem('pokemon', data.name);
        setCurrentPokemon(data);
      } else if (localStorage.getItem('pokemon')) {
        const pokeName = localStorage.getItem('pokemon');
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        );
        setCurrentPokemon(data);
      }
      setLoading(false);
    };
    pokemonLSLoader();
  }, []);

  const addParams = (currentPokemon: PokemonData) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('pokemon', String(currentPokemon!.id));
    setsearchParams(newParams);
  };

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().toLowerCase().trim();
    if (!name) {
      setError('Введите имя покемона');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      localStorage.setItem('pokemon', name);
      setCurrentPokemon(data);
      addParams(data);
      console.log('name');
      form.reset();
    } catch {
      setError('Покемон не найден');
      setCurrentPokemon(null);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
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
            <img src={searchIcon} alt="search-icon" />
          </button>
        </form>
      </div>
      {loading ? (
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
          {error && (
            <div className="text-sm font-light text-center m-10">{error}</div>
          )}
          {currentPokemon && (
            <>
              <PokemonCard
                currentPokemon={currentPokemon}
                toggleIsOpenCard={toggleIsOpen}
              />{' '}
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
