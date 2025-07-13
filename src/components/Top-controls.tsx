import { Component, ReactNode } from 'react';
import searchIcon from '../assets/browser_5894365.png';

class SearchBar extends Component {
  render(): ReactNode {
    return (
      <div className="search-box bg-blue-100 p-10">
        <form id="search-form" className="flex align-center justify-center">
          <input
            type="search"
            id="search-input"
            placeholder="Enter the Pokemon's name"
            className="w-121 h-8 border rounded-sm p-1"
          />
          <button
            type="button"
            className="cursor-pointer bg-blue-500 text-white w-8 h-8 rounded-sm p-1"
          >
            <img src={searchIcon} alt="search-icon" />
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
