import { FC } from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  pokemonCountOnPage: number;
  totalPokemons: number;
  // eslint-disable-next-line no-unused-vars
  paginate: (_p: number) => void;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({
  pokemonCountOnPage,
  totalPokemons,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const numOfButtons = Math.ceil(totalPokemons / pokemonCountOnPage);

  for (let i = 1; i <= numOfButtons; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination flex gap-2">
        {pageNumbers.map(item => {
          const isCurrent = currentPage === item;
          const commonClasses =
            'p-2 hover:bg-purple-400 text-white rounded border-purple-200 border-2 cursor-pointer';
          const activeClass = 'bg-purple-500';
          const inactiveClass = 'bg-purple-300';
          return (
            <li key={item} className="page-item">
              <Link
                onClick={() => {
                  paginate(item);
                }}
                to={`/?page=${item}`}
                className={`${commonClasses} ${
                  isCurrent ? activeClass : inactiveClass
                }`}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Pagination;
