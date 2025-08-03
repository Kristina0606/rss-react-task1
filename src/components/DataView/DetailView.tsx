import { FC } from 'react';
import { PokemonData } from '../Top-controls';
import './DataView.css';

interface DetailViewProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
  currentPokemon: PokemonData;
}

const DetailView: FC<DetailViewProps> = ({
  isOpen,
  toggleIsOpen,
  currentPokemon,
}) => {
  return (
    <aside
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-xl transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold capitalize">
          {currentPokemon.species.name}
        </h2>
        <button
          onClick={toggleIsOpen}
          className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
        >
          &times;
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-full">
        <img
          src={currentPokemon.sprites.front_default}
          alt={currentPokemon.species.name}
          className="animate-spin mx-auto w-32 h-32 mb-4"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {currentPokemon.types.map(({ type }) => (
            <span
              key={type.name}
              className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full capitalize text-sm"
            >
              {type.name}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p>
              <span className="font-semibold">Height:</span>{' '}
              {(currentPokemon.height / 10).toFixed(1)} m
            </p>
            <p>
              <span className="font-semibold">Weight:</span>{' '}
              {(currentPokemon.weight / 10).toFixed(1)} kg
            </p>
            <p>
              <span className="font-semibold">Base XP:</span>{' '}
              {currentPokemon.base_experience}
            </p>
          </div>
          <div>
            <p className="font-semibold mb-1">Abilities:</p>
            <ul className="list-disc list-inside">
              {currentPokemon.abilities.map(({ ability }) => (
                <li key={ability.name} className="capitalize">
                  {ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-2">Stats:</p>
          <ul>
            {currentPokemon.stats.map(({ stat, base_stat }) => (
              <li
                key={stat.name}
                className="flex justify-between mb-1 capitalize text-sm"
              >
                <span>{stat.name.replace('-', ' ')}</span>
                <span>{base_stat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-2">Moves:</p>
          <ul className="grid grid-cols-2 gap-1 text-xs">
            {currentPokemon.moves.slice(0, 8).map(({ move }) => (
              <li key={move.name} className="capitalize">
                {move.name.replace('-', ' ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default DetailView;
