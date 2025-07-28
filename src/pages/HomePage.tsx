import { LoaderFunction, useLoaderData } from 'react-router-dom';
import PokemonsNames2, { Pokemon } from '../components/Results';
import SearchBar from '../components/Top-controls';
import { FC } from 'react';
import axios from 'axios';

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
        <SearchBar />
      </main>
    </>
  );
};

export default HomePage;
