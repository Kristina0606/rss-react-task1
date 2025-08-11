import { Link } from 'react-router-dom';
import PokemonsNames2, { Pokemon } from '../components/Results';
import { FC } from 'react';
import PokemonSearch from '../components/Top-controls';
import { useGetPokemonsQuery } from '../store/pokemonApi';

const HomePage: FC = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useGetPokemonsQuery({
    limit: 50,
    offset: 0,
  });
  const pokemonsData: Pokemon[] = data.results;

  return (
    <>
      <header>
        {isLoading ? (
          <div>loading...</div>
        ) : isError ? (
          <div>error</div>
        ) : (
          <PokemonsNames2 pokemonsData={pokemonsData} />
        )}
      </header>
      <main>
        <div>
          <PokemonSearch />
          <div className="text-center">
            <Link to={'/about'}>
              <button className="inline-block text-center cursor-pointer border p-1 text-sm font-light group relative h-12 overflow-hidden rounded-md bg-blue-400 px-4 text-neutral-50 transition">
                <span>About</span>
                <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
