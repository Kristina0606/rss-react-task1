import { FC, FormEvent, useEffect, useState } from 'react';
import searchIcon from '../assets/browser_5894365.png';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

export interface PokemonData {
  id: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string | undefined;
  };
}

const PokemonSearch: FC = () => {
  const pokemonLoaderData: PokemonData | null = useLoaderData();
  console.log(pokemonLoaderData);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pokemonLSLoader = async (): Promise<void> => {
      if (localStorage.getItem('pokemon')) {
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
        <div className="pokemon-block">
          {error && (
            <div className="text-sm font-light text-center m-10">{error}</div>
          )}
          {currentPokemon && (
            <div className="flex justify-start items-center flex-col">
              <img
                src={currentPokemon.sprites.front_default}
                alt={currentPokemon.species.name}
                className="mt-2 w-36 h-36"
              />
              <div
                key={currentPokemon.species.name}
                className="font-extrabold text-center uppercase tracking-wide text-yellow-400 drop-shadow-md"
              >
                {currentPokemon.species.name}
              </div>
              <div
                key={currentPokemon.id}
                className="font-extrabold text-center uppercase tracking-wide text-yellow-400 drop-shadow-md"
              >
                {' '}
                id:
                {currentPokemon.id}
              </div>
              <div className="text-center m-5">
                <button className="text-center cursor-pointer border p-1 text-sm font-light group relative h-12 overflow-hidden rounded-md bg-blue-400 px-4 text-neutral-50 transition">
                  <span>Read more...</span>
                  <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
