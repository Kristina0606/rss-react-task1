import { Component } from 'react';
import PokemonsNames from './components/Results';
import SearchBar from './components/Top-controls';
import { PokemonData } from './components/Top-controls';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

class App extends Component {
  handlePokemonLoad(data: PokemonData) {
    this.setState({ pokemonData: data });
  }

  render() {
    return (
      <>
        <ErrorBoundary>
          <header>
            <PokemonsNames />
          </header>
          <main>
            <SearchBar />
            <ErrorButton />
          </main>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
