import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';
import PokemonsNames2, { Pokemon } from '../components/Results';
import { FC } from 'react';
import axios from 'axios';
import PokemonSearch from '../components/Top-controls';

export const pokemonsNamesLoader: LoaderFunction = async (): Promise<
  Pokemon[]
> => {
  try {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: { limit: 20, offset: 0 },
    });
    console.log(data);
    return data.results;
  } catch {
    throw new Error('Не удалось загрузить список покемонов');
  }
};

const HomePage: FC = () => {
  const pokemonsData: Pokemon[] = useLoaderData<Pokemon[]>();

  return (
    <>
      <header>
        <PokemonsNames2 pokemonsData={pokemonsData} />
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
