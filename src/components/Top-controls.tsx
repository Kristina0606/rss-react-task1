import { Component, FormEvent, ReactNode } from 'react';
import searchIcon from '../assets/browser_5894365.png';

export interface PokemonData {
  id: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string | undefined;
  };
}

interface SearchState {
  pokemon: PokemonData | null;
  loading: boolean;
  isError: boolean;
}

class SearchBar extends Component<object, SearchState> {
  state: SearchState = {
    pokemon: null,
    loading: false,
    isError: false,
  };

  async componentDidMount(): Promise<void> {
    if (localStorage.getItem('pokemon')) {
      const pokeName = localStorage.getItem('pokemon');
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeName}`
      );
      const data = await response.json();
      this.setState({ pokemon: data, isError: false, loading: false });
    }
  }

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.toString().toLowerCase().trim();
    if (!name) return;

    this.setState({ loading: true, isError: false });
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) {
        this.setState({ isError: true, loading: false, pokemon: null });
        return;
      }
      const data: PokemonData = await res.json();
      this.setState({ pokemon: data, isError: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ isError: true, pokemon: null });
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  render(): ReactNode {
    const { pokemon, loading, isError } = this.state;
    if (pokemon) {
      localStorage.setItem('pokemon', pokemon.species.name);
    }
    return (
      <div>
        <div className="search-box bg-blue-100 p-10">
          <form
            id="search-form"
            onSubmit={this.handleSubmit}
            className="flex align-center justify-center"
            data-testid="search-form"
          >
            <input
              type="search"
              name="name"
              placeholder="Enter the Pokémon's name"
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
        <div className="pokemon-block flex justify-start items-center flex-col">
          {isError && (
            <p className="text-red-200">
              Покемон не найден или произошла ошибка
            </p>
          )}
          {pokemon && (
            <div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.species.name}
                className="mt-2 w-32 h-32"
              />
              <div
                key={pokemon.species.name}
                className="font-extrabold text-center uppercase tracking-wide text-yellow-400 drop-shadow-md"
              >
                {pokemon.species.name}
              </div>
              <div
                key={pokemon.id}
                className="font-extrabold text-center uppercase tracking-wide text-yellow-400 drop-shadow-md"
              >
                {' '}
                id:
                {pokemon.id}
              </div>
            </div>
          )}
          {loading && <p>Загрузка…</p>}
        </div>
      </div>
    );
  }
}

export default SearchBar;
