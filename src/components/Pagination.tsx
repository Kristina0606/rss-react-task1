import { FC } from 'react';

interface PaginationProps {
  pokemonCountOnPage: number;
  totalPokemons: number;
  // eslint-disable-next-line no-unused-vars
  paginate: (_p: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  pokemonCountOnPage,
  totalPokemons,
  paginate,
}) => {
  const pageNumbers = [];
  const numOfButtons = Math.ceil(totalPokemons / pokemonCountOnPage);

  for (let i = 1; i <= numOfButtons; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination flex gap-2">
        {pageNumbers.map(item => (
          <li key={item} className="page-item">
            <div
              className="p-2 bg-purple-300 hover:bg-purple-400 text-white rounded border-purple-200 border-2 cursor-pointer"
              onClick={() => paginate(item)}
            >
              {item}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
