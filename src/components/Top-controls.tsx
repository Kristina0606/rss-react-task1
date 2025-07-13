import { Component, ReactNode } from 'react';
import searchIcon from '../assets/browser_5894365.png';

class SearchBar extends Component {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemon: null,
      loading: true,
    };
  }

  componentDidMount() {
    const formEl = document.getElementById('search-form') as HTMLFormElement;
    formEl?.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(formEl);
      const name = formData.get('name')?.toString().toLowerCase();
      this.setState({ pokemon: name, loading: true });
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('покемона нет');
          }
          return res.json();
        })
        .then(data => console.log(data.species.name));
      formEl.reset();
    });
  }

  render(): ReactNode {
    return (
      <div className="search-box bg-blue-100 p-10">
        <form id="search-form" className="flex align-center justify-center">
          <input
            type="search"
            name="name"
            id="search-input"
            placeholder="Enter the Pokemon's name"
            className="w-121 h-8 border rounded-sm p-1"
          />
          <button
            type="submit"
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
