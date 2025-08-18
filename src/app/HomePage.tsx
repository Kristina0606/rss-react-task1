import Link from 'next/link';
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
            <Link
              href="/about"
              className="inline-block text-center cursor-pointer border p-1 text-sm font-light group relative h-8 overflow-hidden rounded-md bg-blue-400 px-4 text-neutral-50 transition"
            >
              about
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
