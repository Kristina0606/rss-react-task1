import { FC } from 'react';
import { PokemonData } from './Top-controls';

export interface PokemonCardProps {
  currentPokemon: PokemonData;
  toggleIsOpenCard: () => void;
}

const PokemonCard: FC<PokemonCardProps> = ({
  currentPokemon,
  toggleIsOpenCard,
}) => {
  return (
    <div className="pokemon-card flex w-54 m-2 justify-start items-center flex-col rounded-lg shadow-md p-4 transition-shadow duration-300 hover:shadow-xl">
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
        <button
          onClick={() => {
            toggleIsOpenCard();
          }}
          className="text-center cursor-pointer border p-1 text-sm font-light group relative h-12 overflow-hidden rounded-md bg-blue-400 px-4 text-neutral-50 transition"
        >
          <span>Read more...</span>
          <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] group-hover:w-full"></div>
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
