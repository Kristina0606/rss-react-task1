import { FC, ReactNode } from 'react';
import { Pokemon } from './Results';

interface PokemonsUIProps {
  pokemons: Pokemon[];
}

const PokemonsUI: FC<PokemonsUIProps> = ({ pokemons }): ReactNode => {
  return (
    <>
      {pokemons.map((item: Pokemon) => (
        <div
          key={item.name}
          className="font-extrabold uppercase tracking-wide text-yellow-400 drop-shadow-md"
        >
          {item.name}
        </div>
      ))}
    </>
  );
};

export default PokemonsUI;
