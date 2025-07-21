import { Component, ReactNode } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface State {
  pokemons: Pokemon[];
  loading: boolean;
}

class PokemonsNames extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemons: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=15&offset=0')
      .then(res => res.json())
      .then(data => {
        this.setState({ pokemons: data.results, loading: false });
        console.log(data.results, data.results.length);
      })
      .catch(error => {
        console.error('Ошибка при загрузке покемонов:', error);
        this.setState({ loading: false });
      });
  }

  render(): ReactNode {
    const { pokemons, loading } = this.state;
    return (
      <div
        className="results flex gap-15 flex-wrap justify-center m-15"
        data-testid="results-block"
      >
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          pokemons.map(pokemon => (
            <div
              key={pokemon.name}
              className="font-extrabold uppercase tracking-wide text-yellow-400 drop-shadow-md"
            >
              {pokemon.name}
            </div>
          ))
        )}
      </div>
    );
  }
}

export default PokemonsNames;
