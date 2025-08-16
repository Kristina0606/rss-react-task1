import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface SelectCheckboxProps {
  onClick: () => void;
  name: string;
}

export const SelectCheckbox: FC<SelectCheckboxProps> = ({ onClick, name }) => {
  const checkedItems = useSelector(
    (state: RootState) => state.selectCheckbox.checkedItems
  );
  const isChecked = checkedItems.includes(name);
  return (
    <>
      <input type="checkbox" onChange={onClick} checked={isChecked} />
    </>
  );
};
