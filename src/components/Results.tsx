import axios from 'axios';
import { FC } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';

interface Pokemon {
  name: string;
  url: string;
}

export const pokemonLoader: LoaderFunction = async (): Promise<Pokemon> => {
  try {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: { limit: 15, offset: 0 },
    });
    return data.results;
  } catch {
    throw new Error('Не удалось загрузить список покемонов');
  }
};

const PokemonsNames2: FC = () => {
  const pokemonsData: Pokemon[] = useLoaderData();
  return (
    <div
      className="results flex gap-15 flex-wrap justify-center m-15"
      data-testid="results-block"
    >
      {pokemonsData.map(item => (
        <div
          key={item.name}
          className="font-extrabold uppercase tracking-wide text-yellow-400 drop-shadow-md"
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default PokemonsNames2;
