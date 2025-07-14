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
  error: string | null;
}

class SearchBar extends Component<object, SearchState> {
  state: SearchState = {
    pokemon: null,
    loading: false,
    error: null,
  };

  handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.toString().toLowerCase();
    if (!name) return;

    this.setState({ loading: true, error: null });
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error('Покемона нет');
      const data: PokemonData = await res.json();
      this.setState({ pokemon: data });
      console.log('я тут', data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Ошибка при загрузке:', err.message);
      } else {
        console.error('Неизвестная ошибка:', err);
      }
    } finally {
      this.setState({ loading: false });
    }
  };

  render(): ReactNode {
    const { pokemon, loading, error } = this.state;

    return (
      <div>
        <div className="search-box bg-blue-100 p-10">
          <form
            id="search-form"
            onSubmit={this.handleSubmit}
            className="flex align-center justify-center"
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
          {error && <p className="text-red-500">Ошибка: {error}</p>}
        </div>
      </div>
    );
  }
}

export default SearchBar;
