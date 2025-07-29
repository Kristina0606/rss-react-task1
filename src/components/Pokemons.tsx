import { FC, ReactNode } from 'react';
import { Pokemon } from './Results';

interface PokemonsUIProps {
  pokemons: Pokemon[];
}

const PokemonsUI: FC<PokemonsUIProps> = ({ pokemons }): ReactNode => {
  return (
    <>
      {pokemons.map((item: Pokemon) => {
        const segments = item.url.split('/').filter(Boolean);
        const id = segments[segments.length - 1];
        return (
          <div key={item.name}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt=""
            />

            <div
              key={item.name}
              className="font-extrabold uppercase tracking-wide text-yellow-400 drop-shadow-md"
            >
              {item.name}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PokemonsUI;
