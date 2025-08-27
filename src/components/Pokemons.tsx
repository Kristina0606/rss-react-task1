import { FC, ReactNode } from 'react';
import { Pokemon } from './Results';
import { SelectCheckbox } from './SelectCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleIsCheckedItem } from '../store/selectCheckboxSlice';

interface PokemonsUIProps {
  pokemons: Pokemon[];
}

const PokemonsUI: FC<PokemonsUIProps> = ({ pokemons }): ReactNode => {
  const checkedItems = useSelector(
    (state: RootState) => state.selectCheckbox.checkedItems
  );
  const dispatch = useDispatch();

  console.log(checkedItems);
  return (
    <>
      {pokemons.map((item: Pokemon) => {
        const segments = item.url.split('/').filter(Boolean);
        const id = segments[segments.length - 1];
        return (
          <div key={item.name} className="rounded-sm shadow-md p-1 ">
            <SelectCheckbox
              onClick={() => {
                dispatch(toggleIsCheckedItem(item.name));
              }}
              name={item.name}
            />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt=""
            />

            <div className="font-extrabold uppercase tracking-wide text-yellow-400 drop-shadow-md">
              {item.name}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PokemonsUI;
